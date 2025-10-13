'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

interface HomeMasonryGalleryProps {
  media: MediaItem[];
  onImageClick?: (imageUrl: string, caption?: string, index?: number) => void;
}

const HomeMasonryGallery = ({ media, onImageClick }: HomeMasonryGalleryProps) => {
  const [columns, setColumns] = useState(3);

  // Responsive column calculation (max 3 columns for homepage)
  useEffect(() => {
    const updateColumns = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 768) {
          setColumns(1);
        } else if (width < 1024) {
          setColumns(2);
        } else {
          setColumns(3); // Maximum 3 columns for homepage
        }
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Generate more balanced heights for better layout
  const getItemHeight = (index: number) => {
    // More varied heights but better distributed
    const heights = [180, 220, 260, 300, 240, 280, 320, 200, 340, 250];
    return heights[index % heights.length];
  };

  // CSS columns will handle the distribution automatically

  return (
    <div className="home-masonry-gallery">
      <div 
        className="masonry-columns"
        style={{
          columnCount: columns,
          columnGap: '1rem'
        }}
      >
        {media.map((item, index) => {
          const height = getItemHeight(index);
          
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mb-4 break-inside-avoid"
            >
                  {item.type === 'image' ? (
                    <div className="relative">
                      <Image
                        src={item.url}
                        alt={item.caption || 'Gallery image'}
                        width={400}
                        height={height}
                        className="w-full object-cover cursor-pointer"
                        style={{ height: `${height}px` }}
                        loading="lazy"
                        onClick={() => {
                          if (onImageClick) {
                            const imageIndex = media.filter(m => m.type === 'image').findIndex(m => m.url === item.url);
                            onImageClick(item.url, item.caption, imageIndex);
                          }
                        }}
                      />
                      
                      {/* Overlay with camera icon */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onImageClick) {
                                const imageIndex = media.filter(m => m.type === 'image').findIndex(m => m.url === item.url);
                                onImageClick(item.url, item.caption, imageIndex);
                              }
                            }}
                            className="size-10 inline-flex items-center justify-center bg-white/90 hover:bg-white text-gray-700 hover:text-indigo-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                            aria-label="Open image in lightbox"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Caption */}
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-xs font-medium">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div 
                      className="relative bg-gray-100"
                      style={{ height: `${height}px` }}
                    >
                      <video
                        src={item.url}
                        controls
                        className="w-full h-full object-cover rounded-lg"
                        preload="metadata"
                      />
                      {/* Video overlay */}
                      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                        Video
                      </div>
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <p className="text-white text-xs font-medium">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
        })}
      </div>
    </div>
  );
};

export default HomeMasonryGallery;
