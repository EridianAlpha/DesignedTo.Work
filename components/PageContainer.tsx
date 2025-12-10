"use client"

import { VStack } from "@chakra-ui/react"
import DesignContainer from "./DesignContainer"
import RotatingText from "./designs/rotating-text/RotatingText"
import RotatingTextOld from "./designs/rotating-text/RotatingTextOLD"

export default function PageContainer() {
    return (
        <VStack gap="8" justifyContent={"center"} alignItems={"center"} pt={20}>
            <RotatingText />
            {/* <DesignContainer> */}
            {/* <RotatingText /> */}
            {/* </DesignContainer> */}
        </VStack>
    )
}
