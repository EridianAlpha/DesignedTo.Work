import type { DesignComponent, DesignConfig } from "../../interfaces/types"
import type React from "react"

import GsapListHover from "./gsap-list-hover/GsapListHover"
import { gsapListHoverConfig } from "./gsap-list-hover/config"
import SparkleButton from "./sparkle-button/SparkleButton"
import { sparkleButtonConfig } from "./sparkle-button/config"
import DragLockDirection from "./drag-lock-direction/DragLockDirection"
import { dragLockDirectionConfig } from "./drag-lock-direction/config"
import RotatingText from "./rotating-text/RotatingText"
import { rotatingTextConfig } from "./rotating-text/config"

export interface DesignEntry {
    component: React.ComponentType
    config: DesignConfig
}

// Configs are imported from separate config.ts files (not client components)
const designEntries: DesignEntry[] = [
    {
        component: GsapListHover,
        config: gsapListHoverConfig,
    },
    {
        component: SparkleButton,
        config: sparkleButtonConfig,
    },
    {
        component: DragLockDirection,
        config: dragLockDirectionConfig,
    },
    {
        component: RotatingText,
        config: rotatingTextConfig,
    },
]

export const designs: DesignComponent[] = designEntries.map((entry) => {
    const Component = entry.component
    ;(Component as any).designConfig = entry.config
    return Component as DesignComponent
})

export const designsBySlug: Record<string, DesignEntry> = Object.fromEntries(designEntries.map((entry) => [entry.config.slug, entry]))

export function getDesignBySlug(slug: string): DesignEntry | undefined {
    return designsBySlug[slug]
}

export function getDesignConfig(component: React.ComponentType): DesignConfig | undefined {
    const entry = designEntries.find((entry) => entry.component === component)
    return entry?.config
}
