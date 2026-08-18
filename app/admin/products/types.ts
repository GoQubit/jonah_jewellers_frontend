export type ProductStatus = '' | 'active' | 'out_of_stock'

export type ProductListFilters = {
    search: string,
    status: ProductStatus,
    startDate: undefined | Date,
    endDate: undefined | Date,
    archive: boolean
}

export type ProductStatusOptions = {
    value: ProductStatus,
    label: string,
    light_color: string,
    dark_color: string,
    icon?: React.ComponentType<any> | undefined,
}