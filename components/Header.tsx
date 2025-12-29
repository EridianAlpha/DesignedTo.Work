"use client"

import { HStack, Text, Box, Button } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { ColorModeToggle } from "./color-mode/ColorModeToggle"

export default function Header() {
    const [emoji, setEmoji] = useState<string>("")

    useEffect(() => {
        const fetchEmoji = async () => {
            try {
                const response = await fetch("/api/favicon")
                const svgText = await response.text()
                // Extract emoji from SVG text content
                const match = svgText.match(/<text[^>]*>([^<]+)<\/text>/)
                if (match && match[1]) {
                    setEmoji(match[1].trim())
                }
            } catch (err) {
                console.error("Failed to fetch favicon:", err)
                // Fallback to default emoji
                setEmoji("💻")
            }
        }
        fetchEmoji()
    }, [])

    return (
        <Box
            position="sticky"
            top={0}
            w="100%"
            bg="pageBackground"
            borderBottom="1px solid"
            borderColor="blue.500"
            zIndex={10}
            backdropFilter="blur(10px)"
        >
            <HStack
                justifyContent={"space-between"}
                position="relative"
                w="100%"
                py={4}
                px={5}
                flexWrap={"wrap-reverse"}
                columnGap={5}
                rowGap={5}
                maxW="1400px"
                mx="auto"
            >
                <HStack>

                <Link href="/" style={{ textDecoration: "none" }}>
                    <HStack fontWeight={"bold"} fontSize={"20px"} textAlign={"center"} gap={2} _hover={{ color: "blue.600" }} transition="color 0.2s" alignItems="center">
                        {emoji && <Text fontSize="24px">{emoji}</Text>}
                        <Text>DesignedTo.Work</Text>

                    </HStack>
                </Link>
                                <Link href="/" style={{ textDecoration: "none" }}>
                                <Button
                                bg={"blue.500"}
                            w={"130px"}
                            h={"30px"}
                            bottom={"0px"}
                            right={"0px"}
                            transformOrigin={"center"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            borderRadius={"12px"}
                            pl={0}
                            pr={0}
                            transition={"transform 0.2s ease-in"}
                            _hover={{ transform: "translateY(-2px)" }}
                                >
                                    <Text
                                whiteSpace={"nowrap"}
                                textAlign={"center"}
                                fontWeight={"bold"}
                                color={"white"}
                                textShadow="1px 2px 8px rgba(0,0,0,0.8)"
                            >

                                    View All Designs
                            </Text>
                                    </Button>
                                </Link>
                </HStack>
                <HStack gap={8} justifyContent={"end"}>
                    {/* <HStack gap={5}>
                        <ColorModeToggle />
                    </HStack> */}
                </HStack>
            </HStack>
        </Box>
    )
}
