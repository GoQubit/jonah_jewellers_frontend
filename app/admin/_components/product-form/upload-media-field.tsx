"use client"

import { FieldError } from "@/components/ui/fields";
import { X, UploadCloud } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { fileUploaderApi } from "@/lib/api/uploader/fileUploaderApi";

const isVideoFile = (file: File) => file.type.startsWith("video/");
const isImageFile = (file: File) => file.type.startsWith("image/");


export const UploadMediaField = () => {
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

    const images = watch("images") || [];
    const videos = watch("videos") || [];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!isImageFile(file) && !isVideoFile(file)) {
            setError("root.media", { message: "Please upload only image or video file." });
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError("root.media", { message: "File size must be below 10MB." });
            return;
        }

        clearErrors("root.media");
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
                if (isVideoFile(selectedFile)) {
                    setValue("videos", [...videos, res.data.url], { shouldValidate: true });
                } else {
                    setValue("images", [...images, res.data.url], { shouldValidate: true });
                }
            }

            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            setError("root.media", { message: "Upload failed. Please try again." });
        } finally {
            setUploading(false);
        }
    };

    const handleClear = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        clearErrors("root.media");
    };

    const handleRemoveUploaded = (url: string, type: "image" | "video") => {
        if (type === "image") {
            setValue(
                "images",
                images.filter((i: string) => i !== url)
            );
        } else {
            setValue(
                "videos",
                videos.filter((v: string) => v !== url)
            );
        }
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
                    <p className="text-gray-600 font-medium">Upload Image or Video</p>
                    <p className="text-gray-400 text-sm">Click to browse • Max 10MB</p>
                    <input
                        id="media-upload"
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            )}

            {/* Preview + Actions */}
            {selectedFile && previewUrl && (
                <div className="flex flex-col items-center gap-4 border p-4 rounded-lg">
                    <div className="w-full flex justify-center">
                        {isVideoFile(selectedFile) ? (
                            <video
                                src={previewUrl}
                                controls
                                className="w-48 h-32 rounded-md object-contains"
                            />
                        ) : (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-48 h-32 rounded-md object-contains"
                            />
                        )}
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
            {(images.length > 0 || videos.length > 0) && (
                <div className="space-y-2">
                    {images.length > 0 && (
                        <>
                            <p className="font-medium text-gray-700">Images</p>
                            <div className="grid grid-cols-3 gap-3">
                                {images.map((url: string, i: number) => (
                                    <div key={i} className="relative group">
                                        <img
                                            src={url}
                                            className="w-full h-24 rounded-lg object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveUploaded(url, "image")}
                                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                                        >
                                            <X className="w-4 h-4 text-gray-700" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {videos.length > 0 && (
                        <>
                            <p className="font-medium text-gray-700 mt-3">Videos</p>
                            <div className="grid grid-cols-3 gap-3">
                                {videos.map((url: string, i: number) => (
                                    <div key={i} className="relative group">
                                        <video
                                            src={url}
                                            controls
                                            className="w-full h-24 rounded-lg bg-black"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveUploaded(url, "video")}
                                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                                        >
                                            <X className="w-4 h-4 text-gray-700" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {(errors?.images || errors?.videos) && (
                <FieldError
                    className="text-left text-red-500 mt-2 text-sm"
                    errors={[errors?.images, errors?.videos]}
                />
            )}
        </div>
    );
};