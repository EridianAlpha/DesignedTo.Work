"use client"

import { VStack, Box, Text, Button } from "@chakra-ui/react"
import Link from "next/link"
import { useColorModeValue } from "./color-mode/ColorModeProvider"
import { useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faCopy, faCheckCircle } from "@fortawesome/free-solid-svg-icons"

import { customConfig } from "../styles/theme"
import type { DesignComponent } from "../interfaces/types"
import { getDesignConfig, type DesignEntry } from "./designs"
import type React from "react"

export default function DesignContainer({ design }: { design: DesignComponent | DesignEntry | React.ComponentType }) {
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

    // Handle both DesignEntry and component
    const designEntry = "component" in design && "config" in design ? design : undefined
    const component = designEntry ? designEntry.component : (design as React.ComponentType)
    const config = designEntry ? designEntry.config : getDesignConfig(design as React.ComponentType)

    if (!config) {
        console.error("DesignContainer: No config found for design", design)
        return null
    }

    const { theme, title, sourceLink, designNotesLink, slug } = config
    const Design = component

    // Determine the background color based on the theme prop
    let vStackBg: string | undefined = undefined
    if (theme === "dark") vStackBg = pageBackground._dark
    else if (theme === "light") vStackBg = pageBackground._light

    const [linkCopied, setLinkCopied] = useState(false)

    const handleCopyLink = async () => {
        const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
        const url = `${baseUrl}/design/${slug}`
        try {
            await navigator.clipboard.writeText(url)
            setLinkCopied(true)
            setTimeout(() => setLinkCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy link:", err)
        }
    }

    if (mounted) {
        return (
            <Box position={"relative"} maxW={"95dvw"} w={"800px"} maxH={"400px"} h={"400px"} boxShadow={boxShadow} borderRadius={"16px"}>
                <VStack
                    w={"100%"}
                    h={"100%"}
                    gap="8"
                    border={"3px solid"}
                    borderColor={"blue.500"}
                    borderRadius={"16px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    overflow={"hidden"}
                    position={"relative"}
                    {...(vStackBg ? { bg: vStackBg } : {})}
                >
                    <Design />
                </VStack>
                <Box
                    position={"absolute"}
                    bg={"contentBackground"}
                    h={"30px"}
                    top={"3px"}
                    left={"3px"}
                    transformOrigin={"center"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderTopLeftRadius={"13px"}
                    borderBottomRightRadius={"12px"}
                    borderBottom={"3px solid"}
                    borderRight={"3px solid"}
                    borderColor={"blue.500"}
                    pl={0}
                    pr={2}
                    zIndex={2}
                    cursor="default"
                    boxShadow={boxShadow}
                >
                    <Text whiteSpace={"nowrap"} textAlign={"start"} fontWeight={"bold"} w={"100%"} pl={3} pr={1}>
                        {title}
                    </Text>
                </Box>
                <Box
                    position={"absolute"}
                    bg={"blue.500"}
                    h={"30px"}
                    top={"0px"}
                    right={"2px"}
                    transformOrigin={"center"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderTopRightRadius={"13px"}
                    borderBottomLeftRadius={"12px"}
                    borderBottom={"3px solid"}
                    borderLeft={"3px solid"}
                    borderColor={"blue.500"}
                    pl={2}
                    pr={2}
                    pt={"3px"}
                    zIndex={2}
                    cursor="pointer"
                    boxShadow={boxShadow}
                    onClick={handleCopyLink}
                    transition={"transform 0.2s ease-in"}
                    _hover={{ transform: "translateY(2px)" }}
                >
                    <Text
                                whiteSpace={"nowrap"}
                                textAlign={"center"}
                                fontWeight={"bold"}
                                color={pageBackground._light}
                                textShadow="1px 2px 8px rgba(0,0,0,0.8)"
                                minW={"20px"}
                            >
                                {linkCopied ? <FontAwesomeIcon icon={faCheckCircle} size="sm" style={{ filter: "drop-shadow(2px 2px 4px black)" }} />: <FontAwesomeIcon icon={faCopy} size="sm" style={{ filter: "drop-shadow(2px 2px 4px black)" }} />}
                            </Text>
                </Box>
                {designNotesLink && (
                    <Link href={designNotesLink ?? "#"} target="_blank" rel="noopener noreferrer">
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
                            borderBottomRightRadius={"18px"}
                            borderBottomLeftRadius={"0px"}
                            pl={0}
                            pr={0}
                            transition={"transform 0.2s ease-in"}
                            _hover={{ transform: "translateY(-2px)" }}
                            zIndex={2}
                        >
                            <Text
                                whiteSpace={"nowrap"}
                                textAlign={"center"}
                                fontWeight={"bold"}
                                color={pageBackground._light}
                                textShadow="1px 2px 8px rgba(0,0,0,0.8)"
                            >
                                Design Notes
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" style={{ filter: "drop-shadow(2px 2px 4px black)" }} />
                            </Text>
                        </Button>
                    </Link>
                )}
                {sourceLink && (
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
                            borderBottomLeftRadius={"18px"}
                            borderBottomRightRadius={"0px"}
                            pl={2}
                            pr={0}
                            transition={"transform 0.2s ease-in"}
                            _hover={{ transform: "translateY(-2px)" }}
                            zIndex={2}
                        >
                            <Text
                                whiteSpace={"nowrap"}
                                textAlign={"center"}
                                fontWeight={"bold"}
                                color={pageBackground._light}
                                textShadow="1px 2px 8px rgba(0,0,0,0.8)"
                            >
                                Source
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" style={{ filter: "drop-shadow(2px 2px 4px black)" }} />
                            </Text>
                        </Button>
                    </Link>
                )}
            </Box>
        )
    }
    return null
}
