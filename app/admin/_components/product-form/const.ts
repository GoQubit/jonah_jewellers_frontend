import z from "zod";
import { DiamondClarityGradeOptions, DiamondMetalPurityOptions, GenderOptions, GoldPurityOptions, ProductCategoryOptions, SilverPurityOptions } from "./types";

export const genderEnum = ["MALE", "FEMALE", "UNISEX"] as const
export const categoryEnum = ['GOLD', 'DIAMOND', 'SILVER'] as const


const goldSchema = z.object({
    color: z.string("Gold color is required.").trim()
        .nonempty({ message: "Please enter the gold color." }),
    grossWeight: z.number("Please enter the gold gross weight.").min(0),
    netWeight: z.number("Please enter the gold net weight").min(0),
    goldPurity: z.number("Please select the gold purity").min(0),
    hallmarked: z.boolean("Please specify if the gold item is hallmarked")
});

const diamondSchema = z.object({
    color: z.string("Diamond color is required.").trim()
        .nonempty({ message: "Please enter the diamond color." }),
    grossWeight: z.number("Please enter the diamond gross weight.").min(0),
    metalWeight: z.number("Please enter the diamond metal weight.").min(0),
    stoneWeightInGrams: z.number("Please enter the stone weight in gram.").min(0),
    clarityGrade: z.string("Clarity grade is required").trim()
        .nonempty({ message: "Please enter the diamond clarity grade." }),
    metalUsed: z.string("Metal used is required").trim()
        .nonempty({ message: "Please enter the metal used." }),
    metalPurity: z.number("Please select the metal purity").min(0),
    noOfDiamonds: z.number("Please enter the not of diamonds.").min(0),
    price: z.number("Please enter the price of diamond").min(0)
});

const silverSchema = z.object({
    color: z.string("Silver color is required.").trim()
        .nonempty({ message: "Please enter the silver color." }),
    grossWeight: z.number("Please enter the silver gross weight.").min(0),
    netWeight: z.number("Please enter the silver net weight").min(0),
    silverPurityGrade: z.string("Please select silver purity").trim().nonempty({ message: "Please select the silver purity" }),
    hallmarked: z.boolean("Please specify if the silver item is hallmarked")
});

const baseProductSchema = z.object({
    _id: z.string().optional(),
    name: z.string("Name is required").trim()
        .min(5, "Product name must be at least 5 characters.")
        .max(100, "Product name must be at most 32 characters.")
        .nonempty({message: "Please enter the product name."}),
    description: z.string("Description is required.")
        .min(10, "Product description must be at least 10 characters.")
        .max(200, "Product description must be at most 200 characters.")
        .nonempty({message: "Please enter the product description."}),
    targetGender: z.enum(genderEnum, {message: "Please select a gender type"}),
    category: z.enum(categoryEnum, {message: "Please select a product category"}),
    subCategory: z.number("Please select a subcategory"),
    makingCharges: z.number("Please enter making charges.").min(0),
    additionalCharges: z.number("Please enter the additionalCharges").min(0),
    stock: z.number("Please enter any stock number.").min(0),
    isSellerFunded:z.boolean(),
    seller: z.object({
        _id: z.number("Seller _id is required.").min(1, "Seller _id must be a positive number."),
        firstName: z.string("Seller first name is required.").trim(),
        lastName: z.string("Seller last name is required.").trim(),
        email: z.string("Seller email is required.").trim().email("Invalid email address."),
    }, "Search or select seller").optional(),
    primaryImage: z.string("Primary image is required.").trim()
        .url("Invalid image/video URL.")
        .nonempty("Please upload primary image"),
    images: z.array(
        z.string().trim().url("Invalid image URL."), "Please upload at least one image."
    ).nonempty("Please upload at least one image"),
    videos: z.array(
        z.string().trim().url("Invalid video URL.")
    ).optional(),
    tags: z.array(
        z.string().trim().nonempty({ message: "Tag cannot be empty." }), "Please add at least one tag."
    ).nonempty({ message: "Please add at least one tag" }),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),

    // archive: z.boolean().optional(),
    // isSellerFunded: z.boolean().optional(),
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
        value: 20,
        label: "20"
    },
    {
        value: 22,
        label: "22"
    },
    {
        value: 24,
        label: "24"
    },
]

export const diamondMetalPurityOptions: DiamondMetalPurityOptions[] = [
    {
        value: 14,
        label: "14"
    },
    {
        value: 16,
        label: "16"
    },
    {
        value: 18,
        label: "18"
    }
]

export const silverPurityOptions: SilverPurityOptions[] = [
    {
        value: "999",
        label: "999"
    },
    {
        value: "925",
        label: "925"
    }
]

export const diamondClarityGradeOptions: DiamondClarityGradeOptions[] = [
    { value: "FL", label: "FL" },
    { value: "IF", label: "IF" },
    { value: "VVS1", label: "VVS1" },
    { value: "VVS2", label: "VVS2" },
    { value: "VS1", label: "VS1" },
    { value: "VS2", label: "VS2" },
    { value: "SI1", label: "SI1" },
    { value: "SI2", label: "SI2" },
    { value: "I1", label: "I1" },
    { value: "I2", label: "I2" },
    { value: "I3", label: "I3" },
];