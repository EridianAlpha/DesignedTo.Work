"use client"

import { VStack } from "@chakra-ui/react"
import DesignContainer from "./DesignContainer"
import RotatingText from "./designs/rotating-text/RotatingText"

export default function PageContainer() {
    return (
        <VStack gap="8" justifyContent={"center"} alignItems={"center"} py={10}>
            {/* <RotatingText /> */}
            <DesignContainer>
                {/* <RotatingText /> */}
                <RotatingText />
            </DesignContainer>
        </VStack>
    )
}
