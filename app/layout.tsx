import { Provider } from "./provider"
import Head from "./head"
import type { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Head />
            <body suppressHydrationWarning>
                <Provider>{children}</Provider>
            </body>
        </html>
    )
}
