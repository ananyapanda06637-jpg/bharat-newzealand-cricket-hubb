import React from 'react';
import { HINDI_CRICKET_ARTICLES } from '../data/hindiArticlesData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-16 bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-4 space-y-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="text-xl font-editorial font-bold text-white"
            >
              HindiTech Guide
            </a>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              सरल और साफ हिंदी में टेक्नोलॉजी गाइड और <strong>भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट</strong> का विश्वसनीय मंच। सभी क्रिकेट आँकड़े और स्कोरकार्ड आधिकारिक स्रोतों (BCCI, NZC, ICC एवं ESPNcricinfo) से सत्यापित हैं।
            </p>
            <p className="text-xs text-stone-500">
              संपादकीय नीति: नकली लाइव स्कोर, अपुष्ट खबरें या भविष्य के मैचों के काल्पनिक परिणाम कभी प्रकाशित नहीं किए जाते।
            </p>
          </div>

          {/* All 8 Required Hindi Cricket Articles Links */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-bold text-white mb-3">
              भारत बनाम न्यूज़ीलैंड: 8 विशेष हिंदी लेख (आंतरिक SEO लिंक)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {HINDI_CRICKET_ARTICLES.map((art) => (
                <li key={art.slug}>
                  <a
                    href={art.urlPath}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(art.urlPath);
                    }}
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    0{art.id}. {art.categoryHindi}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Site Links & Sitemap */}
          <div className="lg:col-span-3 space-y-2.5 text-xs">
            <h3 className="text-sm font-bold text-white mb-3">महत्वपूर्ण लिंक और तकनीकी संसाधन</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/cricket/ind-vs-nz"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/cricket/ind-vs-nz');
                  }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट (मुख्य हब)
                </a>
              </li>
              <li>
                <a
                  href="/deploy-guide"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/deploy-guide');
                  }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Netlify डिप्लॉयमेंट और प्रोजेक्ट ZIP डाउनलोड
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  XML साइटमैप (/sitemap.xml)
                </a>
              </li>
              <li>
                <a
                  href="/hinditech-guide-ind-vs-nz-netlify.zip"
                  download="hinditech-guide-ind-vs-nz-netlify.zip"
                  className="text-amber-300 hover:underline font-medium"
                >
                  प्रोजेक्ट ZIP फाइल डाउनलोड करें (.zip)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>© {new Date().getFullYear()} HindiTech Guide. सर्वाधिकार सुरक्षित। मौलिक हिंदी कंटेंट।</div>
          <div>डेटा स्रोत: BCCI · NZC · ICC · ESPNcricinfo आधिकारिक अभिलेख</div>
        </div>
      </div>
    </footer>
  );
};
