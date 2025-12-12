"use client"

import { VStack, Box, Text, Button } from "@chakra-ui/react"
import Link from "next/link"
import { useColorModeValue } from "./color-mode/ColorModeProvider"
import { useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import { customConfig } from "../styles/theme"

export default function DesignContainer({
    theme,
    title,
    sourceLink,
    children = null,
}: {
    theme?: "dark" | "light"
    title?: string
    sourceLink?: string
    children?: React.ReactNode | null
}) {
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
            <Box position={"relative"} maxW={"95dvw"} w={"800px"} maxH={"400px"} h={"400px"}>
                <VStack
                    w={"100%"}
                    h={"100%"}
                    gap="8"
                    border={"3px solid"}
                    borderColor={"blue.500"}
                    borderRadius={"24px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    overflow={"hidden"}
                    boxShadow={boxShadow}
                    position={"relative"}
                    {...(vStackBg ? { bg: vStackBg } : {})}
                >
                    {children ?? null}
                </VStack>
                <Box
                    position={"absolute"}
                    bg={"pageBackground"}
                    h={"30px"}
                    top={"3px"}
                    left={"3px"}
                    transformOrigin={"center"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderTopLeftRadius={"21px"}
                    borderBottomRightRadius={"12px"}
                    borderBottom={"3px solid"}
                    borderRight={"3px solid"}
                    borderColor={"blue.500"}
                    pl={0}
                    pr={2}
                    zIndex={2}
                    cursor="default"
                >
                    <Text whiteSpace={"nowrap"} textAlign={"start"} fontWeight={"bold"} w={"100%"} pl={4} pr={1}>
                        {title}
                    </Text>
                </Box>
                <Button
                    position={"absolute"}
                    bg={"blue.500"}
                    w={"130px"}
                    h={"30px"}
                    bottom={"0px"}
                    right={"0px"}
                    transformOrigin={"center"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderTopLeftRadius={"12px"}
                    borderBottomRightRadius={"30px"}
                    borderBottomLeftRadius={"0px"}
                    pl={0}
                    pr={2}
                    transition={"transform 0.2s ease-in"}
                    _hover={{ transform: "translateY(-2px)" }}
                    zIndex={2}
                >
                    <Text whiteSpace={"nowrap"} textAlign={"center"} fontWeight={"bold"} color={pageBackground._light}>
                        <FontAwesomeIcon icon={faChevronRight} size="sm" />
                        Design notes
                    </Text>
                </Button>
                <Link href={sourceLink ?? "#"} target="_blank" rel="noopener noreferrer">
                    <Button
                        position={"absolute"}
                        bg={"blue.500"}
                        w={"95px"}
                        h={"30px"}
                        bottom={"0px"}
                        left={"0px"}
                        transformOrigin={"center"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderTopRightRadius={"12px"}
                        borderBottomLeftRadius={"30px"}
                        borderBottomRightRadius={"0px"}
                        pl={2}
                        pr={0}
                        transition={"transform 0.2s ease-in"}
                        _hover={{ transform: "translateY(-2px)" }}
                        zIndex={2}
                    >
                        <Text whiteSpace={"nowrap"} textAlign={"center"} fontWeight={"bold"} color={pageBackground._light}>
                            Source
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
                        </Text>
                    </Button>
                </Link>
            </Box>
        )
    }
    return null
}
