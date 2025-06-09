// src/components/ImageCarousel.tsx
import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface CarouselImage {
    imageURL: string;
    altText: string;
}

interface Props {
    images: CarouselImage[];
    className?: string;
}

const ImageCarousel: React.FC<Props> = ({ images, className = "" }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setCurrent(0);
    }, [images]);

    const prev = () =>
        setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    const next = () =>
        setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {/* Main image with arrows */}
            <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
                <img
                    src={images[current].imageURL}
                    alt={images[current].altText}
                    className="w-full h-full object-cover"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full focus:outline-none"
                            aria-label="Previous image"
                        >
                            <HiChevronLeft className="h-6 w-6 text-gray-800" />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full focus:outline-none"
                            aria-label="Next image"
                        >
                            <HiChevronRight className="h-6 w-6 text-gray-800" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2 mt-3 max-w-full overflow-x-auto justify-center">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img.imageURL}
                        alt={img.altText}
                        onClick={() => setCurrent(idx)}
                        className={`
              w-16 h-16 object-cover rounded-lg cursor-pointer
              ${idx === current
                            ? "ring-2 ring-[var(--color-primary)]"
                            : "opacity-70 hover:opacity-100"}
            `}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
