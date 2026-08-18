"use client"

import { FieldError } from "@/components/ui/fields";
import { X, UploadCloud } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { fileUploaderApi } from "@/lib/api/uploader/fileUploaderApi";
import { v4 as uuidv4 } from "uuid";
import { FaSpinner } from "react-icons/fa";

const isVideoFile = (file: File) => file.type.startsWith("video/");
const isImageFile = (file: File) => file.type.startsWith("image/");

type SelectedFile = {
    id: string;
    file: File;
    previewUrl: string;
    uploading: boolean;
    progress: number; // 0-100
    error?: string | null;
};

export const UploadMediaField = () => {
    const {
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [globalUploading, setGlobalUploading] = useState(false);

    const images = watch("images") || [];
    const videos = watch("videos") || [];

    const MAX_SIZE = 10 * 1024 * 1024;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const invalids: string[] = [];
        const valids: SelectedFile[] = [];

        files.forEach((file) => {
            if (!isImageFile(file) && !isVideoFile(file)) {
                invalids.push(`${file.name}: invalid type`);
                return;
            }
            if (file.size > MAX_SIZE) {
                invalids.push(`${file.name}: size > 10MB`);
                return;
            }
            const id = uuidv4();
            valids.push({
                id,
                file,
                previewUrl: URL.createObjectURL(file),
                uploading: false,
                progress: 0,
                error: null,
            });
        });

        if (invalids.length > 0) {
            setError("root.media", {
                message: `Some files were ignored: ${invalids.join("; ")}`,
            });
        } else {
            clearErrors("root.media");
        }

        // append new valid files
        setSelectedFiles((prev) => [...prev, ...valids]);

        // reset input so same file can be re-selected if needed
        e.currentTarget.value = "";
    };

    const removeSelected = (id: string) => {
        setSelectedFiles((prev) => {
            const toRemove = prev.find((p) => p.id === id);
            if (toRemove) URL.revokeObjectURL(toRemove.previewUrl);
            return prev.filter((p) => p.id !== id);
        });
        clearErrors("root.media");
    };

    const uploadSingle = async (fileItem: SelectedFile) => {
        // Protect against concurrent uploads of same file
        setSelectedFiles((prev) =>
            prev.map((p) => (p.id === fileItem.id ? { ...p, uploading: true, progress: 0, error: null } : p))
        );
        try {
            const payload = new FormData();
            payload.append("file", fileItem.file);

            // assume fileUploaderApi accepts axios-like config with onUploadProgress
            const res = await fileUploaderApi(payload);

            // Handle the response after the upload
            setSelectedFiles((prev) =>
                prev.map((p) => (p.id === fileItem.id ? { ...p, uploading: false, progress: 100, error: null } : p))
            );

            if (res?.status === 200 && res?.data?.url) {
                if (isVideoFile(fileItem.file)) {
                    const current = watch("videos") || [];
                    setValue("videos", [...current, res.data.url], { shouldValidate: true });
                } else {
                    const current = watch("images") || [];
                    setValue("images", [...current, res.data.url], { shouldValidate: true });
                }

                // revoke preview and remove from selectedFiles
                URL.revokeObjectURL(fileItem.previewUrl);
                setSelectedFiles((prev) => prev.filter((p) => p.id !== fileItem.id));
            } else {
                throw new Error("Upload failed");
            }
        } catch (err) {
            const message = (err as any)?.message || "Upload failed";
            setSelectedFiles((prev) => prev.map((p) => (p.id === fileItem.id ? { ...p, uploading: false, error: message } : p)));
            setError("root.media", { message: "One or more uploads failed. See item errors." });
        }
    };

    const uploadAllSequential = async () => {
        if (selectedFiles.length === 0) return;
        setGlobalUploading(true);
        clearErrors("root.media");
        for (const item of [...selectedFiles]) {
            // If removed during upload, skip
            const exists = selectedFiles.find((s) => s.id === item.id);
            if (!exists) continue;
            // await each upload
            // eslint-disable-next-line no-await-in-loop
            await uploadSingle(item);
        }
        setGlobalUploading(false);
    };

    const handleClearAll = () => {
        selectedFiles.forEach((s) => URL.revokeObjectURL(s.previewUrl));
        setSelectedFiles([]);
        clearErrors("root.media");
    };

    return (
        <div className="w-full space-y-4">
            {/* Upload area */}
            <label
                htmlFor="media-upload"
                className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-gray-400 transition-colors text-center"
            >
                <div className="flex items-center gap-3">
                    <UploadCloud className="w-6 h-6 text-gray-400" />
                    <div className="text-left">
                        <p className="text-gray-600 font-medium">Upload Image(s) or Video(s)</p>
                        <p className="text-gray-400 text-sm">Click to browse • Max 10MB each • Multiple allowed</p>
                    </div>
                </div>
                <input
                    id="media-upload"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                />
            </label>

            {/* Selected previews */}
            {selectedFiles.length > 0 && (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <p className="font-medium">Selected ({selectedFiles.length})</p>
                        <div className="flex gap-2">
                            <Button variant="default" onClick={uploadAllSequential} disabled={globalUploading || selectedFiles.length === 0}>
                                {globalUploading ? "Uploading..." : "Upload All"}
                            </Button>
                            <Button variant="outline" onClick={handleClearAll} disabled={globalUploading}>
                                Clear All
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {selectedFiles.map((item) => (
                            <div key={item.id} className="relative group border rounded-lg p-2 flex flex-col items-center">
                                <div className="w-full flex justify-center mb-2">
                                    {isVideoFile(item.file) ? (
                                        <video src={item.previewUrl} className="w-full h-32 rounded-md bg-black" />
                                    ) : (
                                        <img src={item.previewUrl} alt={item.file.name} className="w-full h-32 rounded-md object-cover" />
                                    )}
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="truncate">{item.file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSelected(item.id)}
                                            className="ml-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                                            disabled={item.uploading || globalUploading}
                                            title="Remove"
                                        >
                                            <X className="w-4 h-4 text-gray-700" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="default"
                                            onClick={() => uploadSingle(item)}
                                            disabled={item.uploading || globalUploading}
                                            className="flex-1"
                                        >
                                            {item.uploading ? `Uploading...` : "Upload"}
                                        </Button>
                                        {item.uploading && (
                                            <div className="w-16 text-xs text-right">
                                                <FaSpinner className="animate-spin" />
                                            </div>
                                        )}
                                    </div>

                                    {item.error && <div className="text-red-500 text-xs">{item.error}</div>}
                                </div>
                            </div>
                        ))}
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
                                        <img src={url} className="w-full h-24 rounded-lg object-cover" />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setValue(
                                                    "images",
                                                    images.filter((it: string) => it !== url)
                                                )
                                            }
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
                                        <video src={url} controls className="w-full h-24 rounded-lg bg-black" />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setValue(
                                                    "videos",
                                                    videos.filter((it: string) => it !== url)
                                                )
                                            }
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

            {(errors?.images || errors?.videos || errors?.root?.media) && (
                <FieldError
                    className="text-left text-red-500 mt-2 text-sm"
                    errors={[errors?.images, errors?.videos, errors?.root?.media]}
                />
            )}
        </div>
    );
};