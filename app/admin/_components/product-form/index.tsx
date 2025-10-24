"use client"

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/fields'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { categoryEnum, genderOptions, goldPurityOptions, productCategoryOptions, productFormSchema, ProductFormSchema } from './const';
import { Empty, EmptyHeader } from '@/components/ui/empty'
import { Box, Tag } from 'lucide-react'
import { getSubCategoriesApi } from '@/lib/api/category/productCategoriesApis'
import { SubCategory } from './types'
import { FaSpinner } from 'react-icons/fa'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { UploadMediaField } from './upload-media-field'
import { createProductApi, updateProductApi } from '@/lib/api/products/productsApis'
import { useRouter } from 'next/navigation'

type Props = {
  productData?: ProductFormSchema | {},
  addProduct?: boolean
}

const ProductForm = ({
  productData = {},
  addProduct = true,
}: Props) => {

  const router = useRouter()

  const [subCategories, setSubCategories] = useState<{
    isLoading: boolean,
    data: SubCategory[]
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

  const { control } = form

  const onHandleSubmit = async (formData: ProductFormSchema) => {
    try {
      let response = null
      if (addProduct) {
        response = await createProductApi(formData)
        if (response.status === 201) {
          router.replace("/admin/products")
        } else {
          throw new Error("Product not created!")
        }
      } else {
        response = await updateProductApi(formData._id!, formData)
        if (response.status === 200) {
          productData = response.data
          form.reset(response.data)
        } else {
          throw new Error("Product update failed!")
        }
      }
    } catch (e: any) {
      form.setError("root", {message: e?.message || "Invalid form data"})
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
    } else if (values.category === "DIAMOND") {
      form.register("diamond")
      form.unregister("gold")
      form.unregister("silver")
    } else if (values.category === "SILVER") {
      form.register("silver")
      form.unregister("gold")
      form.unregister("diamond")
    }
  }, [values.category])

  return (
    <div className="w-full">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onHandleSubmit, (errors) => {
            console.log("❌ Validation failed:", errors);
          })}
          className="max-w-[600px] w-full space-y-4 gap-4"
        >

          <FieldGroup className='col-start-1 col-span-2'>
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
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

            <>
              {/* Product Information */}
              <Empty className="col-start-1 col-span-2 border border-solid p-5 md:p-5 items-start gap-3">
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
                          value={field.value.toString()}
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value.toString()}
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
                    name="color"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                        <FieldLabel htmlFor="product-form-color" className="text-gray-500">
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
                    name="grossWeight"
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
                          placeholder="Enter Gross weight. eg: 12.1"
                          disabled={disableForm}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                          value={field.value?.toString()}
                          min={0}
                          step="any"
                          className='h-12'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
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
                          <FieldLabel htmlFor="product-form-netWeight" className="text-gray-500">
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
                            step="any"
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
                            placeholder="Enter Metal Weight. eg: 22.2"
                            disabled={disableForm}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                            value={field.value?.toString()}
                            min={0}
                            step="any"
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
                      name="diamond.stoneWeightInCarat"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                          <FieldLabel htmlFor="product-form-stoneWeightInCarat" className="text-gray-500">
                            Stone Weight (in carat)
                          </FieldLabel>
                          <Input
                            {...field}
                            type="number"
                            id="product-form-stoneWeightInCarat"
                            placeholder="Enter Stone weight. eg: 22"
                            disabled={disableForm}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                            value={field.value?.toString()}
                            min={0}
                            step="any"
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
                      name="diamond.stoneWeightInGrams"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                          <FieldLabel htmlFor="product-form-stoneWeightInGrams" className="text-gray-500">
                            Stone Weight (in grams)
                          </FieldLabel>
                          <Input
                            {...field}
                            type="number"
                            id="product-form-stoneWeightInGrams"
                            placeholder="Enter Stone weight. eg: 25.5"
                            disabled={disableForm}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                            value={field.value?.toString()}
                            min={0}
                            step="any"
                            className='h-12'
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
                          <Input
                            {...field}
                            id="product-form-silver-silverPurityGrade"
                            placeholder="Enter Silver Purity Grade"
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
                      name="diamond.clarityGrade"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                          <FieldLabel htmlFor="product-form-diamond-clarityGrade" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                            Clarity Grade
                          </FieldLabel>
                          <Input
                            {...field}
                            id="product-form-diamond-clarityGrade"
                            placeholder="Enter Clarity Grade"
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
                            className='h-12'
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
                    name="size"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                        <FieldLabel htmlFor="product-form-size" className="text-gray-500">
                          Product Size
                        </FieldLabel>
                        <Input
                          {...field}
                          id="product-form-size"
                          placeholder="Enter Size"
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
                    name="basePrice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="col-span-1 gap-1">
                        <FieldLabel htmlFor="product-form-basePrice" className="text-gray-500 after:text-gray-500 after:content-['*'] after:-ml-1">
                          Base Price
                        </FieldLabel>
                        <Input
                          {...field}
                          type="number"
                          id="product-form-basePrice"
                          placeholder="Enter Base Price"
                          disabled={disableForm}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                          value={field.value?.toString()}
                          min={0}
                          step="any"
                          className='h-12'
                        />
                        {fieldState.invalid && (
                          <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="price"
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
                          step="any"
                          className='h-12'
                        />
                        {fieldState.invalid && (
                          <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

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
                          step="any"
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
                    name="additionalCharges"
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
                          step="any"
                          disabled={disableForm}
                          className='h-12'
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
                          ? "gold.hallmarked"
                          : "silver.hallmarked"
                      }
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} orientation="horizontal" className="col-span-2 border rounded-md px-2 py-3">
                          <FieldLabel htmlFor="product-form-hallmarked" className='grow'>
                            Hallmark
                          </FieldLabel>
                          <div className="w-fit">
                            <Switch
                              id="product-form-hallmarked"
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              disabled={disableForm}
                              className='bg-gray-200'
                            />
                          </div>
                          {fieldState.invalid && (
                            <FieldError className='text-left text-red-500' errors={[fieldState.error]} />
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
                          e.preventDefault();
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
                            <div className="flex items-center gap-2">
                              <Input
                                id="product-form-tags"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter tag and press Enter or ✓"
                                disabled={disableForm}
                                className="h-12 flex-1 capitalize"
                              />
                              <button
                                type="button"
                                onClick={addTag}
                                disabled={disableForm}
                                className="border border-gray-300 bg-gray-100 hover:bg-gray-200 rounded px-3 py-2"
                              >
                                ✓
                              </button>
                            </div>

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

              {/* Images & Videos */}
              <Empty className="col-start-1 md:col-start-3 col-span-2 border border-solid p-5 md:p-5 items-start gap-3">
                <EmptyHeader className="flex flex-row items-center justify-start">
                  <Tag className="w-4 h-4" />
                  <span>Images & Videos</span>
                </EmptyHeader>

                <FieldGroup>
                  <UploadMediaField />
                </FieldGroup>
              </Empty>

              <FieldGroup>
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

            </>
          )}
        </form>
      </FormProvider>
    </div >
  )
}

export default ProductForm