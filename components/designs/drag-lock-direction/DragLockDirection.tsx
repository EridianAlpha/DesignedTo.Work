"use client"

import * as motion from "motion/react-client"
import { useState, useRef, useEffect } from "react"
export default function Drag() {
    const [activeDirection, setActiveDirection] = useState<"x" | "y" | null>(null)
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const boxRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const updatePosition = () => {
        if (boxRef.current && containerRef.current) {
            const boxRect = boxRef.current.getBoundingClientRect()
            const containerRect = containerRef.current.getBoundingClientRect()

            // Calculate center of box relative to center of container
            const boxCenterX = boxRect.left + boxRect.width / 2
            const boxCenterY = boxRect.top + boxRect.height / 2
            const containerCenterX = containerRect.left + containerRect.width / 2
            const containerCenterY = containerRect.top + containerRect.height / 2

            setPositionX(boxCenterX - containerCenterX)
            setPositionY(boxCenterY - containerCenterY)
        }
    }

    useEffect(() => {
        updatePosition()
    }, [])

    return (
        <div
            ref={containerRef}
            style={{
                ...container,
                cursor: activeDirection === "x" ? "col-resize" : activeDirection === "y" ? "row-resize" : activeDirection ? "grab" : "default",
            }}
        >
            <Line direction="x" activeDirection={activeDirection} />
            <Line direction="y" activeDirection={activeDirection} />
            <motion.div
                ref={boxRef}
                drag
                dragDirectionLock
                onDirectionLock={(direction) => setActiveDirection(direction)}
                onDragStart={() => setIsDragging(true)}
                onDrag={() => {
                    updatePosition()
                }}
                onDragEnd={() => {
                    setActiveDirection(null)
                    setIsDragging(false)
                    updatePosition()
                }}
                dragConstraints={{ top: -25, right: -25, bottom: -25, left: -25 }}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
                dragElastic={0.2}
                initial={{ x: "-50%", y: "-50%" }}
                style={
                    {
                        ...box,
                        top: "50%",
                        left: "50%",
                        cursor: activeDirection === "x" ? "col-resize" : activeDirection === "y" ? "row-resize" : "grab",
                        cornerShape: isDragging
                            ? positionX > 0
                                ? "round bevel bevel round"
                                : positionX < 0
                                  ? "bevel round round bevel"
                                  : positionY > 0
                                    ? "round round bevel bevel"
                                    : positionY < 0
                                      ? "bevel bevel round round"
                                      : undefined
                            : undefined,
                    } as React.CSSProperties
                }
            />
        </div>
    )
}

function Line({ direction, activeDirection }: { direction: "x" | "y"; activeDirection: "x" | "y" | null }) {
    return (
        <motion.div
            initial={false}
            animate={{ opacity: activeDirection === direction ? 1 : 0.3 }}
            transition={{ duration: 0.1 }}
            style={{
                ...line,
                rotate: direction === "y" ? 90 : 0,
                top: direction === "x" ? "50%" : undefined,
            }}
        />
    )
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
}

const box: React.CSSProperties = {
    width: 50,
    height: 50,
    border: "3px solid #f5f5f5",
    position: "absolute",
    cursor: "grab",
    borderRadius: "100%",
}

const line: React.CSSProperties = {
    width: "100%",
    height: 1,
    borderTop: "1px dashed #f5f5f5",
    position: "absolute",
}
