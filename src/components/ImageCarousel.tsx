'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
}

export default function ImageCarousel({ 
  images, 
  autoPlay = true, 
  interval = 5000 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  // const goToSlide = (index: number) => {
  //   setCurrentIndex(index);
  // };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  if (images.length === 0) return null;

  return (
    // 🚨 Гаднах Container: Overflow-hidden хийж, зөвхөн нэг зураг харагдана
    <div className="relative w-full h-96 md:h-[100vh] lg:h-[100vh] overflow-hidden">
      
      {/* 🚨 Slide Container: Бүх зургийг багтааж, хөдөлгөөнийг удирдана */}
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        // 🚨 Transform-ийг ашиглан зураг урсах эффектийг үүсгэнэ
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} 
      >
        {images.map((image, index) => (
          // 🚨 Image Wrapper: 100% өргөнтэй байх ёстой
          <div key={index} className="flex-shrink-0 w-full h-full relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              // Зөвхөн эхний зургийг Priority хийнэ
              priority={index === 0} 
            />
            
            {/* Overlay and Caption (Хөдөлж буй зураг бүр дээрх Caption) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {image.caption && (
              <div className="absolute md:end-0 md:start-auto bottom-0 w-full lg:w-[700px] md:w-[500px] h-fit bg-white dark:bg-slate-900 md:p-20 p-10">
                        <h5 className="text-xl md:text-2xl lg:text-3xl uppercase font-bold mb-4 text-sm">{image.caption}</h5>
                        {/* <div className="mt-8">
                            <a href="" className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">Shop Now <i className="uil uil-arrow-right"></i></a>
                        </div> */}
                    </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Хэвээр үлдэнэ) */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator (Хэвээр үлдэнэ) */}
      {/* {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )} */}
    </div>
  );
}