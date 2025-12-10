import { Box, ClientOnly, Skeleton, VStack } from "@chakra-ui/react"
import { ColorModeToggle } from "../components/color-mode/ColorModeToggle"

import Footer from "../components/Footer"
import PageContainer from "../components/PageContainer"

export default async function Page() {
    return (
        <VStack minH="100vh" bg={"pageBackground"}>
            <PageContainer />
            <Box flexGrow={1} />
            <Footer />
        </VStack>
    )
}
