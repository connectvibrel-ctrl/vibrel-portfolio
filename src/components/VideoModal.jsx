import React, { useEffect } from 'react';
import './VideoModal.css';

const VideoModal = ({ isOpen, onClose, videoUrl, title, client, deliverables }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        <div className="video-modal-player-wrap">
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            controlsList="nodownload noremoteplayback noplaybackrate"
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="video-modal-player"
          />
        </div>
        {(title || client) && (
          <div className="video-modal-info">
            <div>
              {client && <span className="video-modal-client">{client}</span>}
              {title && <h3 className="video-modal-title">{title}</h3>}
            </div>
            {deliverables && (
              <div className="video-modal-deliverables">
                {deliverables.map((item, idx) => (
                  <span key={idx} className="video-deliverable-chip">✓ {item}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
