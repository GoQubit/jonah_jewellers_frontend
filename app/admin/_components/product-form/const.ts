import z from "zod";
import { GenderOptions, GoldPurityOptions, ProductCategoryOptions } from "./types";

export const genderEnum = ["MALE", "FEMALE", "OTHER"] as const
export const categoryEnum = ['GOLD', 'DIAMOND', 'SILVER'] as const


const goldSchema = z.object({
    color: z.string(),
    grossWeight: z.number(),
    netWeight: z.number(),
    goldPurity: z.number(),
    hallmarked: z.boolean(),
});

const diamondSchema = z.object({
    color: z.string(),
    grossWeight: z.number(),
    metalWeight: z.number(),
    stoneWeightInCarat: z.number(),
    stoneWeightInGrams: z.number(),
    clarityGrade: z.string(),
    metalUsed: z.string(),
    metalPurity: z.string(),
    noOfDiamonds: z.number(),
});

const silverSchema = z.object({
    color: z.string(),
    grossWeight: z.number(),
    netWeight: z.number(),
    silverPurityGrade: z.string(),
    hallmarked: z.boolean(),
});

const baseProductSchema = z.object({
    _id: z.string().nullable().optional(),
    name: z.string()
        .min(5, "Product name must be at least 5 characters.")
        .max(100, "Product name must be at most 32 characters."),
    description: z.string()
        .min(10, "Product description must be at least 10 characters.")
        .max(200, "Product description must be at most 200 characters."),
    targetGender: z.enum(genderEnum),
    category: z.enum(categoryEnum),
    subCategory: z.string(),
    stock: z.number(),
    size: z.string(),
    basePrice: z.number(),
    price: z.number(),
    makingCharges: z.number(),
    additionalCharges: z.number(),
    tags: z.array(z.string()),
    archive: z.boolean().optional(),
    // images: z.array(z.string().url()),
    // videos: z.array(z.string()),
    isSellerFunded: z.boolean().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
})

export const productFormSchema = z.discriminatedUnion("category", [
    baseProductSchema.extend({
        category: z.literal("GOLD"),
        gold: goldSchema,
        diamond: z.undefined(),
        silver: z.undefined(),
    }),
    baseProductSchema.extend({
        category: z.literal("DIAMOND"),
        diamond: diamondSchema,
        gold: z.undefined(),
        silver: z.undefined(),
    }),
    baseProductSchema.extend({
        category: z.literal("SILVER"),
        silver: silverSchema,
        gold: z.undefined(),
        diamond: z.undefined(),
    }),
]);

export type ProductFormSchema = z.infer<typeof productFormSchema>

export const genderOptions: GenderOptions[] = [
    {
        value: "MALE",
        label: "Male",
    },
    {
        value: "FEMALE",
        label: "Female",
    },
    {
        value: "OTHER",
        label: "Other",
    }
]

export const productCategoryOptions: ProductCategoryOptions[] = [
    {
        value: "GOLD",
        label: "Gold",
    },
    {
        value: "DIAMOND",
        label: "Diamond",
    },
    {
        value: "SILVER",
        label: "Silver",
    }
]

export const goldPurityOptions: GoldPurityOptions[] = [
    {
        value: 18,
        label: "18"
    },
    {
        value: 19,
        label: "19"
    },
    {
        value: 20,
        label: "20"
    },
    {
        value: 21,
        label: "21"
    },
    {
        value: 22,
        label: "22"
    },
    {
        value: 23,
        label: "23"
    },
    {
        value: 24,
        label: "24"
    },
]

export const defaultProductFormData: {
    goldData: ProductFormSchema,
    diamondData: ProductFormSchema,
    silverData: ProductFormSchema
} = {
    goldData: {
        "_id": "JONAH-2025-001",
        "name": "Classic Gold Ring",
        "description": "22k plain gold ring for men",
        "targetGender": "MALE",
        "category": "GOLD",
        "subCategory": "1",
        "makingCharges": 1200,
        "stock": 10,
        // "images": ["https://example.com/images/gold-ring.jpg"],
        // "videos": ["https://example.com/videos/gold-ring.mp4"],
        "isSellerFunded": false,
        "tags": ["ring", "gold", "22k"],
        "archive": false,
        "createdAt": "2025-10-19T10:00:00.000Z",
        "updatedAt": "2025-10-19T10:00:00.000Z",
        "basePrice": 4500,
        "price": 56000,
        "additionalCharges": 500,
        "size": "Medium",
        "gold": {
            "color": "Yellow",
            "grossWeight": 10.5,
            "netWeight": 9.8,
            "goldPurity": 22,
            "hallmarked": true
        },
        silver: undefined,
        diamond: undefined,
    },
    diamondData: {
        "_id": "JONAH-2025-002",
        "name": "Elegant Diamond Necklace",
        "description": "Beautiful necklace with natural diamonds and 18k gold base",
        "targetGender": "FEMALE",
        "category": "DIAMOND",
        "subCategory": "2",
        "makingCharges": 2500,
        "stock": 5,
        // "images": ["https://example.com/images/diamond-necklace.jpg"],
        // "videos": [],
        "isSellerFunded": true,
        "tags": ["diamond", "necklace", "luxury"],
        "archive": false,
        "createdAt": "2025-10-19T10:00:00.000Z",
        "updatedAt": "2025-10-19T10:00:00.000Z",
        "basePrice": 4500,
        "price": 275000,
        "additionalCharges": 2000,
        "size": "Medium",
        "diamond": {
            "color": "E",
            "grossWeight": 16.2,
            "metalWeight": 15.5,
            "stoneWeightInCarat": 3.2,
            "stoneWeightInGrams": 0.64,
            "clarityGrade": "VS1",
            "noOfDiamonds": 45,
            "metalUsed": "Gold",
            "metalPurity": "18K",
        },
        gold: undefined,
        silver: undefined,
    },
    silverData: {
        "_id": "JONAH-2025-003",
        "name": "Sterling Silver Bracelet",
        "description": "Polished silver bracelet with minimalist design",
        "targetGender": "OTHER",
        "category": "SILVER",
        "subCategory": "3",
        "makingCharges": 800,
        "stock": 25,
        // "images": ["https://example.com/images/silver-bracelet.jpg"],
        // "videos": [],
        "isSellerFunded": false,
        "tags": ["silver", "bracelet"],
        "archive": false,
        "createdAt": "2025-10-19T10:00:00.000Z",
        "updatedAt": "2025-10-19T10:00:00.000Z",
        "basePrice": 4500,
        "price": 4500,
        "additionalCharges": 100,
        "size": "Medium",
        "silver": {
            "color": "White",
            "grossWeight": 25.2,
            "netWeight": 24.8,
            "silverPurityGrade": "925",
            "hallmarked": false
        },
        gold: undefined,
        diamond: undefined,
    }
}