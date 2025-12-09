import { createSystem, defaultConfig } from "@chakra-ui/react"

export const customConfig = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                blue: { value: "blue" },
                red: { value: "red" },
                yellow: { value: "yellow" },
            },
        },
        semanticTokens: {
            colors: {
                pageBackground: {
                    value: { _light: "white", _dark: "black" },
                },
            },
        },
    },
    globalCss: {
        "html, body": {
            backgroundColor: "{colors.pageBackground}",
        },
    },
})
