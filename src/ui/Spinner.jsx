import React from 'react';
import './spinner.css';

export default function LoadingSpinner() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 flex min-h-screen max-w-full  items-center 
  justify-center bg-slate-200 backdrop-blur-lg"
    >
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}
