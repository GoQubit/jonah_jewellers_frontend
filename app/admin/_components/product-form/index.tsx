"use client"

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/fields'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { categoryEnum, diamondClarityGradeOptions, diamondMetalPurityOptions, genderOptions, goldPurityOptions, productCategoryOptions, productFormSchema, ProductFormSchema, silverPurityOptions } from './const';
import { Empty, EmptyHeader } from '@/components/ui/empty'
import { Box, CheckIcon, ChevronsUpDownIcon, Tag } from 'lucide-react'
import { getSubCategoriesApi } from '@/lib/api/category/productCategoriesApis'
import { Seller, SubCategory } from './types'
import { FaSpinner } from 'react-icons/fa'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { UploadMediaField } from './upload-media-field'
import { createProductApi, getProductTagsApi, updateProductApi } from '@/lib/api/products/productsApis'
import { useRouter } from 'next/navigation'
import { PrimaryImageField } from './primary-image-field'
import { getAllUsersApi } from '@/lib/api/users/users.api'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { debounce } from '@/utils/helpers'
import Toast from '@/components/Toast/Toast'

type Props = {
  productData?: ProductFormSchema | {},
  addProduct?: boolean
  onClose?: Function
  getProducts?: Function
}

const ProductForm = ({
  productData = {},
  addProduct = true,
  onClose = () => { },
  getProducts = () => { }
}: Props) => {

  const router = useRouter()

  const [subCategories, setSubCategories] = useState<{
    isLoading: boolean,
    data: SubCategory[]
  }>({
    isLoading: false,
    data: []
  })

  const [openSeller, setOpenSeller] = useState(false)
  const [searchSeller, setSearchSeller] = useState("")
  const [sellers, setSellers] = useState<{
    isLoading: boolean,
    data: Seller[]
  }>({
    isLoading: false,
    data: []
  })

  const [openTag, setOpenTag] = useState(false)
  const [searchTag, setSearchTag] = useState("")
  const [tags, setTags] = useState<{
    isLoading: boolean,
    data: string[]
  }>({
    isLoading: false,
    data: []
  })

  const form = useForm<ProductFormSchema>({
    mode: "onChange",
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ...productData
    }
  })

  const disableForm = useMemo(() => (
    form.formState.isLoading ||
    form.formState.isSubmitting
  ), [form.formState])

  const getSubCategories = async () => {
    setSubCategories({ isLoading: true, data: [] })
    try {
      const response = await getSubCategoriesApi()
      if (response.status === 200) {
        setSubCategories(s => ({ ...s, data: response.data.results }))
      } else {
        throw new Error("Failed to fetch subcategories")
      }
    } catch (error) {
      setSubCategories(s => ({ ...s, data: [] }))
    } finally {
      setSubCategories(s => ({ ...s, isLoading: false }))
    }
  }

  useEffect(() => {
    getSubCategories()
  }, [])

  const getSellers = async (search: string = searchSeller) => {
    setSellers({ isLoading: true, data: [] })
    try {
      let queryParams: any = {
        role: "SELLER",
      }
      if (search) {
        queryParams["q"] = search
      }
      const response = await getAllUsersApi(queryParams)
      if (response.status === 200) {
        setSellers(s => ({ ...s, data: response.data.results }))
      } else {
        throw new Error("Failed to fetch sellers")
      }
    } catch (error) {
      setSellers(s => ({ ...s, data: [] }))
    } finally {
      setSellers(s => ({ ...s, isLoading: false }))
    }
  }

  useEffect(() => {
    getSellers(searchSeller)
  }, [])

  const getTags = async (search: string = searchTag) => {
    setTags({ isLoading: true, data: [] })
    try {
      let queryParams: any = {
      }
      if (search) {
        queryParams["q"] = search
      }
      const response = await getProductTagsApi(queryParams)
      if (response.status === 200) {
        setTags(s => ({ ...s, data: response.data[0].tags }))
      } else {
        throw new Error("Failed to fetch tags")
      }
    } catch (error) {
      setTags(s => ({ ...s, data: [] }))
    } finally {
      setTags(s => ({ ...s, isLoading: false }))
    }
  }

  useEffect(() => {
    getTags(searchTag)
  }, [])

  const { control } = form

  const onHandleSubmit = async (formData: ProductFormSchema) => {
    try {
      let response = null
      if (addProduct) {
        const { seller, ...rest } = formData
        response = await createProductApi({ ...rest, seller: seller?._id })
        if (response.status === 201) {
          Toast.success("Product created successfully")
          router.replace("/admin/products")
        } else {
          throw new Error("Product not created!")
        }
      } else {
        const { _id, createdAt, updatedAt, seller, ...rest } = formData
        response = await updateProductApi(formData._id!, { ...rest, seller: seller?._id })
        if (response.status === 200) {
          productData = response.data
          form.reset(response.data)
          Toast.success("Product updated successfully")
          getProducts && getProducts()
          onClose && onClose()
        } else {
          throw new Error("Product update failed!")
        }
      }
    } catch (e: any) {
      Toast.success(e.message || "Invalid form data")
      form.setError("root", { message: e?.message || "Invalid form data" })
    }
  }

  const resetForm = () => {
    form.reset(productData)
  }

  const values = useWatch({ control })

  useEffect(() => {
    if (values.category === "GOLD") {
      form.register("gold")
      form.unregister("diamond")
      form.unregister("silver")
      form.setValue("gold.hallmarked", false)
    } else if (values.category === "DIAMOND") {
      form.register("diamond")
      form.unregister("gold")
      form.unregister("silver")
    } else if (values.category === "SILVER") {
      form.register("silver")
      form.unregister("gold")
      form.unregister("diamond")
      form.setValue("silver.hallmarked", false)
    }
  }, [values.category])

  const handleSearchSeller = useCallback(
    debounce((value: string) => {
      getSellers(value)
    }, 500),
    []
  )

  const handleSearchTag = useCallback(
    debounce((value: string) => {
      getTags(value)
    }, 500),
    []
  )

  return (
    <div className="w-full min-w-[500px]">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onHandleSubmit, (errors) => {
            console.log("❌ Validation failed:", errors, values);
          })}
          className="w-full space-y-4"
        >
          <FieldGroup className={cn(
            addProduct
              ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
              : 'max-w-[600px]'
          )}>
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1 col-span-1">
                  <FieldLabel htmlFor="product-form-category" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                    Category
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!addProduct || disableForm}
                  >
                    <SelectTrigger id="product-form-category" className="!h-12">
                      <SelectValue
                        placeholder="Select Category"
                        aria-invalid={fieldState.invalid}
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-white">
                      {productCategoryOptions.map(option => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="w-full pl-8"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {categoryEnum.includes(values?.category!) && (

            <div className={cn(
              "w-full space-y-4",
              addProduct
                ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
                : "max-w-[600px]"
            )}>
              <div className={cn(
                "w-full space-y-4",
                addProduct && "col-start-1 col-span-full lg:col-start-1 lg:col-span-1"
              )}>

                {/* Product Information */}
                <Empty className="border border-solid p-5 md:p-5 items-start gap-3">
                  <EmptyHeader className="flex flex-row items-center justify-start">
                    <Box className="w-4 h-4" />
                    <span>Product Information</span>
                  </EmptyHeader>

                  <FieldGroup>

                    <Controller
                      name="subCategory"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='gap-1'>
                          <FieldLabel htmlFor="product-form-subcategory" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Sub Category
                          </FieldLabel>
                          <Select
                            name={field.name}
                            value={field?.value?.toString()}
                            onValueChange={(value) => field.onChange(parseInt(value))}
                            defaultValue={field?.value?.toString()}
                            disabled={disableForm}
                          >
                            <SelectTrigger id="product-form-subcategory" className='flex items-center justify-between !h-12'>
                              <SelectValue
                                placeholder="Select Sub Category"
                                aria-invalid={fieldState.invalid}
                              />
                              {subCategories?.isLoading && (<FaSpinner className='w-3 h-3 animate-spin' />)}
                            </SelectTrigger>
                            <SelectContent className="w-full bg-white">
                              {subCategories?.data?.map(option => (
                                <SelectItem
                                  key={option.id}
                                  value={option.id}
                                  className="w-full pl-8"
                                >
                                  {option.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="gap-1">
                          <FieldLabel htmlFor="product-form-name" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Product Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="product-form-name"
                            placeholder="Enter product name..."
                            disabled={disableForm}
                            className={cn("h-12", fieldState.invalid && "border-red-300")}
                          />
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="gap-1">
                          <FieldLabel htmlFor="product-form-description" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Description
                          </FieldLabel>
                          <Input
                            {...field}
                            id="product-form-description"
                            placeholder="Enter product description..."
                            disabled={disableForm}
                            className="h-12"
                          />
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                  </FieldGroup>
                </Empty>

                {/* Pricing & Specifications */}
                <Empty className="col-start-1 col-span-2 border border-solid p-5 md:p-5 items-start gap-3">
                  <EmptyHeader className="flex flex-row items-center justify-start">
                    <Tag className="w-4 h-4" />
                    <span>Pricing & Specifications</span>
                  </EmptyHeader>

                  <FieldGroup className='grid grid-cols-2 gap-4'>

                    <Controller
                      name={
                        values.category === "GOLD"
                          ? "gold.color"
                          : (
                            values.category === "DIAMOND"
                              ? "diamond.color"
                              : "silver.color"
                          )
                      }
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                          <FieldLabel htmlFor="product-form-color" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Material Color
                          </FieldLabel>
                          <Input
                            {...field}
                            id="product-form-color"
                            placeholder="Enter Color"
                            disabled={disableForm}
                            className='h-12'
                          />
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name={
                        values.category === "GOLD"
                          ? "gold.grossWeight"
                          : (
                            values.category === "DIAMOND"
                              ? "diamond.grossWeight"
                              : "silver.grossWeight"
                          )
                      }
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                          <FieldLabel htmlFor="product-form-grossWeight" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Gross Weight (in grams)
                          </FieldLabel>
                          <Input
                            {...field}
                            type="number"
                            id="product-form-grossWeight"
                            placeholder="Enter Gross weight. eg: 25.5"
                            disabled={disableForm}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                            value={field.value?.toString()}
                            min={0}
                            onWheel={(e) => e.currentTarget.blur()}
                            step="any"
                            className='h-12 input-number-spin-none'
                          />
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {["GOLD", "SILVER"].includes(values.category!) && (
                      <Controller
                        name={
                          values.category === "GOLD"
                            ? "gold.netWeight"
                            : "silver.netWeight"
                        }
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-netWeight" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Net Weight (in grams)
                            </FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              id="product-form-netWeight"
                              placeholder="Enter net weight. eg: 25.5"
                              disabled={disableForm}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                              value={field.value?.toString()}
                              min={0}
                              onWheel={(e) => e.currentTarget.blur()}
                              step="any"
                              className='h-12 input-number-spin-none'
                            />
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    {["DIAMOND"].includes(values.category!) && (
                      <Controller
                        name="diamond.metalWeight"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-diamond-metalWeight" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Metal Weight (in grams)
                            </FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              id="product-form-diamond-metalWeight"
                              placeholder="Enter Metal Weight. eg: 15.5"
                              disabled={disableForm}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                              value={field.value?.toString()}
                              min={0}
                              onWheel={(e) => e.currentTarget.blur()}
                              step="any"
                              className='h-12 input-number-spin-none'
                            />
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    {["DIAMOND"].includes(values.category!) && (
                      <Controller
                        name="diamond.stoneWeightInGrams"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-stoneWeightInGrams" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Stone Weight (in grams)
                            </FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              id="product-form-stoneWeightInGrams"
                              placeholder="Enter Stone weight. eg: 10"
                              disabled={disableForm}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                              value={field.value?.toString()}
                              min={0}
                              onWheel={(e) => e.currentTarget.blur()}
                              step="any"
                              className='h-12 input-number-spin-none'
                            />
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    {["GOLD"].includes(values.category!) && (
                      <Controller
                        name="gold.goldPurity"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-gold-goldpurity" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Gold Karats
                            </FieldLabel>
                            <Select
                              name={field.name}
                              value={field.value?.toString()}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                              defaultValue={field.value?.toString()}
                              disabled={disableForm}
                            >
                              <SelectTrigger id="product-form-gold-goldpurity" className='flex items-center justify-between !h-12'>
                                <SelectValue
                                  placeholder="Select Karats"
                                  aria-invalid={fieldState.invalid}
                                />
                              </SelectTrigger>
                              <SelectContent className="w-full bg-white">
                                {goldPurityOptions?.map(option => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value.toString()}
                                    className="w-full pl-8"
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}
                    
                    {["SILVER"].includes(values.category!) && (
                      <Controller
                        name="silver.silverPurityGrade"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-silver-silverPurityGrade" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Silver Purity
                            </FieldLabel>
                            <Select
                              name={field.name}
                              value={field.value?.toString()}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                              defaultValue={field.value?.toString()}
                              disabled={disableForm}
                            >
                              <SelectTrigger id="product-form-silver-silverPurityGrade" className='flex items-center justify-between !h-12'>
                                <SelectValue
                                  placeholder="Select Silver Purity Grade"
                                  aria-invalid={fieldState.invalid}
                                />
                              </SelectTrigger>
                              <SelectContent className="w-full bg-white">
                                {silverPurityOptions?.map(option => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value.toString()}
                                    className="w-full pl-8"
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    {["DIAMOND"].includes(values.category!) && (
                      <Controller
                        name="diamond.clarityGrade"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-diamond-clarityGrade" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Clarity Grade
                            </FieldLabel>
                            <Select
                              name={field.name}
                              value={field.value?.toString()}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                              defaultValue={field.value?.toString()}
                              disabled={disableForm}
                            >
                              <SelectTrigger id="product-form-diamond-clarityGrade" className='flex items-center justify-between !h-12'>
                                <SelectValue
                                  placeholder="Select Clarity Grade"
                                  aria-invalid={fieldState.invalid}
                                />
                              </SelectTrigger>
                              <SelectContent className="w-full bg-white">
                                {diamondClarityGradeOptions?.map(option => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value.toString()}
                                    className="w-full pl-8"
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    {["DIAMOND"].includes(values.category!) && (
                      <Controller
                        name="diamond.metalUsed"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-diamond-metalUsed" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Metal Used
                            </FieldLabel>
                            <Input
                              {...field}
                              id="product-form-diamond-metalUsed"
                              placeholder="Enter Metal used"
                              disabled={disableForm}
                              className='h-12'
                            />
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    {["DIAMOND"].includes(values.category!) && (
                      <Controller
                        name="diamond.metalPurity"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-diamond-metalPurity" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Metal Purity
                            </FieldLabel>
                            <Input
                              {...field}
                              id="product-form-diamond-metalPurity"
                              placeholder="Enter Metal Purity eg: 18K"
                              disabled={disableForm}
                              className='h-12'
                            />
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    {["DIAMOND"].includes(values.category!) && (
                      <Controller
                        name="diamond.metalPurity"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-diamond-metalpurity" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Metal Purity
                            </FieldLabel>
                            <Select
                              name={field.name}
                              value={field.value?.toString()}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                              defaultValue={field.value?.toString()}
                              disabled={disableForm}
                            >
                              <SelectTrigger id="product-form-diamond-metalpurity" className='flex items-center justify-between !h-12'>
                                <SelectValue
                                  placeholder="Select Metal Purity"
                                  aria-invalid={fieldState.invalid}
                                />
                              </SelectTrigger>
                              <SelectContent className="w-full bg-white">
                                {diamondMetalPurityOptions?.map(option => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value.toString()}
                                    className="w-full pl-8"
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    {["DIAMOND"].includes(values.category!) && (
                      <Controller
                        name="diamond.noOfDiamonds"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-diamond-noOfDiamonds" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              No of Diamonds
                            </FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              id="product-form-diamond-noOfDiamonds"
                              placeholder="Enter No of diamonds. eg: 3"
                              disabled={disableForm}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                              value={field.value?.toString()}
                              min={0}
                              onWheel={(e) => e.currentTarget.blur()}
                              step="any"
                              className='h-12 input-number-spin-none'
                            />
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    <Controller
                      name="targetGender"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                          <FieldLabel htmlFor="product-form-targetGender" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Gender
                          </FieldLabel>
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={disableForm}
                          >
                            <SelectTrigger id="product-form-targetGender" className='flex items-center justify-between !h-12'>
                              <SelectValue
                                placeholder="Select Gender"
                                aria-invalid={fieldState.invalid}
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full bg-white">
                              {genderOptions?.map(option => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="w-full pl-8"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="stock"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                          <FieldLabel htmlFor="product-form-stock" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Stock
                          </FieldLabel>
                          <Input
                            {...field}
                            type="number"
                            id="product-form-stock"
                            placeholder="Enter product stock"
                            onChange={e => field.onChange(parseInt(e.target.value))}
                            value={field.value?.toString()}
                            min={0}
                            onWheel={(e) => e.currentTarget.blur()}
                            step="any"
                            className='h-12 input-number-spin-none'
                          />
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {["DIAMOND"].includes(values.category!) && (
                      <Controller
                        name="diamond.price"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                            <FieldLabel htmlFor="product-form-price" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                              Price
                            </FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              id="product-form-price"
                              placeholder="Enter Price"
                              disabled={disableForm}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                              value={field.value?.toString()}
                              min={0}
                              onWheel={(e) => e.currentTarget.blur()}
                              step="any"
                              className='h-12 input-number-spin-none'
                            />
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    <Controller
                      name="makingCharges"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                          <FieldLabel htmlFor="product-form-makingCharges" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Making Charges
                          </FieldLabel>
                          <Input
                            {...field}
                            type="number"
                            id="product-form-makingCharges"
                            placeholder="Enter Making Charges"
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                            value={field.value?.toString()}
                            min={0}
                            onWheel={(e) => e.currentTarget.blur()}
                            step="any"
                            className='h-12 input-number-spin-none'
                          />
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name={
                        values.category === "GOLD"
                          ? "gold.additionalCharges"
                          : (
                            values.category === "DIAMOND"
                              ? "diamond.additionalCharges"
                              : "silver.additionalCharges"
                          )
                      }
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                          <FieldLabel htmlFor="product-form-additionalCharges" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Additional Charges
                          </FieldLabel>
                          <Input
                            {...field}
                            type="number"
                            id="product-form-additionalCharges"
                            placeholder="Enter Additional Charges"
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                            value={field.value?.toString()}
                            min={0}
                            onWheel={(e) => e.currentTarget.blur()}
                            step="any"
                            className='h-12 input-number-spin-none'
                          />
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="seller"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-2 w-full flex flex-col gap-1">
                          <FieldLabel htmlFor="product-form-seller" className="text-gray-500">
                            Seller
                          </FieldLabel>
                          <Popover open={openSeller} onOpenChange={setOpenSeller}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openSeller}
                                disabled={disableForm}
                                className="h-12 hover:bg-transparent justify-between"
                              >
                                {field.value
                                  ? `${field.value?.firstName} ${field.value?.lastName} (${field.value?.email})`
                                  : "Select or search seller..."}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="!w-full p-0 bg-white">
                              <Command className="rounded-md shadow-md !w-full">
                                <CommandInput
                                  placeholder="Search seller..."
                                  value={searchSeller}
                                  onValueChange={(search: string) => {
                                    setSearchSeller(search)
                                    handleSearchSeller(search)
                                  }}
                                  className='focus:outline-none focus:border-0 focus:ring-0 h-12'
                                />
                                <CommandList>
                                  <CommandEmpty>{sellers.isLoading ? "Loading..." : "No seller found."}</CommandEmpty>
                                  <CommandGroup>
                                    {sellers.isLoading && (
                                      <div className="flex items-center justify-center p-4">
                                        <FaSpinner className='w-5 h-5 animate-spin' />
                                      </div>
                                    )}
                                    {sellers?.data?.map((seller) => (
                                      <CommandItem
                                        key={seller.id}
                                        value={seller.id}
                                        onSelect={(currentValue) => {
                                          const { id, ...rest } = seller
                                          field.onChange({ _id: parseInt(id), ...rest })
                                          setOpenSeller(false)
                                        }}
                                        className='data-[selected=true]:bg-transparent'
                                      >
                                        <CheckIcon
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value?._id?.toString() === seller.id ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {seller.firstName} {seller.lastName} ({seller.email})
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          {(fieldState.invalid || form.formState.errors.seller?._id) && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error, form.formState.errors.seller?._id]} />
                          )}
                        </Field>
                      )}
                    />

                    {["GOLD", "SILVER"].includes(values.category!) && (
                      <Controller
                        name={
                          values.category === "GOLD"
                            ? "gold.hallmarked"
                            : "silver.hallmarked"
                        }
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid} orientation="horizontal" className="col-span-2 w-full flex flex-col gap-1">
                            <div className="w-full border rounded-md px-2 py-3 flex items-center justify-between">
                              <FieldLabel htmlFor="product-form-hallmarked" className='grow'>
                                Hallmark
                              </FieldLabel>
                              <div className="w-fit">
                                <Switch
                                  id="product-form-hallmarked"
                                  checked={!!field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={disableForm}
                                  className='data-[state=unchecked]:bg-gray-300 [&>span[data-state=unchecked]]:bg-gray-400 [&>span[data-state=checked]]:bg-gray-400'
                                />
                              </div>
                            </div>
                            {fieldState.invalid && (
                              <FieldError className='w-full text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    )}

                    <Controller
                      name="tags"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const [inputValue, setInputValue] = useState("");

                        const addTag = () => {
                          const trimmed = inputValue.trim();
                          if (trimmed && !(field?.value || []).includes(trimmed)) {
                            field.onChange([...(field?.value || []), trimmed]);
                            setInputValue("");
                          }
                        };

                        const removeTag = (tag: string) => {
                          field.onChange(field.value.filter((t: string) => t !== tag));
                        };

                        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter") {
                            e.currentTarget.blur();
                            addTag();
                          }
                        };

                        return (
                          <Field data-invalid={fieldState.invalid} className="col-span-2 gap-1">
                            <FieldLabel
                              htmlFor="product-form-tags"
                              className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1"
                            >
                              Occasion Tags
                            </FieldLabel>

                            <div className="flex flex-col gap-2">

                              <Popover open={openTag} onOpenChange={setOpenTag}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openTag}
                                    disabled={disableForm}
                                    className="h-12 hover:bg-transparent justify-between"
                                  >
                                    {"Select or search tags..."}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="!w-full p-0 bg-white">
                                  <Command className="rounded-md shadow-md !w-full">
                                    <CommandInput
                                      placeholder="Search tag..."
                                      value={searchTag}
                                      onValueChange={(search: string) => {
                                        setSearchTag(search)
                                        handleSearchTag(search)
                                      }}
                                      className='focus:outline-none focus:border-0 focus:ring-0 h-12'
                                    />
                                    <CommandList>
                                      <CommandEmpty>{tags.isLoading ? "Loading..." : "No tag found."}</CommandEmpty>
                                      <CommandGroup>
                                        {tags.isLoading && (
                                          <div className="flex items-center justify-center p-4">
                                            <FaSpinner className='w-5 h-5 animate-spin' />
                                          </div>
                                        )}
                                        {tags?.data?.map((tag) => (
                                          <CommandItem
                                            key={tag}
                                            value={tag}
                                            onSelect={(currentValue) => {
                                              if (field.value?.includes(tag)) return;
                                              field.onChange([...(field?.value || []), tag]);
                                              setOpenTag(false)
                                            }}
                                            className='data-[selected=true]:bg-transparent capitalize'
                                          >
                                            <CheckIcon
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                field.value?.includes(tag) ? "opacity-100" : "opacity-0"
                                              )}
                                            />
                                            {tag}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>

                              <div className="flex flex-wrap gap-2">
                                {field?.value?.map((tag: string, i: number) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm capitalize"
                                  >
                                    <span>{tag}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeTag(tag)}
                                      disabled={disableForm}
                                      className="text-gray-500 hover:text-red-600"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {fieldState.invalid && (
                              <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                            )}
                          </Field>
                        );
                      }}
                    />

                  </FieldGroup>
                </Empty>

              </div>

              <div className={cn(
                "w-full space-y-4",
                addProduct && "col-start-1 col-span-full lg:col-start-2 lg:col-span-1"
              )}>

                {/* Thumbnail Image */}
                <Empty className="border border-solid p-5 md:p-5 items-start gap-3">
                  <EmptyHeader className="flex flex-row items-center justify-start">
                    <Tag className="w-4 h-4" />
                    <span>Thumbnail Image</span>
                  </EmptyHeader>

                  <FieldGroup>
                    <PrimaryImageField />
                  </FieldGroup>
                </Empty>

                {/* Images & Videos */}
                <Empty className="border border-solid p-5 md:p-5 items-start gap-3">
                  <EmptyHeader className="flex flex-row items-center justify-start">
                    <Tag className="w-4 h-4" />
                    <span>Images & Videos</span>
                  </EmptyHeader>

                  <FieldGroup>
                    <UploadMediaField />
                  </FieldGroup>
                </Empty>

              </div>

              <FieldGroup className="col-start-1 col-span-full">
                {form.formState.errors?.root && (
                  <span className='text-left text-red-500'>
                    {form.formState.errors?.root?.message}
                  </span>
                )}
                <Field orientation="horizontal">
                  <Button
                    type="submit"
                    disabled={!form.formState.isDirty || disableForm}
                  >
                    {disableForm ? "Submitting..." : "Submit"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-transparent"
                    onClick={resetForm}
                    disabled={!form.formState.isDirty || disableForm}
                  >
                    Reset
                  </Button>
                </Field>
              </FieldGroup>

            </div>
          )}
        </form>
      </FormProvider>
    </div >
  )
}

export default ProductForm