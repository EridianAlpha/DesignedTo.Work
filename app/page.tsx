import { Box, ClientOnly, Skeleton, VStack } from "@chakra-ui/react"
import { ColorModeToggle } from "../components/color-mode/ColorModeToggle"

import Footer from "../components/Footer"
import RotatingText from "../components/designs/RotatingText"

export default async function Page() {
    return (
        <VStack minH="100vh" bg={"pageBackground"}>
            <Box pos="absolute" top="4" right="4">
                <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
                    <ColorModeToggle />
                </ClientOnly>
            </Box>
            <VStack gap="8" justifyContent={"center"} alignItems={"center"} flexGrow={1} bg={"green"} w={"100%"} h={"100%"}>
                {/* <RotatingText /> */}
            </VStack>
            <Box flexGrow={1} />
            <Footer />
        </VStack>
    )
}
