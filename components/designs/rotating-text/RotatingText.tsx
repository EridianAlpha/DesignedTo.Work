"use client"

import { useMemo } from "react"
import { motion } from "motion/react"
import "./RotatingText.css"

export default function RotatingText() {
    const text = "Inspire..."

    const characters = useMemo(() => {
        // Split text into characters, preserving spaces
        if (typeof Intl !== "undefined" && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
            return Array.from(segmenter.segment(text), (segment) => segment.segment)
        }
        return Array.from(text)
    }, [text])

    return (
        <div className="rotating-text-wrapper">
            <span className="rotating-text-prefix">Designed To </span>
            <motion.div
                className="rotating-text-container"
                aria-label={`Designed To ${text}`}
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
            >
                {characters.map((char, index) => (
                    <motion.span
                        key={index}
                        className="rotating-text-character"
                        variants={{
                            hidden: { y: "200%", opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                transition: {
                                    type: "spring",
                                    damping: 27,
                                    stiffness: 800,
                                },
                            },
                        }}
                        aria-hidden="true"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    )
}
