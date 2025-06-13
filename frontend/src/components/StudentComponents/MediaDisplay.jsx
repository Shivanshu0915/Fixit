import React, { useState } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Helper component to render media appropriately
const MediaItem = ({ item, onClick, className, alt }) => {
  const isVideo = /\.(mp4|mov|webm)$/i.test(item.url);
  if (isVideo) {
    return (
      <video  src={item.url}  className={className}  onClick={onClick}  controls/>
    );
  }
  return (
    <img  src={item.url}  alt={alt}  className={className}  onClick={onClick} />
  );
};

function LightboxModal({ images, currentIndex, onClose, onPrev, onNext }) {
  if (!images || images.length === 0) return null;
  const currentMedia = images[currentIndex];
  const isVideo = /\.(mp4|mov|webm)$/i.test(currentMedia.url);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      {/* Close Button */}
      <button  onClick={onClose}  className="absolute top-4 right-4 text-white text-2xl">
        <FaTimes />
      </button>
      
      {/* Previous Button */}
      {images.length > 1 && (
        <button  onClick={onPrev} className="absolute left-4 text-white text-3xl">
          <FaArrowLeft />
        </button>
      )}
      
      {/* Displayed Media */}
      {isVideo ? (
        <video  src={currentMedia.url}  className="max-w-full max-h-full object-contain"  controls  autoPlay/>
      ) : (
        <img  src={currentMedia.url}  alt="Expanded view"  className="max-w-full max-h-full object-contain"/>
      )}
      
      {/* Next Button */}
      {images.length > 1 && (
        <button  onClick={onNext}  className="absolute right-4 text-white text-3xl">
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}

export function MediaDisplay({ media }) {
  console.log(media);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const showNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  if (!media || media.length === 0) return null;

  // Single media: full width display with click-to-open modal
  if (media.length === 1) {
    return (
      <>
        <MediaItem item={media[0]} alt="Media" className="w-full object-cover rounded-md cursor-pointer"
          onClick={() => openModal(0)}/>
        {modalOpen && (
          <LightboxModal  images={media} currentIndex={activeIndex} onClose={closeModal}  onPrev={showPrev} onNext={showNext} />
        )}
      </>
    );
  }

  // Two media: display side by side
  if (media.length === 2) {
    return (
      <>
        <div className="grid grid-cols-2 gap-1">
          {media.map((item, index) => (
            <MediaItem key={index} item={item} alt="Media" className="w-full h-full object-cover rounded-md cursor-pointer"
              onClick={() => openModal(index)}/>
          ))}
        </div>
        {modalOpen && (
          <LightboxModal  images={media}  currentIndex={activeIndex}  onClose={closeModal}  onPrev={showPrev}  onNext={showNext}/>
        )}
      </>
    );
  }

  // Three media: one large media on left, two stacked on right
  if (media.length === 3) {
    return (
      <>
        <div className="grid grid-cols-2 grid-rows-2 gap-1">
          <MediaItem item={media[0]} alt="Media" className="row-span-2 object-cover rounded-md cursor-pointer"
           onClick={() => openModal(0)}/>
          <MediaItem item={media[1]} alt="Media" className="object-cover rounded-md cursor-pointer"
            onClick={() => openModal(1)}/>
          <MediaItem item={media[2]} alt="Media" className="object-cover rounded-md cursor-pointer"
            onClick={() => openModal(2)}/>
        </div>
        {modalOpen && (
          <LightboxModal  images={media}  currentIndex={activeIndex}  onClose={closeModal}  onPrev={showPrev} 
            onNext={showNext}/>
        )}
      </>
    );
  }

  // Four media: 2x2 grid
  if (media.length === 4) {
    return (
      <>
        <div className="grid grid-cols-2 gap-1">
          {media.map((item, index) => (
            <MediaItem key={index} item={item} alt="Media" className="w-full h-full object-cover rounded-md cursor-pointer"
              onClick={() => openModal(index)}/>
          ))}
        </div>
        {modalOpen && (
          <LightboxModal  images={media}  currentIndex={activeIndex}  onClose={closeModal}  onPrev={showPrev} 
           onNext={showNext}/>
        )}
      </>
    );
  }

  // More than 4 media: show first 4 items in a grid with overlay on the last one
  return (
    <>
      <div className="grid grid-cols-2 gap-1 relative">
        {media.slice(0, 4).map((item, index) => {
          if (index === 3) {
            const remaining = media.length - 4;
            return (
              <div key={index} className="relative cursor-pointer" onClick={() => openModal(index)}>
                <MediaItem item={item} alt="Media" className="w-full h-full object-cover rounded-md"/>
                {remaining > 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                    <span className="text-white text-xl">+{remaining}</span>
                  </div>
                )}
              </div>
            );
          }
          return (
            <MediaItem key={index} item={item} alt="Media" className="w-full h-full object-cover rounded-md cursor-pointer"
              onClick={() => openModal(index)}/>
          );
        })}
      </div>
      {modalOpen && (
        <LightboxModal  images={media}  currentIndex={activeIndex}  onClose={closeModal} onPrev={showPrev} onNext={showNext}/>
      )}
    </>
  );
}
