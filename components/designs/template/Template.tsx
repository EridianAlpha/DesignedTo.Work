"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Template() {
    return (
        <div style={container}>
            <p>Template</p>
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
