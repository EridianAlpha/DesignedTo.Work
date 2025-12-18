"use client"

import { useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"
import "./GsapButtonPulse.css"

export default function GsapButtonPulse() {
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const pulseTweenRef = useRef<gsap.core.Tween | null>(null)
    const rewindTweenRef = useRef<gsap.core.Tween | null>(null)
    const isHoveredRef = useRef(false)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    // Global auto-pulse timer that other handlers can reset
    const resetAutoPulseTimer = useCallback(() => {
        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        // Start a new interval that periodically triggers a programmatic pulse
        intervalRef.current = setInterval(() => {
            if (!isHoveredRef.current) {
                if (!pulseTweenRef.current?.isActive()) {
                    handleMouseEnter()
                } else {
                    handleMouseLeave()
                }
            }
        }, 3700)
    }, [])

    useEffect(() => {
        if (!buttonRef.current) return

        // Create the looping pulse tween once and keep a ref to it
        pulseTweenRef.current = gsap.to(buttonRef.current, {
            scale: 1,
            y: -30,
            repeat: -1,
            yoyo: true,
            duration: 0.7,
            ease: "ease-out",
            paused: true, // start paused so we can control it
        })

        // Fire the first pulse immediately on mount
        handleMouseEnter()

        // Start the global auto-pulse timer so subsequent pulses wait 3500ms
        resetAutoPulseTimer()

        return () => {
            // Clean up on unmount
            pulseTweenRef.current?.kill()
            pulseTweenRef.current = null

            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [resetAutoPulseTimer])

    const handleMouseEnter = () => {
        // If a rewind tween is running, kill it so it doesn't fight with the pulse
        if (rewindTweenRef.current) {
            rewindTweenRef.current.kill()
            rewindTweenRef.current = null
        }

        const tween = pulseTweenRef.current
        if (!tween) return

        // If the pulse is already running (e.g. from a simulated hover),
        // just let it keep going instead of restarting from the beginning.
        if (tween.isActive()) {
            return
        }

        // Otherwise, start a new pulse from the beginning
        tween.restart(true)
    }

    const handleMouseLeave = () => {
        // Restart the global auto-pulse timer when the mouse leaves
        resetAutoPulseTimer()

        const tween = pulseTweenRef.current
        if (!tween) return

        // If a previous rewind is in progress, cancel it and start a new one
        if (rewindTweenRef.current) {
            rewindTweenRef.current.kill()
            rewindTweenRef.current = null
        }

        // Animate the tween's play head back to the start (time: 0),
        // which smoothly moves the button back to its initial scale.
        rewindTweenRef.current = gsap.to(tween, {
            time: 0,
            duration: 0.7,
            ease: "ease-out",
            onComplete: () => {
                tween.pause(0)
                rewindTweenRef.current = null
            },
        })
    }

    return (
        <div className="container">
            <button
                className="button"
                ref={buttonRef}
                onMouseEnter={() => {
                    isHoveredRef.current = true
                    handleMouseEnter()
                }}
                onMouseLeave={() => {
                    isHoveredRef.current = false
                    handleMouseLeave()
                }}
            >
                🎾 Bounce 🎾
            </button>
        </div>
    )
}
