"use client"

import { VStack } from "@chakra-ui/react"
import RotatingText from "./designs/RotatingText"
import DesignContainer from "./DesignContainer"

export default function PageContainer() {
    return (
        <VStack gap="8" justifyContent={"center"} alignItems={"center"} py={10}>
            {/* <RotatingText /> */}
            <DesignContainer>
                <RotatingText />
            </DesignContainer>
        </VStack>
    )
}
