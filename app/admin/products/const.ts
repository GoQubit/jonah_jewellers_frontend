import { ProductListFilters, ProductStatusOptions } from "./types";


export const productListFilters: ProductListFilters = {
    search: '',
    status: '',
    startDate: undefined,
    endDate: undefined,
    archive: false
}

export const productStatusOptions: ProductStatusOptions[] = [
    {
        value: "active",
        label: "Active",
        light_color: "#f0fdf4",
        dark_color: "#22c55e",
    },
    {
        value: "out_of_stock",
        label: "Out Of Stock",
        light_color: "#f9fafb",
        dark_color: "#64748b",
    }
]

export const productListData = [
    {
        id: "PRD-2025-001",
        category: "Diamond",
        subCategory: "Ring",
        amount: 85000,
        material: "Gold (22K)",
        weight: "5.2g",
        stock: 15,
        status: "active"
    },
    {
        id: "PRD-2024-002",
        category: "Gold",
        subCategory: "Necklace",
        amount: 65000,
        material: "Gold (18K)",
        weight: "25.8g",
        stock: 0,
        status: "out_of_stock"
    },
    {
        id: "PRD-2024-003",
        category: "Silver",
        subCategory: "Earring",
        amount: 15000,
        material: "Silver (925)",
        weight: "10.5g",
        stock: 8,
        status: "active"
    },
    {
        id: "PRD-2024-004",
        category: "Diamond",
        subCategory: "Pendant",
        amount: 95000,
        material: "Gold (22K)",
        weight: "7.1g",
        stock: 3,
        status: "active"
    },
    {
        id: "PRD-2024-005",
        category: "Gold",
        subCategory: "Ring",
        amount: 32000,
        material: "Gold (18K)",
        weight: "4.8g",
        stock: 0,
        status: "out_of_stock"
    },
    {
        id: "PRD-2024-006",
        category: "Silver",
        subCategory: "Bracelet",
        amount: 12000,
        material: "Silver (925)",
        weight: "15.2g",
        stock: 12,
        status: "active"
    },
    {
        id: "PRD-2024-007",
        category: "Diamond",
        subCategory: "Earring",
        amount: 78000,
        material: "Gold (22K)",
        weight: "6.3g",
        stock: 7,
        status: "active"
    },
    {
        id: "PRD-2024-008",
        category: "Gold",
        subCategory: "Pendant",
        amount: 41000,
        material: "Gold (18K)",
        weight: "5.9g",
        stock: 0,
        status: "out_of_stock"
    },
    {
        id: "PRD-2024-009",
        category: "Silver",
        subCategory: "Ring",
        amount: 9000,
        material: "Silver (925)",
        weight: "3.2g",
        stock: 20,
        status: "active"
    },
    {
        id: "PRD-2024-010",
        category: "Diamond",
        subCategory: "Bracelet",
        amount: 105000,
        material: "Gold (22K)",
        weight: "8.7g",
        stock: 2,
        status: "active"
    },
    {
        id: "PRD-2024-011",
        category: "Gold",
        subCategory: "Earring",
        amount: 27000,
        material: "Gold (18K)",
        weight: "2.9g",
        stock: 0,
        status: "out_of_stock"
    },
    {
        id: "PRD-2024-012",
        category: "Silver",
        subCategory: "Pendant",
        amount: 11000,
        material: "Silver (925)",
        weight: "6.8g",
        stock: 14,
        status: "active"
    },
    {
        id: "PRD-2024-013",
        category: "Diamond",
        subCategory: "Necklace",
        amount: 120000,
        material: "Gold (22K)",
        weight: "18.4g",
        stock: 1,
        status: "active"
    },
    {
        id: "PRD-2024-014",
        category: "Gold",
        subCategory: "Bracelet",
        amount: 35000,
        material: "Gold (18K)",
        weight: "7.5g",
        stock: 0,
        status: "out_of_stock"
    },
    {
        id: "PRD-2024-015",
        category: "Silver",
        subCategory: "Necklace",
        amount: 17000,
        material: "Silver (925)",
        weight: "20.1g",
        stock: 9,
        status: "active"
    },
    {
        id: "PRD-2024-016",
        category: "Diamond",
        subCategory: "Ring",
        amount: 88000,
        material: "Gold (22K)",
        weight: "5.6g",
        stock: 6,
        status: "active"
    },
    {
        id: "PRD-2024-017",
        category: "Gold",
        subCategory: "Pendant",
        amount: 39000,
        material: "Gold (18K)",
        weight: "6.2g",
        stock: 0,
        status: "out_of_stock"
    },
    {
        id: "PRD-2024-018",
        category: "Silver",
        subCategory: "Earring",
        amount: 13000,
        material: "Silver (925)",
        weight: "4.7g",
        stock: 11,
        status: "active"
    },
    {
        id: "PRD-2024-019",
        category: "Diamond",
        subCategory: "Bracelet",
        amount: 99000,
        material: "Gold (22K)",
        weight: "9.3g",
        stock: 4,
        status: "active"
    },
    {
        id: "PRD-2024-020",
        category: "Gold",
        subCategory: "Ring",
        amount: 31000,
        material: "Gold (18K)",
        weight: "4.1g",
        stock: 0,
        status: "out_of_stock"
    }
]