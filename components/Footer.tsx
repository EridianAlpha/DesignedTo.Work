"use client"

import { HStack, Text } from "@chakra-ui/react"
import Link from "next/link"

import { ColorModeToggle } from "./color-mode/ColorModeToggle"

export default function Footer() {
    return (
        <HStack justifyContent={"space-between"} position="relative" w="100%" pb={2} px={4} flexWrap={"wrap-reverse"} columnGap={5} rowGap={5}>
            <HStack alignItems={"center"} gap={1} justifyContent={"center"} h={"28px"} justifySelf={"center"} minW="58px" />
            <HStack fontWeight={"bold"} fontSize={"14px"} textAlign={"center"} gap={1}>
                <Text color={"textColorMuted"}>Built with ❤️ by </Text>
                <Link href={"https://eridian.xyz"} target="_blank">
                    <HStack textDecoration={"underline"} color={"blue.500"} gap={"2px"}>
                        <Text>Eridian</Text>
                    </HStack>
                </Link>
            </HStack>
            <HStack gap={8} justifyContent={"end"}>
                <HStack gap={3}>
                    <ColorModeToggle />
                </HStack>
            </HStack>
        </HStack>
    )
}
