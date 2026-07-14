import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-12 h-12 rounded-full absolute border-4 border-slate-200"></div>
        {/* Spinning Orange Arc */}
        <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;