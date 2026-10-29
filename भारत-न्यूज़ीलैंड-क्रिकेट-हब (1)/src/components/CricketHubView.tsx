import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Award,
  Tv,
  FileText,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  VERIFIED_MATCHES,
  VERIFIED_SERIES_LIST,
  COMPLETE_2024_2026_SCHEDULE_TABLE,
  HERO_IMAGES,
} from '../data/cricketData';
import { HindiCricketArticle } from '../data/hindiArticlesData';
import { ManualPublisherAndApiPanel } from './ManualPublisherAndApiPanel';
import { SafeImage } from './SafeImage';

interface LiveApiStatus {
  liveAvailable: boolean;
  providerConfigured: boolean;
  providerName: string;
  lastCheckedHindi: string;
  messageHindi: string;
  nextScheduledMatchHindi: string;
}

interface CricketHubViewProps {
  articles: HindiCricketArticle[];
  liveStatus: LiveApiStatus;
  onRefreshLiveStatus: () => void;
  onPublishCustomArticle: (newArt: HindiCricketArticle) => void;
  onNavigate: (path: string) => void;
}

export const CricketHubView: React.FC<CricketHubViewProps> = ({
  articles,
  liveStatus,
  onRefreshLiveStatus,
  onPublishCustomArticle,
  onNavigate,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'upcoming' | 'live'>('all');
  const [formatFilter, setFormatFilter] = useState<'ALL' | 'Test' | 'ODI' | 'T20I'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = useMemo(() => {
    return VERIFIED_MATCHES.filter((match) => {
      if (statusFilter !== 'all' && match.status !== statusFilter) return false;
      if (formatFilter !== 'ALL' && match.format !== formatFilter) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const haystack = [
          match.seriesName,
          match.matchNumber,
          match.venue,
          match.cityCountry,
          match.dateHindi,
          match.resultHindi,
          match.playerOfTheMatch || '',
          match.summaryHindi,
          ...match.indiaPlayingXI,
          ...match.nzPlayingXI,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      }
      return true;
    });
  }, [statusFilter, formatFilter, searchQuery]);

  const completedMatches = useMemo(
    () => filteredMatches.filter((m) => m.status === 'completed'),
    [filteredMatches]
  );
  const upcomingMatches = useMemo(
    () => filteredMatches.filter((m) => m.status === 'upcoming'),
    [filteredMatches]
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* 1. Editorial Hero Section */}
      <section className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-10 bg-stone-950 text-stone-100">
            <div>
              {/* Unboxed clean metadata line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300">
                <span>HindiTech Guide विशेष कवरेज</span>
                <span aria-hidden="true">·</span>
                <span>स्रोत: BCCI, NZC, ICC एवं ESPNcricinfo</span>
                <span aria-hidden="true">·</span>
                <span>अपडेट: 28 अक्टूबर 2026</span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-white leading-tight tracking-wide">
                भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट
              </h1>

              <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
                भारत और न्यूज़ीलैंड के बीच खेले गए टेस्ट, वनडे और टी20 मुकाबलों का सत्यापित अंतिम स्कोरकार्ड, टॉस परिणाम, दोनों टीमों की आधिकारिक प्लेइंग इलेवन, खिलाड़ियों के आँकड़े और अक्टूबर–दिसंबर 2026 सीरीज का पूरा शेड्यूल सरल हिंदी में।
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/cricket/ind-vs-nz/match/ct-2025-final-dubai')}
                className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                चैंपियंस ट्रॉफी फाइनल स्कोरकार्ड देखें
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/cricket/ind-vs-nz/next-match-schedule-time')}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-100 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                अगला मैच कब और कितने बजे है?
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-stone-900 overflow-hidden">
            <SafeImage
              src={HERO_IMAGES.cricketStadium}
              fallbackSrc="/images/cricket-pitch.jpg"
              alt="भारत बनाम न्यूज़ीलैंड अंतरराष्ट्रीय क्रिकेट स्टेडियम"
              priority={true}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-stone-950 lg:via-black/20 lg:to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-stone-200 bg-black/70 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <div className="font-semibold text-white">अगला निर्धारित मुकाबला: चौथा टी20I (ऑकलैंड)</div>
              <div className="mt-0.5">30 अक्टूबर 2026 · सुबह 11:45 बजे IST · ईडन पार्क, ऑकलैंड</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Honest Live Score & Data Verification Bar */}
      <section className="mt-8 bg-white border border-stone-200 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <Info className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-1" />
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-stone-900">लाइव स्कोर और डेटा पारदर्शिता स्थिति</span>
                <span aria-hidden="true">·</span>
                <span>स्रोत: {liveStatus.providerName}</span>
                <span aria-hidden="true">·</span>
                <span>आखिरी अपडेट: {liveStatus.lastCheckedHindi}</span>
              </div>
              <p className="text-sm font-medium text-stone-800 mt-1">{liveStatus.messageHindi}</p>
              <p className="text-xs text-stone-600 mt-0.5">
                {liveStatus.nextScheduledMatchHindi} (नीति: हम कभी भी नकली लाइव स्कोर या भविष्य के मैचों के पूर्व-अनुमानित परिणाम प्रकाशित नहीं करते।)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onRefreshLiveStatus}
              className="px-4 py-2 text-xs font-medium text-stone-800 bg-[#FBF9F5] border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
            >
              लाइव स्थिति पुनः जाँचें
            </button>
          </div>
        </div>
      </section>

      {/* 3. Search & Filter Toolbar */}
      <section className="mt-10 bg-white border border-stone-200 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="मैच, स्टेडियम (दुबई, बेंगलुरु, पुणे, मुंबई, इंदौर, ऑकलैंड) या खिलाड़ी (रोहित, कोहली, पंत, सैंटनर) खोजें..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#1E3A8A]"
            />
          </div>

          {/* Interactive Status Segmented Control */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  statusFilter === 'all'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                सभी मैच ({VERIFIED_MATCHES.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('completed')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  statusFilter === 'completed'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                पूरे हो चुके मैच
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('upcoming')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  statusFilter === 'upcoming'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                आगामी मैच
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('live')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  statusFilter === 'live'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                लाइव मैच (0)
              </button>
            </div>

            {/* Interactive Format Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
              {(['ALL', 'Test', 'ODI', 'T20I'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormatFilter(fmt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    formatFilter === fmt
                      ? 'bg-[#1E3A8A] text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {fmt === 'ALL' ? 'सभी प्रारूप' : fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Separate Sections for Live, Completed, and Upcoming Matches */}
      {statusFilter === 'live' && (
        <section className="mt-8 bg-white border border-stone-200 rounded-xl p-8 text-center">
          <h2 className="text-xl font-editorial font-bold text-stone-900">
            इस समय कोई भारत बनाम न्यूज़ीलैंड मैच लाइव नहीं चल रहा है
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-xl mx-auto">
            आज (28 अक्टूबर 2026) कोई मैच निर्धारित नहीं है। अगला मुकाबला चौथा टी20I है जो 30 अक्टूबर 2026 को सुबह 11:45 बजे IST से ईडन पार्क, ऑकलैंड में खेला जाएगा।
          </p>
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className="mt-4 px-4 py-2 bg-[#1E3A8A] text-white text-xs font-medium rounded-lg"
          >
            सभी पूरे हो चुके और आगामी मैच देखें
          </button>
        </section>
      )}

      {/* A. Completed Matches Section */}
      {(statusFilter === 'all' || statusFilter === 'completed') && completedMatches.length > 0 && (
        <section className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-2xl font-editorial font-bold text-stone-900">
                पूरे हो चुके मैच (सत्यापित स्कोरकार्ड और परिणाम)
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                चैंपियंस ट्रॉफी 2025 फाइनल, जनवरी 2026 वनडे/टी20I सीरीज और 2024 टेस्ट सीरीज के पूरे हो चुके मुकाबले
              </p>
            </div>
            <span className="text-xs text-stone-500">
              कुल प्रदर्शित मैच: {completedMatches.length}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedMatches.map((match) => (
              <article
                key={match.id}
                className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between hover:border-stone-400 transition-colors"
              >
                <div>
                  {/* Quiet 1-line unboxed metadata kicker */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-[#1E3A8A]">{match.seriesName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{match.format}</span>
                    <span aria-hidden="true">·</span>
                    <span>{match.dateHindi}</span>
                  </div>

                  <h3 className="mt-2 text-lg sm:text-xl font-editorial font-bold text-stone-900">
                    {match.team1} बनाम {match.team2} – {match.matchNumber}
                  </h3>

                  <div className="mt-1.5 text-xs text-stone-500 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {match.venue}, {match.cityCountry}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {match.timeIST}
                    </span>
                  </div>

                  {/* Scores Box */}
                  <div className="mt-4 p-4 bg-[#FBF9F5] border border-stone-200 rounded-lg space-y-2.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-stone-900">{match.team1}</span>
                      <span className="font-bold tabular-score text-stone-900">{match.team1Score}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-t border-stone-200/80 pt-2">
                      <span className="font-bold text-stone-900">{match.team2}</span>
                      <span className="font-bold tabular-score text-stone-900">{match.team2Score}</span>
                    </div>
                  </div>

                  {/* Result & Toss */}
                  <div className="mt-4 space-y-1.5 text-xs sm:text-sm">
                    <p className="font-semibold text-[#14532D]">{match.resultHindi}</p>
                    <p className="text-stone-600">
                      <strong>टॉस:</strong> {match.tossHindi}
                    </p>
                    {match.playerOfTheMatch && (
                      <p className="text-stone-800 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#9A3412] shrink-0" />
                        <span>
                          <strong>मैन ऑफ द मैच:</strong> {match.playerOfTheMatch}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-500">स्रोत: {match.dataSource}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/cricket/ind-vs-nz/match/${match.slug}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1E3A8A] hover:bg-[#172E6E] text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>पूरा स्कोरकार्ड व प्लेइंग XI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* B. Upcoming Matches Section */}
      {(statusFilter === 'all' || statusFilter === 'upcoming') && upcomingMatches.length > 0 && (
        <section className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-2xl font-editorial font-bold text-stone-900">
                आगामी मैच (भारत का न्यूज़ीलैंड दौरा – अक्टूबर से दिसंबर 2026)
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                मैच की तारीख, भारतीय समय (IST), वेन्यू और प्रसारण जानकारी (भविष्य के मैचों का कोई परिणाम पहले से नहीं दिखाया जाता)
              </p>
            </div>
            <span className="text-xs text-stone-500">आगामी प्रमुख कार्ड: {upcomingMatches.length}</span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingMatches.map((match) => (
              <article
                key={match.id}
                className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between hover:border-stone-400 transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-[#9A3412]">आगामी मुकाबला</span>
                    <span aria-hidden="true">·</span>
                    <span>{match.format}</span>
                    <span aria-hidden="true">·</span>
                    <span>{match.seriesName}</span>
                  </div>

                  <h3 className="mt-2 text-lg sm:text-xl font-editorial font-bold text-stone-900">
                    {match.team1} बनाम {match.team2} – {match.matchNumber}
                  </h3>

                  <div className="mt-4 p-4 bg-[#FBF9F5] border border-stone-200 rounded-lg space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-stone-800">
                      <Calendar className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                      <span>
                        <strong>तारीख:</strong> {match.dateHindi}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-800">
                      <Clock className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                      <span>
                        <strong>भारतीय समय:</strong> {match.timeIST}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-800">
                      <MapPin className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                      <span>
                        <strong>वेन्यू:</strong> {match.venue}, {match.cityCountry}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {match.summaryHindi}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-500">टॉस व प्लेइंग XI मैच के दिन घोषित होगी</span>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/cricket/ind-vs-nz/match/${match.slug}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>मैच समय व प्रसारण देखें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 5. All 8 Dedicated Hindi Articles Section */}
      <section className="mt-14 pt-10 border-t border-stone-200">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-900">
              भारत बनाम न्यूज़ीलैंड विशेष हिंदी क्रिकेट लेख (सभी 8 विषय)
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              हर विषय के लिए अलग साफ URL, सही तारीख, SEO मेटा विवरण और संबंधित लेखों के आंतरिक लिंक
            </p>
          </div>
          <span className="text-xs text-stone-500">कुल प्रकाशित लेख: {articles.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {articles.map((art, index) => (
            <article
              key={art.slug}
              className="bg-white border border-stone-200 rounded-xl p-5 flex flex-col justify-between hover:border-[#1E3A8A] transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-mono font-bold text-[#1E3A8A]">
                    0{index + 1}.
                  </span>
                  <span>{art.categoryHindi}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.publishedDateHindi}</span>
                </div>

                <h3 className="mt-2.5 text-base font-editorial font-bold text-stone-900 leading-snug">
                  {art.titleHindi}
                </h3>

                <p className="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {art.seoMetaDescription}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-400 truncate max-w-[150px]">
                  {art.urlPath}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate(art.urlPath)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>पूरा लेख पढ़ें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Complete Series Schedule & Historical Results Table */}
      <section className="mt-14 pt-10 border-t border-stone-200">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-900">
              भारत बनाम न्यूज़ीलैंड सीरीज का पूरा शेड्यूल और उपलब्ध परिणाम (2024 – 2026)
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              2024 टेस्ट सीरीज, चैंपियंस ट्रॉफी 2025 फाइनल, जनवरी 2026 सीरीज और अक्टूबर–दिसंबर 2026 न्यूज़ीलैंड दौरे की पूरी तालिका
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/cricket/ind-vs-nz/full-series-schedule')}
            className="text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0"
          >
            शेड्यूल का समर्पित लेख पेज खोलें →
          </button>
        </div>

        {/* Series Summary Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {VERIFIED_SERIES_LIST.map((series) => (
            <div key={series.id} className="bg-white border border-stone-200 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{series.timeframeHindi}</span>
                <span>मेजबान: {series.hostCountry}</span>
              </div>
              <h3 className="text-base sm:text-lg font-editorial font-bold text-stone-900">
                {series.titleHindi}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#14532D]">
                परिणाम / स्थिति: {series.resultSummaryHindi}
              </p>
              <div className="pt-2 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                <div>
                  <strong>प्लेयर ऑफ द सीरीज:</strong> {series.playerOfTheSeriesHindi}
                </div>
                <div>
                  <strong>शीर्ष बल्लेबाज:</strong> {series.topRunScorerHindi}
                </div>
                <div>
                  <strong>शीर्ष गेंदबाज:</strong> {series.topWicketTakerHindi}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Schedule Table */}
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 text-xs text-stone-600">
                  <th className="py-3.5 px-4 font-semibold">मैच / श्रृंखला</th>
                  <th className="py-3.5 px-4 font-semibold">प्रारूप</th>
                  <th className="py-3.5 px-4 font-semibold">तारीख</th>
                  <th className="py-3.5 px-4 font-semibold">भारतीय समय (IST)</th>
                  <th className="py-3.5 px-4 font-semibold">स्टेडियम और शहर</th>
                  <th className="py-3.5 px-4 font-semibold">सत्यापित परिणाम / स्थिति</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/70">
                {COMPLETE_2024_2026_SCHEDULE_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80">
                    <td className="py-3 px-4 font-semibold text-stone-900">{row.matchNo}</td>
                    <td className="py-3 px-4 font-mono text-xs text-stone-700">{row.format}</td>
                    <td className="py-3 px-4 text-stone-700 whitespace-nowrap">{row.dateHindi}</td>
                    <td className="py-3 px-4 tabular-score text-stone-700 whitespace-nowrap">{row.timeIST}</td>
                    <td className="py-3 px-4 text-stone-700">{row.venueHindi}</td>
                    <td className="py-3 px-4 text-stone-800 font-medium">{row.verifiedResultHindi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Official Broadcast & Copyright Integrity Section */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-editorial font-bold text-stone-900 flex items-center gap-2">
            <Tv className="w-5 h-5 text-[#1E3A8A]" />
            <span>आधिकारिक प्रसारण और लाइव स्ट्रीमिंग जानकारी (सत्यापित)</span>
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            भारत बनाम न्यूज़ीलैंड क्रिकेट मैचों का आधिकारिक प्रसारण मेजबान क्रिकेट बोर्ड और टूर्नामेंट अधिकारों के आधार पर निर्धारित होता है:
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-[#FBF9F5] border border-stone-200 rounded-lg">
              <div className="font-bold text-stone-900">1. भारत में आयोजित मैच और ICC टूर्नामेंट</div>
              <p className="text-xs text-stone-600 mt-1">
                <strong>टीवी चैनल:</strong> स्टार स्पोर्ट्स नेटवर्क और स्पोर्ट्स18 (हिंदी, अंग्रेजी व क्षेत्रीय भाषाएँ)
              </p>
              <p className="text-xs text-stone-600 mt-1">
                <strong>लाइव स्ट्रीमिंग:</strong> जियोहॉटस्टार (JioHotstar) ऐप और वेबसाइट
              </p>
            </div>
            <div className="p-4 bg-[#FBF9F5] border border-stone-200 rounded-lg">
              <div className="font-bold text-stone-900">2. न्यूज़ीलैंड में आयोजित मैच (NZC होस्ट)</div>
              <p className="text-xs text-stone-600 mt-1">
                <strong>टीवी चैनल:</strong> सोनी स्पोर्ट्स नेटवर्क (Sony Sports Ten 1, Ten 3 Hindi, Ten 5) और डीडी स्पोर्ट्स
              </p>
              <p className="text-xs text-stone-600 mt-1">
                <strong>लाइव स्ट्रीमिंग:</strong> सोनी लिव (SonyLIV) / अमेज़न प्राइम वीडियो
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-editorial font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#14532D]" />
              <span>कॉपीराइट, विश्वसनीयता और वीडियो नीति</span>
            </h2>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <li>• सभी लेख और मैच सारांश मौलिक हिंदी में अपने शब्दों में लिखे गए हैं।</li>
              <li>
                • कॉपीराइट नियमों के तहत बिना आधिकारिक प्रसारण लाइसेंस के किसी भी मैच हाइलाइट्स का अनधिकृत वीडियो एम्बेड नहीं किया गया है।
              </li>
              <li>
                • आधिकारिक वीडियो हाइलाइट्स के लिए दर्शक केवल BCCI.tv, ICC-Cricket.com या NZC के आधिकारिक प्लेटफॉर्म का ही उपयोग करें।
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
            <span className="text-stone-500">SEO साइटमैप: /sitemap.xml</span>
            <button
              type="button"
              onClick={() => onNavigate('/deploy-guide')}
              className="font-semibold text-[#1E3A8A] hover:underline"
            >
              ZIP डाउनलोड और Netlify निर्देश →
            </button>
          </div>
        </div>
      </section>

      {/* 8. Live API Configuration & Manual Verified Article Publisher */}
      <ManualPublisherAndApiPanel
        liveStatus={liveStatus}
        onRefreshLiveStatus={onRefreshLiveStatus}
        onPublishCustomArticle={onPublishCustomArticle}
        onNavigate={onNavigate}
      />
    </div>
  );
};
