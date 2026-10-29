import React, { useState } from 'react';
import { ArrowRight, Trophy } from 'lucide-react';
import { HINDITECH_EXISTING_ARTICLES, TechGuideArticle, HINDI_CRICKET_ARTICLES } from '../data/hindiArticlesData';
import { HERO_IMAGES, VERIFIED_MATCHES } from '../data/cricketData';
import { SafeImage } from './SafeImage';

interface HomeTechGuideViewProps {
  onNavigate: (path: string) => void;
}

export const HomeTechGuideView: React.FC<HomeTechGuideViewProps> = ({ onNavigate }) => {
  const [selectedTechArticle, setSelectedTechArticle] = useState<TechGuideArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredTechArticles =
    selectedCategory === 'ALL'
      ? HINDITECH_EXISTING_ARTICLES
      : HINDITECH_EXISTING_ARTICLES.filter(
          (a) =>
            a.categoryHindi.includes(selectedCategory) ||
            a.gadgetType === selectedCategory
        );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* 1. Prominent Hero Banner: HindiTech Guide (Smart Gadget Hindi) + IND vs NZ Cricket Hub */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 7 Cols: Existing HindiTech Guide Portal Lead */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="relative h-64 sm:h-72 bg-stone-900 overflow-hidden">
            <SafeImage
              src={HERO_IMAGES.techFeatured}
              fallbackSrc="/images/laptop.svg"
              alt="HindiTech Guide स्मार्ट गैजेट और टेक्नोलॉजी समीक्षा"
              priority={true}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="text-xs text-stone-300">
                HindiTech Guide · स्मार्ट गैजेट, स्मार्टफोन और क्रिकेट लाइव स्ट्रीमिंग हब
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-editorial font-bold leading-snug">
                स्मार्टफोन, स्मार्टवॉच, ईयरबड्स और लाइव क्रिकेट की 100% सत्यापित हिंदी गाइड
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="text-xs text-stone-500">
                फीचर्ड स्मार्ट टीवी गाइड · 26 अक्टूबर 2026 · राहुल शर्मा
              </div>
              <h2 className="mt-1.5 text-xl font-editorial font-bold text-stone-900">
                {HINDITECH_EXISTING_ARTICLES[3].titleHindi}
              </h2>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                {HINDITECH_EXISTING_ARTICLES[3].summaryHindi}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSelectedTechArticle(HINDITECH_EXISTING_ARTICLES[3])}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] hover:underline"
              >
                <span>पूरी स्ट्रीमिंग गाइड पढ़ें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-stone-500">4K / 50fps स्पोर्ट्स मोड सेटिंग्स</span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: India vs New Zealand Cricket Update Spotlight */}
        <div className="lg:col-span-5 bg-stone-950 text-stone-100 border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
              <Trophy className="w-4 h-4" />
              <span>नया विशेष सेक्शन · क्रिकेट न्यूज़</span>
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-editorial font-bold text-white leading-tight">
              भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट
            </h2>

            <p className="mt-3 text-sm text-stone-300 leading-relaxed">
              सत्यापित मैच स्कोरकार्ड, टॉस, दोनों टीमों की आधिकारिक प्लेइंग इलेवन, बल्लेबाजों और गेंदबाजों के आँकड़े, 8 विशेष हिंदी लेख और अक्टूबर–दिसंबर 2026 सीरीज का पूरा शेड्यूल।
            </p>

            {/* Quick Match Previews */}
            <div className="mt-6 space-y-3">
              {VERIFIED_MATCHES.slice(0, 3).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onNavigate(`/cricket/ind-vs-nz/match/${m.slug}`)}
                  className="w-full text-left p-3.5 bg-stone-900 hover:bg-stone-800/90 border border-stone-800 rounded-xl transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>{m.seriesName}</span>
                    <span>{m.dateHindi}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm font-bold text-white">
                    <span>
                      {m.team1} बनाम {m.team2}
                    </span>
                    <span className="font-mono text-xs text-amber-300">{m.team1Score || 'आगामी'}</span>
                  </div>
                  <div className="mt-1 text-xs text-stone-300 truncate">{m.resultHindi}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-800 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/cricket/ind-vs-nz')}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1E3A8A] hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <span>क्रिकेट अपडेट सेक्शन खोलें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal / Expanded View if user clicks a Tech Guide Article */}
      {selectedTechArticle && (
        <section className="mt-8 bg-white border-2 border-[#1E3A8A] rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <span className="text-xs font-semibold text-[#1E3A8A]">{selectedTechArticle.categoryHindi}</span>
            <button
              type="button"
              onClick={() => setSelectedTechArticle(null)}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-1 bg-stone-100 rounded-md"
            >
              बंद करें ✕
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 h-56 sm:h-64 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
              <SafeImage
                src={selectedTechArticle.image}
                fallbackSrc={selectedTechArticle.fallbackImage}
                alt={selectedTechArticle.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7">
              <h2 className="text-xl sm:text-2xl font-editorial font-bold text-stone-900">
                {selectedTechArticle.titleHindi}
              </h2>
              <div className="mt-2 text-xs text-stone-500">
                {selectedTechArticle.authorHindi} · {selectedTechArticle.publishedDateHindi} ·{' '}
                {selectedTechArticle.readTimeHindi}
              </div>
              <p className="mt-3 text-sm text-stone-700 leading-relaxed">
                {selectedTechArticle.summaryHindi}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-stone-800 leading-relaxed">
            {selectedTechArticle.fullContentHindi.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-5 p-4 bg-[#FBF9F5] border border-stone-200 rounded-lg">
            <h3 className="text-sm font-bold text-stone-900 mb-2">मुख्य तकनीकी बिंदु:</h3>
            <ul className="space-y-1.5 text-sm text-stone-700 list-disc list-inside">
              {selectedTechArticle.keyPointsHindi.map((kp, i) => (
                <li key={i}>{kp}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 2. Smart Gadget Hindi: Smartphones, Smartwatches, Earbuds, Smart TV & Laptop Cards */}
      <section className="mt-14 pt-8 border-t border-stone-200">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-900">
              Smart Gadget Hindi – स्मार्ट गैजेट्स और तकनीकी समीक्षा
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              स्मार्टफोन, स्मार्टवॉच, वायरलेस ईयरबड्स, 4K स्मार्ट टीवी और लैपटॉप की प्रामाणिक तस्वीरें और बाइंग गाइड
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'ALL'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              सभी गैजेट ({HINDITECH_EXISTING_ARTICLES.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('smartwatch')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'smartwatch'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              स्मार्टवॉच
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('earbuds')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'earbuds'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ईयरबड्स
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('smartphone')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'smartphone'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              स्मार्टफोन
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('smarttv')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'smarttv'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              स्मार्ट टीवी
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('laptop')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'laptop'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              लैपटॉप
            </button>
          </div>
        </div>

        {/* Gadget Grid with Real Images & Fallback SVGs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechArticles.map((tech) => (
            <article
              key={tech.id}
              className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-stone-400 transition-colors shadow-xs"
            >
              <div>
                {/* Image container with local permanent image + fallback */}
                <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                  <SafeImage
                    src={tech.image}
                    fallbackSrc={tech.fallbackImage}
                    alt={tech.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 text-white text-[11px] font-medium px-2 py-0.5 rounded-sm backdrop-blur-xs">
                    {tech.categoryHindi}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{tech.publishedDateHindi}</span>
                    <span aria-hidden="true">·</span>
                    <span>{tech.readTimeHindi}</span>
                  </div>

                  <h3 className="mt-2 text-base sm:text-lg font-editorial font-bold text-stone-900 leading-snug">
                    {tech.titleHindi}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {tech.summaryHindi}
                  </p>

                  <ul className="mt-3 space-y-1 text-xs text-stone-700">
                    {tech.keyPointsHindi.slice(0, 2).map((pt, idx) => (
                      <li key={idx} className="line-clamp-1">
                        • {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500">{tech.authorHindi}</span>
                <button
                  type="button"
                  onClick={() => setSelectedTechArticle(tech)}
                  className="text-xs font-semibold text-[#1E3A8A] hover:underline"
                >
                  पूरा लेख पढ़ें →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Quick Access to India vs New Zealand Cricket Articles from Home */}
      <section className="mt-14 pt-8 border-t border-stone-200">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-editorial font-bold text-stone-900">
              भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट: 8 प्रमुख हिंदी लेख
            </h2>
            <p className="text-sm text-stone-600 mt-0.5">
              सीधे किसी भी विषय पर क्लिक करके पूरा स्कोरकार्ड, परिणाम, शेड्यूल या आँकड़े पढ़ें
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/cricket/ind-vs-nz')}
            className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-medium rounded-lg hover:bg-[#172E6E] transition-colors"
          >
            क्रिकेट अपडेट मुख्य पेज खोलें →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HINDI_CRICKET_ARTICLES.map((art) => (
            <button
              key={art.slug}
              type="button"
              onClick={() => onNavigate(art.urlPath)}
              className="text-left p-4 bg-white border border-stone-200 rounded-xl hover:border-[#1E3A8A] transition-colors"
            >
              <div className="text-xs text-stone-500">
                0{art.id}. {art.categoryHindi}
              </div>
              <div className="text-sm font-bold text-stone-900 mt-1 line-clamp-2">{art.titleHindi}</div>
              <div className="text-xs text-[#1E3A8A] font-medium mt-2">पढ़ें →</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
