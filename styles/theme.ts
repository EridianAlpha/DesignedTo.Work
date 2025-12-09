import { createSystem, defaultConfig } from "@chakra-ui/react"

export const customConfig = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                blue: { value: "#028DB4" },
                red: { value: "red" },
                yellow: { value: "yellow" },
            },
        },
        semanticTokens: {
            colors: {
                pageBackground: {
                    value: { _light: "white", _dark: "#060010" },
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
