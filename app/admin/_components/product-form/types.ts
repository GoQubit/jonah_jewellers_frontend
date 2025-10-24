export type GenderEnum = "" | "MALE" | "FEMALE" | "UNISEX"

export type ProductCategoryEnum = "" | "GOLD" | "DIAMOND" | "SILVER"

export type GoldPurityEnum = 18 | 19 | 20 | 21 | 22 | 23 | 24

export type GenderOptions = {
    value: GenderEnum,
    label: string,
    light_color?: string,
    dark_color?: string,
    icon?: React.ComponentType<any> | undefined,
}

export type ProductCategoryOptions = {
    value: ProductCategoryEnum,
    label: string,
    light_color?: string,
    dark_color?: string,
    icon?: React.ComponentType<any> | undefined,
}

export type GoldPurityOptions = {
    value: GoldPurityEnum,
    label: string,
    light_color?: string,
    dark_color?: string,
    icon?: React.ComponentType<any> | undefined,
}

export type SubCategory = {
    id: string,
    name: string,
    description: string,
    archive: boolean,
    photo: string,
}