"use client"

import { VStack } from "@chakra-ui/react"

export default function DesignContainer({ children }: { children: React.ReactNode }) {
    return (
        <VStack
            gap="8"
            justifyContent={"center"}
            alignItems={"center"}
            border={"2px solid"}
            borderColor={"blue.500"}
            borderRadius={"24px"}
            p={4}
            bg="green.800"
        >
            {children}
        </VStack>
    )
}
