"use client"

import { Box, VStack } from "@chakra-ui/react"
import DesignContainer from "./DesignContainer"
import RotatingText from "./designs/rotating-text/RotatingText"

export default function PageContainer() {
    return (
        <VStack gap="50px" justifyContent={"center"} alignItems={"center"} pt={20}>
            <RotatingText />
            <Box h={"30px"} />
            <DesignContainer>{/* <RotatingText /> */}</DesignContainer>
            <Box h={"20px"} />
        </VStack>
    )
}
