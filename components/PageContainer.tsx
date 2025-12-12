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
            <DesignContainer theme="dark" sourceLink={"https://codepen.io/jh3y/pen/LYJMPBL"}>
                <SparkleButton />
            </DesignContainer>
            <DesignContainer sourceLink={"https://motion.dev/tutorials/react-drag"}>
                <DragLockDirection />
            </DesignContainer>
            <DesignContainer sourceLink={"https://www.reactbits.dev/text-animations/rotating-text"}>
                <RotatingText />
            </DesignContainer>
            <Box h={"20px"} />
        </VStack>
    )
}
