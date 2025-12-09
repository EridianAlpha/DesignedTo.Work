"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "../components/color-mode/ColorModeProvider"

import { customConfig } from "../styles/theme"

export function Provider(props: ColorModeProviderProps) {
    return (
        <ColorModeProvider attribute="class" disableTransitionOnChange {...props}>
            <ChakraProvider value={customConfig}>{props.children}</ChakraProvider>
        </ColorModeProvider>
    )
}
