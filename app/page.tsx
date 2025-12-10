import { Box, VStack } from "@chakra-ui/react"

import Footer from "../components/Footer"
import PageContainer from "../components/PageContainer"

export default async function Page() {
    return (
        <VStack minH="100dvh" bg={"pageBackground"}>
            <PageContainer />
            <Box flexGrow={1} />
            <Footer />
        </VStack>
    )
}
