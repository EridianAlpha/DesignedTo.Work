"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "motion/react"
import "./RotatingText.css"

export default function RotatingText() {
    const texts = ["Delight...", "Enhance...", "Inspire...", "Work."]
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const staggerDuration = 0.03
    const rotationInterval = 3000

    const characters = useMemo(() => {
        const text = texts[currentTextIndex]
        // Split text into characters, preserving spaces
        if (typeof Intl !== "undefined" && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
            return Array.from(segmenter.segment(text), (segment) => segment.segment)
        }
        return Array.from(text)
    }, [texts, currentTextIndex])

    // Calculate stagger delay from last (reverse order)
    const getStaggerDelay = (index: number): number => {
        return (characters.length - 1 - index) * staggerDuration
    }

    // Auto-rotate interval
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTextIndex((prev) => (prev === texts.length - 1 ? 0 : prev + 1))
        }, rotationInterval)
        return () => clearInterval(intervalId)
    }, [texts.length])

    return (
        <LayoutGroup>
            <div className="rotating-text-wrapper">
                <span>Designed To </span>
                <motion.div
                    className="rotating-text-container"
                    aria-label={`Designed To ${texts[currentTextIndex]}`}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 400,
                    }}
                    layout
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={currentTextIndex} className="rotating-text-inner" layout>
                            {characters.map((char, index) => (
                                <motion.span
                                    key={index}
                                    className="rotating-text-character"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    transition={{
                                        type: "spring",
                                        damping: 27,
                                        stiffness: 800,
                                        delay: getStaggerDelay(index),
                                    }}
                                    aria-hidden="true"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>
            </div>
        </LayoutGroup>
    )
}
