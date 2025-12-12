"use client"

import { VStack, Box, Text } from "@chakra-ui/react"
import { useColorModeValue } from "./color-mode/ColorModeProvider"
import { useEffect, useState } from "react"

import { customConfig } from "../styles/theme"

export default function DesignContainer({ theme, children = null }: { theme?: "dark" | "light"; children?: React.ReactNode | null }) {
    const boxShadow = useColorModeValue(
        "4px 4px 6px -1px rgba(0, 0, 0, 0.2), 2px 2px 4px -1px rgba(0, 0, 0, 0.1)",
        "4px 4px 6px -1px rgba(59, 130, 246, 0.5), 2px 2px 4px -1px rgba(59, 130, 246, 0.5)",
    )
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const pageBackground = customConfig.theme?.semanticTokens?.colors?.pageBackground?.value as {
        _light: string
        _dark: string
    }

    // Determine the background color based on the theme prop
    let vStackBg: string | undefined = undefined
    if (theme === "dark") vStackBg = pageBackground._dark
    else if (theme === "light") vStackBg = pageBackground._light

    if (mounted) {
        return (
            <VStack
                gap="8"
                justifyContent={"center"}
                alignItems={"center"}
                border={"3px solid"}
                borderColor={"blue.500"}
                borderRadius={"24px"}
                overflow={"hidden"}
                maxW={"95dvw"}
                w={"800px"}
                maxH={"400px"}
                h={"400px"}
                boxShadow={boxShadow}
                position={"relative"}
                {...(vStackBg ? { bg: vStackBg } : {})}
            >
                {children ?? null}
                <Box
                    position={"absolute"}
                    bg={"blue.500"}
                    w={"60px"}
                    h={"30px"}
                    bottom={"0px"}
                    right={"0px"}
                    transformOrigin={"center"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderTopLeftRadius={"12px"}
                    borderBottomRightRadius={"16px"}
                >
                    <Text whiteSpace={"nowrap"} textAlign={"center"} fontWeight={"bold"}>
                        Docs
                    </Text>
                </Box>
            </VStack>
        )
    }
    return null
}
