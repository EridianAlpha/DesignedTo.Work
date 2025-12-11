"use client"

import { Box, VStack } from "@chakra-ui/react"
import DesignContainer from "./DesignContainer"
import RotatingText from "./designs/rotating-text/RotatingText"
import DragLockDirection from "./designs/drag-lock-direction/DragLockDirection"
import SparkleButton from "./designs/sparkle-button/SparkleButton"

export default function PageContainer() {
    return (
        <VStack gap="50px" justifyContent={"center"} alignItems={"center"} pt={20}>
            <RotatingText />
            <Box h={"30px"} />
            <DesignContainer>
                <SparkleButton />
            </DesignContainer>
            <DesignContainer>
                <DragLockDirection />
            </DesignContainer>
            <DesignContainer>
                <RotatingText />
            </DesignContainer>
            <Box h={"20px"} />
        </VStack>
    )
}
