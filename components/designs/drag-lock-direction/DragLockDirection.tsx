"use client"

import * as motion from "motion/react-client"
import { useState, useRef } from "react"
export default function Drag() {
    const [activeDirection, setActiveDirection] = useState<"x" | "y" | null>(null)
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const boxRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const boxSize = 50

    const updatePosition = () => {
        if (boxRef.current && containerRef.current) {
            const boxRect = boxRef.current.getBoundingClientRect()
            const containerRect = containerRef.current.getBoundingClientRect()

            // Calculate center of box relative to center of container
            const boxCenterX = boxRect.left + boxRect.width / 2
            const boxCenterY = boxRect.top + boxRect.height / 2
            const containerCenterX = containerRect.left + containerRect.width / 2
            const containerCenterY = containerRect.top + containerRect.height / 2

            if (isDragging) {
                if (positionX > boxSize / 16 || positionX < -boxSize / 16) {
                    setActiveDirection("x")
                }
                if (positionY > boxSize / 16 || positionY < -boxSize / 16) {
                    setActiveDirection("y")
                }
            }

            setPositionX(boxCenterX - containerCenterX)
            setPositionY(boxCenterY - containerCenterY)
        }
    }

    return (
        <div
            ref={containerRef}
            style={{
                ...container,
                cursor: isDragging
                    ? positionX > boxSize / 16 || positionX < -boxSize / 16 || activeDirection === "x"
                        ? "col-resize"
                        : positionY > boxSize / 16 || positionY < -boxSize / 16 || activeDirection === "y"
                          ? "row-resize"
                          : "grabbing"
                    : "default",
            }}
        >
            {[
                {
                    direction: "x" as const,
                    style: {
                        top: "50%",
                        transform: "translateY(calc(-50% + 0px))",
                        width: "100%",
                        height: 0,
                    },
                },
                {
                    direction: "y" as const,
                    style: {
                        left: "calc(50% - 1px)",
                        top: 0,
                        transform: "translateX(-50%)",
                        rotate: 0,
                        width: 0,
                        height: "200%",
                    },
                },
            ].map(({ direction, style }) => (
                <motion.div
                    key={direction}
                    initial={false}
                    animate={{ opacity: isDragging && activeDirection === direction ? 1 : 0.3 }}
                    transition={{ duration: 0.3, ease: "easeIn" }}
                    style={{
                        ...line,
                        ...style,
                    }}
                />
            ))}
            <motion.div
                ref={boxRef}
                drag
                dragDirectionLock
                onDirectionLock={(direction) => setActiveDirection(direction)}
                onPointerDown={() => setIsPressed(true)}
                onPointerUp={() => setIsPressed(false)}
                onDragStart={() => {
                    setIsDragging(true)
                    setIsPressed(false)
                    setActiveDirection(null)
                    setPositionX(0)
                    setPositionY(0)
                }}
                onDrag={() => {
                    updatePosition()
                }}
                onDragEnd={() => {
                    setIsDragging(false)
                    setIsPressed(false)
                    setActiveDirection(null)
                    setPositionX(0)
                    setPositionY(0)
                    updatePosition()
                }}
                dragConstraints={{ top: -boxSize / 2, right: -boxSize / 2, bottom: -boxSize / 2, left: -boxSize / 2 }}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
                dragElastic={0.2}
                initial={{ x: "-50%", y: "-50%" }}
                style={
                    {
                        ...box(boxSize),
                        top: "50%",
                        left: "50%",
                        cursor:
                            isPressed && !isDragging
                                ? "grabbing"
                                : isDragging
                                  ? activeDirection === "x"
                                      ? "col-resize"
                                      : activeDirection === "y"
                                        ? "row-resize"
                                        : "grab"
                                  : "grab",
                        cornerShape: isDragging
                            ? positionX > boxSize / 16
                                ? "round bevel bevel round"
                                : positionX < -boxSize / 16
                                  ? "bevel round round bevel"
                                  : positionY > boxSize / 16
                                    ? "round round bevel bevel"
                                    : positionY < -boxSize / 16
                                      ? "bevel bevel round round"
                                      : undefined
                            : undefined,
                        transitionProperty: "corner-shape",
                        transitionDuration: "0.2s",
                        transitionTimingFunction: "ease-in",
                    } as React.CSSProperties
                }
            />
        </div>
    )
}

// ===========   Styles   ===========
const container: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
}

const box = (boxSize: number): React.CSSProperties => ({
    width: boxSize,
    height: boxSize,
    border: "3px solid#029e03",
    backgroundColor: "rgb(2, 158, 3, 0.3)",
    position: "absolute",
    cursor: "grab",
    borderRadius: "100%",
})

const line: React.CSSProperties = {
    border: "1px dotted #3B82F6",
    position: "absolute",
}
