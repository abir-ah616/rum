import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './GalleryPage.css';

const ITEMS_PER_PAGE = 24;

export const GalleryPage: React.FC = () => {
    const [photos, setPhotos] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

    useEffect(() => {
        const loadPhotos = async () => {
            // Dynamically import images from src/assets/gallery
            const modules = import.meta.glob('/src/assets/gallery/*.{png,jpg,jpeg,gif,webp}', { eager: true });

            const loadedPhotos = Object.entries(modules).map(([path, mod]: any, index) => {
                const filename = path.split('/').pop()?.split('.')[0] || `Moment ${index + 1}`;
                return {
                    id: index + 1,
                    src: mod.default,
                    caption: filename.replace(/[-_]/g, ' '), // Clean up filename
                    color: ['#FFB7C5', '#B5EAD7', '#E0BBE4', '#FFD1DC', '#FFF5BA', '#C7CEEA'][index % 6]
                };
            });

            setPhotos(loadedPhotos);
        };

        loadPhotos();
    }, []);

    const totalPages = Math.ceil(photos.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    // If no photos, show nothing or a placeholder. 
    // But let's handle the empty state nicely.
    const currentPhotos = photos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const openModal = (photo: any) => {
        setSelectedPhoto(photo);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    return (
        <div style={{ paddingTop: '80px' }}>
            <Section id="gallery" title="My Gallery 📸" bgColor="#FFF0F5" pattern>

                {photos.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>
                        <p>No photos yet! Add some to <code>src/assets/gallery</code> 🌸</p>
                    </div>
                ) : (
                    <>
                        <div className="gallery-grid">
                            {currentPhotos.map((photo, index) => (
                                <div
                                    key={photo.id}
                                    className="gallery-item animate-float"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => openModal(photo)}
                                >
                                    {/* Use img tag for real images */}
                                    <img
                                        src={photo.src}
                                        alt="Gallery Item"
                                        draggable="false"
                                        onContextMenu={(e) => e.preventDefault()}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 'var(--radius-sm)',
                                            aspectRatio: '1',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                    {/* Overlay removed as requested */}
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="page-btn"
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="page-info">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    className="page-btn"
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                )}

                {selectedPhoto && (
                    <div className="modal-overlay" onClick={closeModal} onContextMenu={(e) => e.preventDefault()}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeModal}>
                                <X size={24} />
                            </button>
                            <img
                                src={selectedPhoto.src}
                                alt="Full View"
                                className="modal-image"
                                draggable="false"
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>
                )}

            </Section>
        </div>
    );
};
