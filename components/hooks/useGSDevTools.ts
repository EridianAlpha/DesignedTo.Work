"use client"

import { useEffect, useRef, type RefObject } from "react"
import { gsap } from "gsap"

/**
 * Hook to attach GSDevTools to a GSAP animation in development mode only.
 * This code is completely removed from production builds via webpack dead code elimination.
 *
 * @param animationRef - A ref containing the GSAP animation (tween or timeline) to attach dev tools to
 * @param id - Optional unique identifier for the dev tools instance
 */
export function useGSDevTools(animationRef: RefObject<gsap.core.Animation | null>, id?: string) {
    const devToolsRef = useRef<any | null>(null)

    useEffect(() => {
        // This entire block is removed in production builds
        if (process.env.NODE_ENV !== "development") return

        // Check periodically if animation is ready (since refs don't trigger re-renders)
        const checkInterval = setInterval(() => {
            if (animationRef.current && !devToolsRef.current) {
                clearInterval(checkInterval)

                // Dynamically import GSDevTools only in development
                ;(async () => {
                    try {
                        if (devToolsRef.current || !animationRef.current) return

                        const { GSDevTools } = await import("gsap/GSDevTools")
                        gsap.registerPlugin(GSDevTools)

                        devToolsRef.current = GSDevTools.create({
                            animation: animationRef.current,
                            ...(id && { id }),
                        })
                    } catch (error) {
                        // Silently ignore GSDevTools errors (e.g., if plugin is unavailable)
                        console.warn("GSDevTools failed to initialize:", error)
                    }
                })()
            }
        }, 50) // Check every 50ms

        // Also check immediately
        if (animationRef.current && !devToolsRef.current) {
            clearInterval(checkInterval)
            ;(async () => {
                try {
                    if (devToolsRef.current || !animationRef.current) return

                    const { GSDevTools } = await import("gsap/GSDevTools")
                    gsap.registerPlugin(GSDevTools)

                    devToolsRef.current = GSDevTools.create({
                        animation: animationRef.current,
                        ...(id && { id }),
                    })
                } catch (error) {
                    console.warn("GSDevTools failed to initialize:", error)
                }
            })()
        }

        return () => {
            clearInterval(checkInterval)
            if (devToolsRef.current) {
                devToolsRef.current.kill()
                devToolsRef.current = null
            }
        }
    }, [animationRef, id])
}
