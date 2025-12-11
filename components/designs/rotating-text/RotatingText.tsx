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
                {/* 
                This motion div is used to animate the text container.
                When the text changes, the width of the container changes.
                This motion div animates that change with a horizontal spring animation.
                */}
                <motion.div
                    className="rotating-text-container"
                    aria-label={`Designed To ${texts[currentTextIndex]}`}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 400,
                    }}
                    //
                    // The layout prop enables automatic layout animations.
                    // Without it, the transition prop only applies to explicit animations (like animate, initial, exit).
                    // The layout prop tells Framer Motion to watch for layout changes (like width/height changes) and animate them.
                    // When layout changes occur, it uses the transition prop above to control how those changes animate.
                    // Without layout, the width change would happen instantly with no animation.
                    layout
                >
                    {/* 
                    AnimatePresence enables exit animations for removed children.
                    mode="wait" ensures the old text fully animates out before the new text animates in (no overlap).
                    initial={false} disables the initial animation on first mount, so the first text appears immediately.
                    */}
                    <AnimatePresence mode="wait" initial={false}>
                        {/* 
                        This motion span is used to animate the text characters.
                        When the text changes, the characters animate out and in.
                        This motion span animates that change with a vertical spring animation.
                        */}
                        <motion.span key={currentTextIndex} className="rotating-text-inner" layout>
                            {characters.map((char, index) => (
                                <motion.span
                                    key={index}
                                    className="rotating-text-character"
                                    //
                                    // Starting position is 100% below the container, so it animates in from the bottom.
                                    initial={{ y: "100%" }}
                                    //
                                    // Ending position is 0, so it animates to the center of the container.
                                    animate={{ y: 0 }}
                                    //
                                    // Exiting position is -120%, so it animates out to the top of the container.
                                    exit={{ y: "-120%" }}
                                    //
                                    // Transition determines the physics of the animation.
                                    transition={{
                                        //
                                        // Type of animation is a spring animation.
                                        // Available types:
                                        // - "tween": Duration-based animation with ease curve
                                        // - "spring": Physics or duration-based spring animation
                                        type: "spring",
                                        //
                                        // Animation duration is determined by spring physics, not an explicit duration.
                                        // stiffness (800): Higher = faster animation (more "stiff" spring)
                                        // damping (27): Higher = less bounce/oscillation, settles faster
                                        // Together, these create a quick, snappy animation (~0.2-0.3s per character)
                                        damping: 27,
                                        stiffness: 800,
                                        //
                                        // This delay is used to stagger the characters as they animate in.
                                        // The delay is calculated from the last character to the first character.
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
