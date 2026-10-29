import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCricketActive = currentPath.startsWith('/cricket');
  const isHomeActive = currentPath === '/' || currentPath.startsWith('/tech');
  const isArticlesActive =
    currentPath.startsWith('/cricket/ind-vs-nz/') &&
    !currentPath.startsWith('/cricket/ind-vs-nz/match/') &&
    currentPath !== '/cricket/ind-vs-nz/full-series-schedule';
  const isScheduleActive = currentPath === '/cricket/ind-vs-nz/full-series-schedule';
  const isDeployActive = currentPath === '/deploy-guide' || currentPath === '/sitemap';

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNav('/');
          }}
          className="text-xl font-editorial font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
        >
          HindiTech Guide
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav aria-label="मुख्य नेविगेशन" className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('/');
            }}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isHomeActive
                ? 'text-stone-950 border-[#1E3A8A] font-semibold'
                : 'border-transparent hover:text-stone-950'
            }`}
          >
            होम (टेक गाइड)
          </a>

          <a
            href="/cricket/ind-vs-nz"
            onClick={(e) => {
              e.preventDefault();
              handleNav('/cricket/ind-vs-nz');
            }}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isCricketActive && !isArticlesActive && !isScheduleActive
                ? 'text-[#1E3A8A] border-[#1E3A8A] font-semibold'
                : 'border-transparent hover:text-stone-950'
            }`}
          >
            क्रिकेट न्यूज़
          </a>

          <a
            href="/cricket/ind-vs-nz/match-scorecard"
            onClick={(e) => {
              e.preventDefault();
              handleNav('/cricket/ind-vs-nz/match-scorecard');
            }}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isArticlesActive
                ? 'text-[#1E3A8A] border-[#1E3A8A] font-semibold'
                : 'border-transparent hover:text-stone-950'
            }`}
          >
            हिंदी क्रिकेट लेख
          </a>

          <a
            href="/cricket/ind-vs-nz/full-series-schedule"
            onClick={(e) => {
              e.preventDefault();
              handleNav('/cricket/ind-vs-nz/full-series-schedule');
            }}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isScheduleActive
                ? 'text-[#1E3A8A] border-[#1E3A8A] font-semibold'
                : 'border-transparent hover:text-stone-950'
            }`}
          >
            सीरीज शेड्यूल
          </a>

          <a
            href="/deploy-guide"
            onClick={(e) => {
              e.preventDefault();
              handleNav('/deploy-guide');
            }}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isDeployActive
                ? 'text-[#1E3A8A] border-[#1E3A8A] font-semibold'
                : 'border-transparent hover:text-stone-950'
            }`}
          >
            Netlify व ZIP गाइड
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/hinditech-guide-ind-vs-nz-netlify.zip"
            download="hinditech-guide-ind-vs-nz-netlify.zip"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#1E3A8A] rounded-lg hover:bg-[#172E6E] transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>प्रोजेक्ट ZIP डाउनलोड</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="मेन्यू खोलें"
            className="lg:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg border border-stone-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FBF9F5] px-4 py-3 space-y-1">
          <button
            type="button"
            onClick={() => handleNav('/')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-md"
          >
            होम (HindiTech Guide)
          </button>
          <button
            type="button"
            onClick={() => handleNav('/cricket/ind-vs-nz')}
            className="block w-full text-left px-3 py-2.5 text-sm font-semibold text-[#1E3A8A] hover:bg-stone-100 rounded-md"
          >
            क्रिकेट न्यूज़ (भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट)
          </button>
          <button
            type="button"
            onClick={() => handleNav('/cricket/ind-vs-nz/match-scorecard')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-md"
          >
            हिंदी क्रिकेट लेख (सभी 8 विषय)
          </button>
          <button
            type="button"
            onClick={() => handleNav('/cricket/ind-vs-nz/full-series-schedule')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-md"
          >
            भारत बनाम न्यूज़ीलैंड पूरा शेड्यूल
          </button>
          <button
            type="button"
            onClick={() => handleNav('/deploy-guide')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-md"
          >
            Netlify डिप्लॉयमेंट और ZIP डाउनलोड गाइड
          </button>
        </div>
      )}
    </header>
  );
};
