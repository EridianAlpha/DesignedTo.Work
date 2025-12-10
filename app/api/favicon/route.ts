import { NextResponse } from "next/server"

export async function GET() {
    const emoji = process.env.NEXT_PUBLIC_FAVICON_EMOJI || "💻"

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <text y="0.9em" font-size="32">${emoji}</text>
    </svg>
  `

    return new NextResponse(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
        },
    })
}
