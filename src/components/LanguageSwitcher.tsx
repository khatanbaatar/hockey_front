'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('mn')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'mn'
            ? 'bg-blue-700 text-white'
            : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
        }`}
      >
        {t('lang.mongolian')}
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-blue-700 text-white'
            : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
        }`}
      >
        {t('lang.english')}
      </button>
    </div>
  );
}
