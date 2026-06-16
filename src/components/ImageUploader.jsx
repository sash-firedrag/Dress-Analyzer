import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';

export default function ImageUploader({ images, setImages, type }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentImages = images[type] || [];

  const handleFileChange = (e) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(handleFile);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages(prev => {
        const existing = prev[type] || [];
        return { ...prev, [type]: [...existing, { url: e.target.result, file }] };
      });
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      Array.from(e.dataTransfer.files).forEach(handleFile);
    }
  };

  const removeImage = (e, indexToRemove) => {
    e.stopPropagation();
    setImages(prev => {
      const existing = prev[type] || [];
      const newArray = existing.filter((_, i) => i !== indexToRemove);
      if (newArray.length === 0) {
        const newImages = { ...prev };
        delete newImages[type];
        return newImages;
      }
      return { ...prev, [type]: newArray };
    });
  };

  return (
    <div 
      className={`glass-panel uploader-container ${isDragging ? 'dragging' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        border: isDragging ? '2px dashed var(--primary-color)' : '1px solid var(--glass-border)',
        position: 'relative',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        padding: currentImages.length > 0 ? '1rem' : '2rem'
      }}
    >
      <input 
        type="file" 
        accept="image/*" 
        multiple
        style={{ display: 'none' }} 
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {currentImages.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
          {currentImages.map((img, index) => (
            <div key={index} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
              <img 
                src={img.url} 
                alt={`${type}-${index}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <button 
                onClick={(e) => removeImage(e, index)}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '8px', 
              border: '2px dashed var(--primary-color)',
              background: 'rgba(99, 102, 241, 0.05)',
              color: 'var(--primary-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Plus size={24} />
            <span style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Add</span>
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '1rem',
            height: '100%',
            cursor: 'pointer'
          }}
        >
          <div style={{ 
            background: 'rgba(99, 102, 241, 0.1)', 
            padding: '1rem', 
            borderRadius: '50%',
            color: 'var(--primary-color)'
          }}>
            <ImageIcon size={32} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Upload {type === 'dress' ? 'Dresses' : 'Accessories'}</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Drag & drop multiple files or click to browse</p>
          </div>
        </div>
      )}
    </div>
  );
}
