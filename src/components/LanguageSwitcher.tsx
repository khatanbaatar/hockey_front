'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <ul className="buy-button list-none mb-0">
            <li className="inline mb-0">
                <a onClick={() => setLanguage('mn')}>
                    <span className="login-btn-light"><span className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'mn'
            ? 'bg-blue-700 text-white'
            : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
        }`}><i data-feather="settings" className="size-4">MN</i></span></span>
                </a>
            </li>
            
            <li className="inline ps-1 mb-0">
                <a onClick={() => setLanguage('en')}>
                    <div className="login-btn-light"><span className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-blue-700 text-white'
            : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
        }`}><i data-feather="shopping-cart" className="size-4">EN</i></span></div>
                </a>
            </li>
        </ul>
      {/* <button
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
      </button> */}
    </div>
  );
}
