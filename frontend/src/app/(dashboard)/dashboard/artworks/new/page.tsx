'use client';

import { useState } from 'react';
import { Upload, X, ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewArtworkPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        medium: '',
        year: new Date().getFullYear().toString(),
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.medium, // Mapping 'medium' to 'category'
                imageUrl: preview,
                year: parseInt(formData.year),
                status: 'listed'
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/artworks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                credentials: 'include' // Important for sending cookies
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to create artwork');
            }

            router.push('/dashboard/artworks');
            router.refresh(); // Refresh the list
        } catch (error) {
            console.error('Error creating artwork:', error);
            alert('Failed to create artwork. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/artworks"
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-neutral-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Upload Artwork</h1>
                    <p className="text-neutral-500 text-sm">Share your creation with the world</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-[2fr,1fr] gap-8">
                <div className="space-y-6">
                    {/* Image Upload Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">Artwork Image</label>
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center transition-colors
                                ${dragActive ? 'border-neutral-800 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'}
                                ${preview ? 'border-solid p-0 overflow-hidden' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {preview ? (
                                <div className="relative w-full h-[400px]">
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        fill
                                        className="object-contain bg-neutral-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPreview(null)}
                                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur shadow-sm rounded-full hover:bg-white transition-colors border"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 pointer-events-none">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
                                        <Upload className="w-6 h-6 text-neutral-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium text-neutral-900">Click or drag image to upload</p>
                                        <p className="text-sm text-neutral-500">SVG, PNG, JPG or GIF (max. 20MB)</p>
                                    </div>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${preview ? 'hidden' : ''}`}
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium text-neutral-700">Title</label>
                            <input
                                id="title"
                                type="text"
                                required
                                placeholder="e.g. The Starry Night"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all font-medium placeholder:font-normal text-neutral-900"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium text-neutral-700">Description</label>
                            <textarea
                                id="description"
                                rows={5}
                                required
                                placeholder="Tell the story behind your artwork..."
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all resize-none text-neutral-900"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 border rounded-xl space-y-4 bg-white/50">
                        <h3 className="font-medium text-neutral-900">Details</h3>

                        <div className="space-y-2">
                            <label htmlFor="price" className="text-sm font-medium text-neutral-700">Price (USD)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                                <input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all text-neutral-900"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="medium" className="text-sm font-medium text-neutral-700">Category</label>
                            <select
                                id="medium"
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all bg-white text-neutral-900"
                                value={formData.medium}
                                onChange={e => setFormData({ ...formData, medium: e.target.value })}
                            >
                                <option value="">Select category</option>
                                <option value="Oil Painting">Oil Painting</option>
                                <option value="Acrylic">Acrylic</option>
                                <option value="Watercolor">Watercolor</option>
                                <option value="Digital Art">Digital Art</option>
                                <option value="Sculpture">Sculpture</option>
                                <option value="Photography">Photography</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="year" className="text-sm font-medium text-neutral-700">Year Created</label>
                            <input
                                id="year"
                                type="number"
                                min="1900"
                                max={new Date().getFullYear()}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all text-neutral-900"
                                value={formData.year}
                                onChange={e => setFormData({ ...formData, year: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Publish Artwork'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full py-2.5 px-4 bg-white border hover:bg-neutral-50 text-neutral-700 font-medium rounded-lg transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
