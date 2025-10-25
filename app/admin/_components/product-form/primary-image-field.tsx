"use client"

import { FieldError } from "@/components/ui/fields";
import { X, UploadCloud } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { fileUploaderApi } from "@/lib/api/uploader/fileUploaderApi";

const isImageFile = (file: File) => file.type.startsWith("image/");


export const PrimaryImageField = () => {
    const {
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    const primaryImage = watch("primaryImage") || "";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!isImageFile(file)) {
            setError("primaryImage", { message: "Please upload only image file." });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("primaryImage", { message: "File size must be below 5MB." });
            return;
        }

        clearErrors("primaryImage");
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        try {
            const payload = new FormData()
            payload.append("file", selectedFile)
            const res = await fileUploaderApi(payload)

            if (res.status === 200) {
                setValue("primaryImage", res.data.url, { shouldValidate: true });
            }

            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            setError("primaryImage", { message: "Upload failed. Please try again." });
        } finally {
            setUploading(false);
        }
    };

    const handleClear = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        clearErrors("primaryImage");
    };

    const handleRemoveUploaded = () => {
        setValue("primaryImage", "");
    };

    return (
        <div className="w-full space-y-4">
            {/* Upload area */}
            {!selectedFile && (
                <label
                    htmlFor="media-upload"
                    className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-gray-400 transition-colors text-center"
                >
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Upload Thumbnail Image</p>
                    <p className="text-gray-400 text-sm">Click to browse • Max 5MB</p>
                    <input
                        id="media-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            )}

            {/* Preview + Actions */}
            {selectedFile && previewUrl && (
                <div className="flex flex-col items-center gap-4 border p-4 rounded-lg">
                    <div className="w-full flex justify-center">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-48 h-32 rounded-md object-contains"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="default"
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </Button>
                        <Button variant="outline" onClick={handleClear}>
                            Clear
                        </Button>
                    </div>
                </div>
            )}

            {/* Uploaded items list */}
            {primaryImage && (
                <div className="space-y-2">
                    <div className="relative group">
                        <img
                            src={primaryImage}
                            className="w-full h-24 rounded-lg object-contain"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveUploaded()}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                        >
                            <X className="w-4 h-4 text-gray-700" />
                        </button>
                    </div>
                </div>
            )}

            {errors?.root && (
                <FieldError
                    className="text-left text-red-500 mt-2 text-sm"
                    errors={[errors?.root]}
                />
            )}
        </div>
    );
};