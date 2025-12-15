// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface DesignConfig {
    slug: string
    title: string
    sourceLink?: string
    designNotesLink?: string
    theme?: "dark" | "light"
}

export type DesignComponent = ((props: any) => any) & {
    designConfig: DesignConfig
}
