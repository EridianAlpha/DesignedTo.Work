"use client"

import { useMemo } from "react"
import { motion } from "motion/react"
import "./RotatingText.css"

export default function RotatingText({ text }: { text: string }) {
    const characters = useMemo(() => {
        // Split text into characters, preserving spaces
        if (typeof Intl !== "undefined" && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
            return Array.from(segmenter.segment(text), (segment) => segment.segment)
        }
        return Array.from(text)
    }, [text])

    return (
        <motion.div
            className={`inline-flex flex-wrap overflow-hidden h-[100px] bg-blue-500`}
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
            <span className="sr-only">{text}</span>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block overflow-hidden"
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
    )
}
