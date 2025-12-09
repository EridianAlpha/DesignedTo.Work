import { Box, Checkbox, ClientOnly, HStack, Heading, Progress, RadioGroup, Skeleton, VStack } from "@chakra-ui/react"
import Image from "next/image"
import { ColorModeToggle } from "../components/color-mode/ColorModeToggle"

import Footer from "../components/Footer"
import RotatingText from "../components/RotatingText"

export default async function Page() {
    return (
        <VStack minH="100vh" bg={"pageBackground"}>
            <Box pos="absolute" top="4" right="4">
                <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
                    <ColorModeToggle />
                </ClientOnly>
            </Box>
            <VStack gap="8" justifyContent={"center"} alignItems={"center"} flexGrow={1}>
                <RotatingText />
            </VStack>
            <Box flexGrow={1} />
            <Footer />
        </VStack>
    )
}
