import z from "zod";
import { GenderOptions, GoldPurityOptions, ProductCategoryOptions } from "./types";

export const genderEnum = ["MALE", "FEMALE", "UNISEX"] as const
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
    price: z.number(),
});

const silverSchema = z.object({
    color: z.string(),
    grossWeight: z.number(),
    netWeight: z.number(),
    silverPurityGrade: z.string(),
    hallmarked: z.boolean(),
});

const baseProductSchema = z.object({
    _id: z.string().optional(),
    name: z.string()
        .min(5, "Product name must be at least 5 characters.")
        .max(100, "Product name must be at most 32 characters."),
    description: z.string()
        .min(10, "Product description must be at least 10 characters.")
        .max(200, "Product description must be at most 200 characters."),
    targetGender: z.enum(genderEnum),
    category: z.enum(categoryEnum),
    subCategory: z.number(),
    basePrice: z.number(),
    makingCharges: z.number(),
    stock: z.number(),
    images: z.array(z.string().url()),
    videos: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),

    // archive: z.boolean().optional(),
    // isSellerFunded: z.boolean().optional(),
    // seller: z.number(),
})

export const productFormSchema = z.discriminatedUnion("category", [
    baseProductSchema.extend({
        category: z.literal("GOLD"),
        gold: goldSchema,
    }),
    baseProductSchema.extend({
        category: z.literal("DIAMOND"),
        diamond: diamondSchema,
    }),
    baseProductSchema.extend({
        category: z.literal("SILVER"),
        silver: silverSchema,
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
        value: "UNISEX",
        label: "Unisex",
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