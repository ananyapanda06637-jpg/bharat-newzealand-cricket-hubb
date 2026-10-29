import React, { useState } from 'react';
import { ShieldCheck, Server, PlusCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { HindiCricketArticle } from '../data/hindiArticlesData';

interface LiveApiStatus {
  liveAvailable: boolean;
  providerConfigured: boolean;
  providerName: string;
  lastCheckedHindi: string;
  messageHindi: string;
  nextScheduledMatchHindi: string;
}

interface ManualPublisherAndApiPanelProps {
  liveStatus: LiveApiStatus;
  onRefreshLiveStatus: () => void;
  onPublishCustomArticle: (newArticle: HindiCricketArticle) => void;
  onNavigate: (path: string) => void;
}

export const ManualPublisherAndApiPanel: React.FC<ManualPublisherAndApiPanelProps> = ({
  liveStatus,
  onRefreshLiveStatus,
  onPublishCustomArticle,
  onNavigate,
}) => {
  const [titleHindi, setTitleHindi] = useState('');
  const [categoryHindi, setCategoryHindi] = useState('मैन्युअल सत्यापित अपडेट');
  const [sourceHindi, setSourceHindi] = useState('BCCI / NZC आधिकारिक प्रेस विज्ञप्ति');
  const [summaryHindi, setSummaryHindi] = useState('');
  const [bodyParagraphHindi, setBodyParagraphHindi] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [publishMessage, setPublishMessage] = useState<string | null>(null);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleHindi.trim() || !bodyParagraphHindi.trim()) return;

    const cleanSlug =
      'verified-update-' +
      Date.now().toString().slice(-6);

    const todayHindi = '28 अक्टूबर 2026';
    const newArt: HindiCricketArticle = {
      id: Date.now(),
      slug: cleanSlug,
      urlPath: `/cricket/ind-vs-nz/${cleanSlug}`,
      categoryHindi: categoryHindi.trim(),
      titleHindi: titleHindi.trim(),
      subtitleHindi: summaryHindi.trim() || titleHindi.trim(),
      publishedDateHindi: todayHindi,
      isoPublishedDate: '2026-10-28',
      lastVerifiedHindi: `${todayHindi} (संपादकीय सत्यापित)`,
      authorHindi: 'हिंदीटेक गाइड संपादकीय डेस्क (मैन्युअल प्रकाशन)',
      readingTimeHindi: '4 मिनट पठन',
      dataSourceHindi: sourceHindi.trim(),
      seoMetaTitle: `${titleHindi.trim()} | HindiTech Guide क्रिकेट अपडेट`,
      seoMetaDescription:
        seoDescription.trim() ||
        `${titleHindi.trim()} - सत्यापित स्रोत (${sourceHindi.trim()}) पर आधारित भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट।`,
      sections: [
        {
          headingHindi: 'सत्यापित मैच और समाचार विवरण',
          paragraphsHindi: bodyParagraphHindi
            .split('\n')
            .map((p) => p.trim())
            .filter(Boolean),
        },
      ],
      relatedArticleSlugs: ['match-scorecard', 'match-result', 'next-match-schedule-time'],
      relatedMatchSlugs: ['ct-2025-final-dubai', 'ind-nz-4th-t20i-2026-auckland'],
    };

    onPublishCustomArticle(newArt);
    setPublishMessage(`सत्यापित लेख सफलतापूर्वक प्रकाशित हो गया है! साफ URL: ${newArt.urlPath}`);
    setTitleHindi('');
    setSummaryHindi('');
    setBodyParagraphHindi('');
    setSeoDescription('');
  };

  return (
    <section className="mt-14 pt-10 border-t border-stone-200 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 6 cols: Live Cricket API Status, Security & Cost Documentation */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-[#1E3A8A]" />
                <h2 className="text-xl font-editorial font-bold text-stone-900">
                  लाइव क्रिकेट API स्थिति, कॉन्फ़िगरेशन और सुरक्षा
                </h2>
              </div>
              <button
                type="button"
                onClick={onRefreshLiveStatus}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-[#FBF9F5] border border-stone-200 rounded-lg hover:bg-stone-100 whitespace-nowrap shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>स्थिति जाँचें</span>
              </button>
            </div>

            {/* Honest Live Data Status Box */}
            <div className="mt-4 p-4 bg-[#FBF9F5] border border-stone-200 rounded-lg text-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>स्रोत: {liveStatus.providerName}</span>
                <span>आखिरी जाँच: {liveStatus.lastCheckedHindi}</span>
              </div>
              <p className="font-semibold text-stone-900">{liveStatus.messageHindi}</p>
              <p className="text-xs text-stone-600">{liveStatus.nextScheduledMatchHindi}</p>
            </div>

            {/* Detailed API Requirement, Config & Cost Explanation */}
            <div className="mt-6 space-y-4 text-sm text-stone-700">
              <div>
                <h3 className="font-bold text-stone-900">1. लाइव क्रिकेट API की आवश्यकता और संभावित लागत</h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed">
                  रीयल-टाइम बॉल-बाय-बॉल लाइव स्कोर के लिए विश्वसनीय तृतीय-पक्ष क्रिकेट डेटा प्रदाता जैसे{' '}
                  <strong>CricAPI (CricketData.org)</strong>, <strong>Sportmonks Cricket API</strong> या{' '}
                  <strong>Roanuz Cricket API</strong> की आवश्यकता होती है:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-stone-600 list-disc list-inside">
                  <li>
                    <strong>निःशुल्क प्लान (Free Tier):</strong> लगभग 100 रिक्वेस्ट/दिन (केवल परीक्षण के लिए उपयुक्त)।
                  </li>
                  <li>
                    <strong>प्रोडक्शन प्लान (Paid Tier):</strong> लगभग ₹1,500 से ₹8,000 प्रति माह ($19–$99/माह), जिसमें लाइव स्कोरकार्ड, टॉस और बॉल-बाय-बॉल अपडेट मिलते हैं।
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#14532D]" />
                  <span>2. API Key सुरक्षा (सार्वजनिक HTML/JS में कभी उजागर नहीं)</span>
                </h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed">
                  सुरक्षा नियमों के अनुसार किसी भी API Key को फ्रंटएंड HTML या क्लाइंट-साइड JavaScript में नहीं रखा गया है। सर्वर-साइड प्रॉक्सी रूट (<code>/api/cricket/live-status</code>) केवल सर्वर के{' '}
                  <code>process.env.CRICAPI_KEY</code> या Netlify Environment Variables से कुंजी पढ़ता है।
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>सर्वर प्रॉक्सी: /api/cricket/live-status</span>
            <button
              type="button"
              onClick={() => onNavigate('/deploy-guide')}
              className="text-[#1E3A8A] font-medium hover:underline"
            >
              Netlify में API Key कैसे जोड़ें? →
            </button>
          </div>
        </div>

        {/* Right 6 cols: Manual Verified Article Publisher */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 sm:p-8">
          <div className="pb-4 border-b border-stone-200">
            <h2 className="text-xl font-editorial font-bold text-stone-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#1E3A8A]" />
              <span>मैन्युअल सत्यापित हिंदी लेख प्रकाशक (CMS विकल्प)</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              जब लाइव API उपलब्ध न हो, तो आधिकारिक स्रोतों (BCCI / NZC / ICC) से सत्यापित जानकारी के आधार पर नया मौलिक हिंदी लेख या मैच अपडेट यहाँ से तुरंत प्रकाशित करें।
            </p>
          </div>

          <form onSubmit={handlePublish} className="mt-5 space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                लेख का स्पष्ट हिंदी शीर्षक (Headline) *
              </label>
              <input
                type="text"
                required
                value={titleHindi}
                onChange={(e) => setTitleHindi(e.target.value)}
                placeholder="उदा: भारत बनाम न्यूज़ीलैंड चौथा टी20I ऑकलैंड टॉस और पिच रिपोर्ट"
                className="w-full px-3.5 py-2 bg-[#FBF9F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  श्रेणी (Category)
                </label>
                <input
                  type="text"
                  value={categoryHindi}
                  onChange={(e) => setCategoryHindi(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FBF9F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  सत्यापित डेटा स्रोत का नाम *
                </label>
                <input
                  type="text"
                  required
                  value={sourceHindi}
                  onChange={(e) => setSourceHindi(e.target.value)}
                  placeholder="BCCI / NZC / ESPNcricinfo"
                  className="w-full px-3.5 py-2 bg-[#FBF9F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                SEO मेटा विवरण (Meta Description – 120 से 160 अक्षर)
              </label>
              <input
                type="text"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="गूगल सर्च के लिए संक्षिप्त और सटीक हिंदी मेटा विवरण..."
                className="w-full px-3.5 py-2 bg-[#FBF9F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                मौलिक हिंदी विवरण और सत्यापित तथ्य (अपने शब्दों में) *
              </label>
              <textarea
                rows={4}
                required
                value={bodyParagraphHindi}
                onChange={(e) => setBodyParagraphHindi(e.target.value)}
                placeholder="यहाँ केवल सत्यापित मैच जानकारी, स्कोर या आधिकारिक टीम अपडेट सरल हिंदी में लिखें..."
                className="w-full px-3.5 py-2 bg-[#FBF9F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            {publishMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-[#14532D] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{publishMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#1E3A8A] hover:bg-[#172E6E] text-white font-medium rounded-lg transition-colors"
            >
              सत्यापित हिंदी लेख प्रकाशित करें
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
