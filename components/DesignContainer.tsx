"use client"

import { VStack } from "@chakra-ui/react"
import { useColorModeValue } from "./color-mode/ColorModeProvider"
import { useEffect, useState } from "react"

export default function DesignContainer({ children = null }: { children?: React.ReactNode | null }) {
    const boxShadow = useColorModeValue(
        "4px 4px 6px -1px rgba(0, 0, 0, 0.2), 2px 2px 4px -1px rgba(0, 0, 0, 0.1)",
        "4px 4px 6px -1px rgba(59, 130, 246, 0.5), 2px 2px 4px -1px rgba(59, 130, 246, 0.5)",
    )
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

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
            >
                {children ?? null}
            </VStack>
        )
    }
    return null
}
