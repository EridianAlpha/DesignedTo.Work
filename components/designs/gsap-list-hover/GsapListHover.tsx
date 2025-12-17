"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface GsapListItemProps {
    text: string
    onTimelineReady?: (timeline: gsap.core.Timeline) => void
    onHoverChange?: (isHovering: boolean, timeline: gsap.core.Timeline | null) => void
}

function GsapListItem({ text, onTimelineReady, onHoverChange }: GsapListItemProps) {
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

        if (timelineRef.current && onTimelineReady) {
            onTimelineReady(timelineRef.current)
        }

        return () => {
            timelineRef.current?.kill()
            timelineRef.current = null
        }
    }, [onTimelineReady])

    const handleMouseEnter = () => {
        onHoverChange?.(true, timelineRef.current)
        timelineRef.current?.play()
    }

    const handleMouseLeave = () => {
        onHoverChange?.(false, timelineRef.current)
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
    const timelinesRef = useRef<gsap.core.Timeline[]>([])
    const autoplayTimeoutRef = useRef<gsap.core.Tween | null>(null)
    const hoverCountRef = useRef(0)
    const currentIndexRef = useRef(-1)

    const scheduleNextCycle = () => {
        // Don't run autoplay while any item is hovered
        if (hoverCountRef.current > 0) return

        const timelines = timelinesRef.current
        if (!timelines.length) return

        // Time before starting the next item's animation (controls overlap)
        const nextStartDelay = 0.6
        // How long the item should stay in its end state before reversing
        const holdAtEndDelay = 0.4

        autoplayTimeoutRef.current = gsap.delayedCall(nextStartDelay, () => {
            if (hoverCountRef.current > 0) return

            const activeTimelines = timelinesRef.current
            if (!activeTimelines.length) return

            currentIndexRef.current = (currentIndexRef.current + 1) % activeTimelines.length
            const tl = activeTimelines[currentIndexRef.current]

            // Play the item, then gently reverse it back, then move to the next
            tl.play()

            // Keep this item in its "active" end state a bit longer, then reverse it
            gsap.delayedCall(holdAtEndDelay, () => {
                if (hoverCountRef.current > 0) return
                tl.reverse()
            })

            scheduleNextCycle()
        })
    }

    useEffect(() => {
        scheduleNextCycle()

        return () => {
            autoplayTimeoutRef.current?.kill()
            autoplayTimeoutRef.current = null
        }
    }, [])

    const handleTimelineReady = (timeline: gsap.core.Timeline) => {
        timelinesRef.current.push(timeline)
    }

    const handleHoverChange = (isHovering: boolean, hoveredTimeline: gsap.core.Timeline | null) => {
        if (isHovering) {
            hoverCountRef.current += 1

            // Gently send all other timelines back to the start by reversing them,
            // instead of snapping them back.
            if (hoveredTimeline) {
                timelinesRef.current.forEach((tl) => {
                    if (tl !== hoveredTimeline) {
                        tl.reverse()
                    }
                })
            }

            if (hoverCountRef.current === 1) {
                autoplayTimeoutRef.current?.kill()
                autoplayTimeoutRef.current = null
            }
        } else {
            hoverCountRef.current = Math.max(hoverCountRef.current - 1, 0)
            if (hoverCountRef.current === 0 && !autoplayTimeoutRef.current) {
                // Restart autoplay from the beginning after a short delay
                currentIndexRef.current = -1
                autoplayTimeoutRef.current = gsap.delayedCall(1, () => {
                    autoplayTimeoutRef.current = null
                    scheduleNextCycle()
                })
            }
        }
    }

    return (
        <div style={container}>
            <GsapListItem text={"The"} onTimelineReady={handleTimelineReady} onHoverChange={handleHoverChange} />
            <GsapListItem text={"Future"} onTimelineReady={handleTimelineReady} onHoverChange={handleHoverChange} />
            <GsapListItem text={"Looks"} onTimelineReady={handleTimelineReady} onHoverChange={handleHoverChange} />
            <GsapListItem text={"Good"} onTimelineReady={handleTimelineReady} onHoverChange={handleHoverChange} />
        </div>
    )
}

// ===========   Styles   ===========
const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
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
