import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles } from 'lucide-react';

export default function ResultsDisplay({ result, isLoading }) {
  if (isLoading) {
    return (
      <div className="glass-panel" style={{ padding: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <Sparkles className="icon-pulse" size={48} style={{ color: 'var(--primary-color)' }} />
        <h3 style={{ margin: 0 }}>Analyzing your style...</h3>
        <p style={{ textAlign: 'center' }}>Our AI stylist is matching colors and generating the perfect look.</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
        <Sparkles size={24} />
        <h2 style={{ margin: 0 }}>Stylist Recommendations</h2>
      </div>
      <div className="markdown-content" style={{ lineHeight: '1.8' }}>
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
    </div>
  );
}
