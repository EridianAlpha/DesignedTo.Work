import { Box, VStack } from "@chakra-ui/react"
import { notFound } from "next/navigation"

import DesignContainer from "../../../components/DesignContainer"
import { getDesignBySlug } from "../../../components/designs"

export default async function DesignPage({ params }: { params: Promise<{ design: string }> }) {
    const { design } = await params
    const designEntry = getDesignBySlug(design)

    if (!designEntry) {
        notFound()
    }

    return (
        <VStack minH="100dvh" bg={"pageBackground"}>
            <Box pt={20}>
                <DesignContainer design={designEntry} />
            </Box>
            <Box flexGrow={1} />
        </VStack>
    )
}
