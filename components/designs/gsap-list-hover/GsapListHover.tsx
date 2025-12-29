"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSDevTools } from "../../hooks/useGSDevTools"

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
    const firstTimelineRef = useRef<gsap.core.Timeline | null>(null)
    const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const reverseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const isHoveringRef = useRef(false)
    const currentIndexRef = useRef(-1)

    // Attach GSDevTools to the first timeline in development
    useGSDevTools(firstTimelineRef, "gsap-list-hover")

    const scheduleNextCycle = () => {
        // Don't run autoplay while any item is hovered
        if (isHoveringRef.current) return

        const timelines = timelinesRef.current
        if (!timelines.length) return

        // Time before starting the next item's animation (controls overlap)
        const nextStartDelay = 0
        // How long the item should stay in its end state before reversing
        const holdAtEndDelay = 0.3

        autoplayTimeoutRef.current = setTimeout(() => {
            if (isHoveringRef.current) return

            const activeTimelines = timelinesRef.current
            if (!activeTimelines.length) return

            currentIndexRef.current = (currentIndexRef.current + 1) % activeTimelines.length
            const currentIndex = currentIndexRef.current
            const tl = activeTimelines[currentIndex]

            // Don't reset other timelines - let them complete naturally for smooth overlap
            // Just play the current item
            tl.play()

            // Check if this is the last item in the sequence (before it wraps around)
            const isLastItem = currentIndex === activeTimelines.length - 1

            // Keep this item in its "active" end state a bit longer, then reverse it
            reverseTimeoutRef.current = setTimeout(() => {
                if (isHoveringRef.current) return
                tl.reverse()

                // Only schedule next cycle here for the last item (with delay)
                if (currentIndex === activeTimelines.length - 1) {
                    autoplayTimeoutRef.current = setTimeout(() => {
                        if (isHoveringRef.current) return
                        scheduleNextCycle()
                    }, 2000)
                } else {
                    // For non-last items, schedule immediately
                    scheduleNextCycle()
                }
            }, holdAtEndDelay * 1000)
        }, nextStartDelay * 1000)
    }

    useEffect(() => {
        scheduleNextCycle()

        return () => {
            if (autoplayTimeoutRef.current) {
                clearTimeout(autoplayTimeoutRef.current)
                autoplayTimeoutRef.current = null
            }
            if (reverseTimeoutRef.current) {
                clearTimeout(reverseTimeoutRef.current)
                reverseTimeoutRef.current = null
            }
        }
    }, [])

    const handleTimelineReady = (timeline: gsap.core.Timeline) => {
        timelinesRef.current.push(timeline)
        // Set the first timeline for dev tools
        if (!firstTimelineRef.current) {
            firstTimelineRef.current = timeline
        }
    }

    const handleHoverChange = (isHovering: boolean, hoveredTimeline: gsap.core.Timeline | null) => {
        isHoveringRef.current = isHovering

        if (isHovering) {
            // Clear any pending automated animations
            if (autoplayTimeoutRef.current) {
                clearTimeout(autoplayTimeoutRef.current)
                autoplayTimeoutRef.current = null
            }
            if (reverseTimeoutRef.current) {
                clearTimeout(reverseTimeoutRef.current)
                reverseTimeoutRef.current = null
            }

            // Gently send all other timelines back to the start by reversing them
            if (hoveredTimeline) {
                timelinesRef.current.forEach((tl) => {
                    if (tl !== hoveredTimeline) {
                        tl.reverse()
                    }
                })
            }
        } else {
            // Let the hovered item's own mouseleave handler reverse it smoothly.
            // After it finishes reversing, reset all timelines to ensure clean state before restarting autoplay
            currentIndexRef.current = -1

            if (autoplayTimeoutRef.current) {
                clearTimeout(autoplayTimeoutRef.current)
                autoplayTimeoutRef.current = null
            }

            // Wait for the reverse animation to complete, then reset everything and restart autoplay
            autoplayTimeoutRef.current = setTimeout(() => {
                if (!isHoveringRef.current) {
                    // Reset all timelines to base state before restarting autoplay
                    timelinesRef.current.forEach((tl) => {
                        tl.pause(0)
                    })
                    scheduleNextCycle()
                }
            }, 1000)
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
