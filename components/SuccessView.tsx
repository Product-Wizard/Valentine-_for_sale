import React, { useEffect, useState } from 'react';
import { generateLoveNote } from '../services/gemini';
import { Sparkles, RefreshCcw } from 'lucide-react';

const SuccessView: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      const loveNote = await generateLoveNote();
      setNote(loveNote);
      setLoading(false);
    };

    fetchNote();
  }, []);

  return (
    <div className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center border-4 border-red-300 animate-fade-in-up">
      <div className="mb-6 rounded-full bg-pink-100 p-4 shadow-inner">
         <img 
          src="https://picsum.photos/id/1025/300/300" 
          alt="Happy celebration" 
          className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
        />
      </div>

      <h1 className="text-5xl font-bold text-red-600 mb-4 handwritten">
        YAAAY!!! 🎉
      </h1>
      
      <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 shadow-sm w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
             <p className="text-pink-400 text-sm">Asking Cupid for the perfect words...</p>
          </div>
        ) : (
          <p className="text-lg md:text-xl text-gray-700 font-medium italic leading-relaxed">
            "{note}"
          </p>
        )}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-pink-500">
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="font-semibold">Best Valentine Ever</span>
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>
    </div>
  );
};

export default SuccessView;
