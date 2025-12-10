"use client"

import { VStack } from "@chakra-ui/react"

export default function DesignContainer({ children }: { children: React.ReactNode }) {
    return (
        <VStack
            gap="8"
            justifyContent={"center"}
            alignItems={"center"}
            border={"3px solid"}
            borderColor={"blue.500"}
            borderRadius={"24px"}
            p={4}
            maxW={"800px"}
            w={"800px"}
            maxH={"400px"}
            h={"400px"}
        >
            {children}
        </VStack>
    )
}
