"use client"

import { Box, VStack } from "@chakra-ui/react"
import DesignContainer from "./DesignContainer"
import RotatingText from "./designs/rotating-text/RotatingText"
import { designsBySlug } from "./designs"

export default function PageContainer() {
    return (
        <VStack gap="50px" justifyContent={"center"} alignItems={"center"} pt={20}>
            <RotatingText />
            <Box h={"0px"} />
            {Object.values(designsBySlug)
                .filter((designEntry) => designEntry.config.slug !== "template")
                .map((designEntry) => (
                    <DesignContainer key={designEntry.config.slug} design={designEntry} />
                ))}
            <Box h={"20px"} />
        </VStack>
    )
}
