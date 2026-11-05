import React, { useState } from 'react';
import { AppScreenshot } from '@shared/schemas/app.schema';
import { Modal } from '@components/Modal/Modal';
import './ScreenshotGallery.css';

export interface ScreenshotGalleryProps {
  screenshots: AppScreenshot[];
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ screenshots }) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<AppScreenshot | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <>
      <div className="screenshot-gallery-grid">
        {screenshots.map((screen, index) => (
          <div key={index} className="screenshot-item">
            <button
              type="button"
              className="screenshot-thumbnail-btn"
              onClick={() => setSelectedScreenshot(screen)}
              aria-label={`View full resolution image: ${screen.caption || screen.alt}`}
            >
              <img
                src={screen.url}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                loading="lazy"
                decoding="async"
                className="screenshot-img"
              />
            </button>
            {screen.caption && <p className="screenshot-caption">{screen.caption}</p>}
          </div>
        ))}
      </div>

      <Modal
        isOpen={Boolean(selectedScreenshot)}
        onClose={() => setSelectedScreenshot(null)}
        title={selectedScreenshot?.caption || 'App Screenshot'}
      >
        {selectedScreenshot && (
          <div>
            <img
              src={selectedScreenshot.url}
              alt={selectedScreenshot.alt}
              width={selectedScreenshot.width}
              height={selectedScreenshot.height}
              className="modal-lightbox-img"
            />
          </div>
        )}
      </Modal>
    </>
  );
};
