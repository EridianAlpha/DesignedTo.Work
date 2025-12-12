"use client"

import { HStack, Text, Button } from "@chakra-ui/react"
import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import { ColorModeToggle } from "./color-mode/ColorModeToggle"

export default function Footer() {
    return (
        <HStack justifyContent={"space-between"} position="relative" w="100%" pb={2} px={5} flexWrap={"wrap-reverse"} columnGap={5} rowGap={5}>
            <HStack fontWeight={"bold"} fontSize={"14px"} textAlign={"center"} gap={1}>
                <Text color={"textColorMuted"}>Designed with ❤️ by </Text>
                <Link href={"https://eridian.xyz"} target="_blank">
                    <HStack color={"blue.500"} gap={"2px"}>
                        <Text>Eridian</Text>
                    </HStack>
                </Link>
            </HStack>
            <HStack gap={8} justifyContent={"end"}>
                <HStack gap={5}>
                    <Link href={"https://github.com/EridianAlpha/DesignedTo.Work"} target="_blank">
                        <Button borderRadius="full" h="28px" minW="28px" aria-label="GitHub" p={0} bg="blue.500" _hover={{ bg: "blue.600" }}>
                            <FontAwesomeIcon icon={faGithub} size="lg" color={"white"} />
                        </Button>
                    </Link>
                    <ColorModeToggle />
                </HStack>
            </HStack>
        </HStack>
    )
}
