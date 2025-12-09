"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "motion/react"
import { Box } from "@chakra-ui/react"

// CSS Styles
const styles = `
.demo-container {
  width: 100%;
  margin-top: 1em;
  background: #060010;
  border: 1px solid #271e37;
  padding: 1em;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rotating-text-demo {
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  line-height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-weight: 300;
  overflow: hidden;
  padding: 3rem;
  color: #fff;
}

.rotating-text-main {
  padding: 0.125rem 0.5rem;
  background-color: #5227ff;
  color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
}

.rotating-text-split {
  overflow: hidden;
  padding-bottom: 0.125rem;
}

.rotating-text-ptag {
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 0.2em;
}

.text-rotate {
  display: flex;
  flex-wrap: wrap;
  white-space: pre-wrap;
  position: relative;
}

.text-rotate-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.text-rotate-word {
  display: inline-flex;
}

.text-rotate-lines {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.text-rotate-element {
  display: inline-block;
}

.text-rotate-space {
  white-space: pre;
}

@media (min-width: 640px) {
  .rotating-text-demo {
    font-size: 1.875rem;
    line-height: 2.25rem;
    padding: 5rem;
  }

  .rotating-text-main {
    padding: 0.25rem 0.5rem;
  }

  .rotating-text-split {
    padding-bottom: 0.25rem;
  }
}

@media (min-width: 768px) {
  .rotating-text-demo {
    font-size: 3rem;
    line-height: 1;
    padding: 6rem;
  }

  .rotating-text-main {
    padding: 0.5rem 0.75rem;
  }
}

@media (prefers-color-scheme: dark) {
  .rotating-text-demo {
    color: var(--muted);
  }
}
`

// Utility function
function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ")
}

// Types
interface RotatingTextProps {
    texts: string[]
    transition?: {
        type?: string
        damping?: number
        stiffness?: number
        delay?: number
    }
    initial?: { y?: string; opacity?: number; [key: string]: any }
    animate?: { y?: number | string; opacity?: number; [key: string]: any }
    exit?: { y?: string; opacity?: number; [key: string]: any }
    animatePresenceMode?: "wait" | "sync"
    animatePresenceInitial?: boolean
    rotationInterval?: number
    staggerDuration?: number
    staggerFrom?: "first" | "last" | "center" | "random" | number
    loop?: boolean
    auto?: boolean
    splitBy?: "characters" | "words" | "lines" | string
    onNext?: (index: number) => void
    mainClassName?: string
    splitLevelClassName?: string
    elementLevelClassName?: string
    [key: string]: any
}

interface RotatingTextHandle {
    next: () => void
    previous: () => void
    jumpTo: (index: number) => void
    reset: () => void
}

// RotatingText Component
const RotatingText = forwardRef<RotatingTextHandle, RotatingTextProps>((props, ref) => {
    const {
        texts,
        transition = { type: "spring", damping: 25, stiffness: 300 },
        initial = { y: "100%", opacity: 0 },
        animate = { y: 0, opacity: 1 },
        exit = { y: "-120%", opacity: 0 },
        animatePresenceMode = "wait",
        animatePresenceInitial = false,
        rotationInterval = 2000,
        staggerDuration = 0,
        staggerFrom = "first",
        loop = true,
        auto = true,
        splitBy = "characters",
        onNext,
        mainClassName,
        splitLevelClassName,
        elementLevelClassName,
        ...rest
    } = props

    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    const splitIntoCharacters = (text: string): string[] => {
        if (typeof Intl !== "undefined" && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
            return Array.from(segmenter.segment(text), (segment) => segment.segment)
        }
        return Array.from(text)
    }

    const elements = useMemo(() => {
        const currentText = texts[currentTextIndex]
        if (splitBy === "characters") {
            const words = currentText.split(" ")
            return words.map((word: string, i: number) => ({
                characters: splitIntoCharacters(word),
                needsSpace: i !== words.length - 1,
            }))
        }
        if (splitBy === "words") {
            return currentText.split(" ").map((word: string, i: number, arr: string[]) => ({
                characters: [word],
                needsSpace: i !== arr.length - 1,
            }))
        }
        if (splitBy === "lines") {
            return currentText.split("\n").map((line: string, i: number, arr: string[]) => ({
                characters: [line],
                needsSpace: i !== arr.length - 1,
            }))
        }

        return currentText.split(splitBy).map((part: string, i: number, arr: string[]) => ({
            characters: [part],
            needsSpace: i !== arr.length - 1,
        }))
    }, [texts, currentTextIndex, splitBy])

    const getStaggerDelay = useCallback(
        (index: number, totalChars: number): number => {
            const total = totalChars
            if (staggerFrom === "first") return index * staggerDuration
            if (staggerFrom === "last") return (total - 1 - index) * staggerDuration
            if (staggerFrom === "center") {
                const center = Math.floor(total / 2)
                return Math.abs(center - index) * staggerDuration
            }
            if (staggerFrom === "random") {
                const randomIndex = Math.floor(Math.random() * total)
                return Math.abs(randomIndex - index) * staggerDuration
            }
            if (typeof staggerFrom === "number") {
                return Math.abs(staggerFrom - index) * staggerDuration
            }
            return 0
        },
        [staggerFrom, staggerDuration],
    )

    const handleIndexChange = useCallback(
        (newIndex: number) => {
            setCurrentTextIndex(newIndex)
            if (onNext) onNext(newIndex)
        },
        [onNext],
    )

    const next = useCallback(() => {
        const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1
        if (nextIndex !== currentTextIndex) {
            handleIndexChange(nextIndex)
        }
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const previous = useCallback(() => {
        const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1
        if (prevIndex !== currentTextIndex) {
            handleIndexChange(prevIndex)
        }
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const jumpTo = useCallback(
        (index: number) => {
            const validIndex = Math.max(0, Math.min(index, texts.length - 1))
            if (validIndex !== currentTextIndex) {
                handleIndexChange(validIndex)
            }
        },
        [texts.length, currentTextIndex, handleIndexChange],
    )

    const reset = useCallback(() => {
        if (currentTextIndex !== 0) {
            handleIndexChange(0)
        }
    }, [currentTextIndex, handleIndexChange])

    useImperativeHandle(
        ref,
        () => ({
            next,
            previous,
            jumpTo,
            reset,
        }),
        [next, previous, jumpTo, reset],
    )

    useEffect(() => {
        if (!auto) return
        const intervalId = setInterval(next, rotationInterval)
        return () => clearInterval(intervalId)
    }, [next, rotationInterval, auto])

    return (
        <motion.span className={cn("text-rotate", mainClassName)} {...rest} layout transition={transition}>
            <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
            <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
                <motion.span
                    key={currentTextIndex}
                    className={cn(splitBy === "lines" ? "text-rotate-lines" : "text-rotate")}
                    layout
                    aria-hidden="true"
                >
                    {elements.map(
                        (
                            wordObj: { characters: string[]; needsSpace: boolean },
                            wordIndex: number,
                            array: { characters: string[]; needsSpace: boolean }[],
                        ) => {
                            const previousCharsCount = array
                                .slice(0, wordIndex)
                                .reduce((sum: number, word: { characters: string[] }) => sum + word.characters.length, 0)
                            return (
                                <span key={wordIndex} className={cn("text-rotate-word", splitLevelClassName)}>
                                    {wordObj.characters.map((char, charIndex) => (
                                        <motion.span
                                            key={charIndex}
                                            initial={initial}
                                            animate={animate}
                                            exit={exit}
                                            transition={{
                                                ...transition,
                                                delay: getStaggerDelay(
                                                    previousCharsCount + charIndex,
                                                    array.reduce((sum, word) => sum + word.characters.length, 0),
                                                ),
                                            }}
                                            className={cn("text-rotate-element", elementLevelClassName)}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                    {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
                                </span>
                            )
                        },
                    )}
                </motion.span>
            </AnimatePresence>
        </motion.span>
    )
})

RotatingText.displayName = "RotatingText"

// Demo Component
export default function RotatingTextDemo() {
    const words = ["Work.", "Delight", "Inspire"]

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <Box position="relative" minH={400} maxH={400} overflow="hidden" justifyContent="start" w={"700px"}>
                <div className="rotating-text-demo">
                    <LayoutGroup>
                        <motion.p className="rotating-text-ptag" layout>
                            <motion.span className="pt-0.5 sm:pt-1 md:pt-2" layout transition={{ type: "spring", damping: 30, stiffness: 400 }}>
                                Designed To{" "}
                            </motion.span>
                            <RotatingText
                                texts={words}
                                mainClassName="rotating-text-main"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="rotating-text-split"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </motion.p>
                    </LayoutGroup>
                </div>
            </Box>
        </>
    )
}
