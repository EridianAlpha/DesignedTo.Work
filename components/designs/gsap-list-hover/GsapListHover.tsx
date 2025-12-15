"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

function GsapListItem({ text }: { text: string }) {
    const itemRef = useRef<HTMLDivElement | null>(null)
    const dotRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        if (!itemRef.current || !dotRef.current || !textRef.current) return

        gsap.defaults({ duration: 0.3 })

        timelineRef.current = gsap.timeline({ paused: true }).to(textRef.current, { color: "white", x: 10 }).to(
            dotRef.current,
            {
                backgroundColor: "green",
                scale: 1.5,
            },
            0,
        )

        return () => {
            timelineRef.current?.kill()
            timelineRef.current = null
        }
    }, [])

    const handleMouseEnter = () => {
        timelineRef.current?.play()
    }

    const handleMouseLeave = () => {
        timelineRef.current?.reverse()
    }

    return (
        <div ref={itemRef} style={item} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div ref={dotRef} style={dot} />
            <div ref={textRef} style={textStyle}>
                {text}
            </div>
        </div>
    )
}

export default function GsapListHover() {
    return (
        <div style={container}>
            <GsapListItem text={"Home"} />
            <GsapListItem text={"Home"} />
            <GsapListItem text={"Home"} />
            <GsapListItem text={"Home"} />
        </div>
    )
}

// ===========   Styles   ===========
const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
}

const item: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
}

const dot: React.CSSProperties = {
    height: 20,
    minWidth: 20,
    backgroundColor: "#333",
    borderRadius: "50%",
    marginRight: 10,
}

const textStyle: React.CSSProperties = {
    color: "#777",
    fontFamily: "Raleway, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: 700,
    textTransform: "uppercase",
    margin: 4,
    fontSize: 40,
    whiteSpace: "nowrap",
}
