import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ResultsDisplay from './ResultsDisplay';
import { generateOutfitCombination } from '../services/aiService';
import { Wand2 } from 'lucide-react';

export default function AICombinator() {
  const [images, setImages] = useState({});
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    const hasDress = images.dress && images.dress.length > 0;
    const hasAccessories = images.accessories && images.accessories.length > 0;

    if (!hasDress && !hasAccessories) {
      setError("Please upload at least one image (dress or accessories).");
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const dressUrls = hasDress ? images.dress.map(img => img.url) : [];
      const accessoryUrls = hasAccessories ? images.accessories.map(img => img.url) : [];
      
      const aiResult = await generateOutfitCombination(dressUrls, accessoryUrls);
      setResult(aiResult);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="combinator-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div className="upload-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem' 
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, color: 'var(--text-color)' }}>1. The Main Piece</h3>
          <ImageUploader type="dress" images={images} setImages={setImages} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, color: 'var(--text-color)' }}>2. Accessories</h3>
          <ImageUploader type="accessories" images={images} setImages={setImages} />
        </div>
      </div>

      {error && (
        <div className="auth-error" style={{ margin: '0' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          className="btn-primary" 
          onClick={handleGenerate} 
          disabled={isLoading || (!(images.dress && images.dress.length > 0) && !(images.accessories && images.accessories.length > 0))}
          style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
        >
          <Wand2 size={24} />
          {isLoading ? 'Generating Magic...' : 'Generate Combination'}
        </button>
      </div>

      {(result || isLoading) && (
        <div style={{ marginTop: '2rem' }}>
          <ResultsDisplay result={result} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
