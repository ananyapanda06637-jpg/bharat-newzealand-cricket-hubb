import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Tv, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { CricketMatch, VERIFIED_MATCHES } from '../data/cricketData';
import { HINDI_CRICKET_ARTICLES } from '../data/hindiArticlesData';
import { SafeImage } from './SafeImage';

interface ScorecardViewProps {
  match: CricketMatch;
  onNavigate: (path: string) => void;
}

export const ScorecardView: React.FC<ScorecardViewProps> = ({ match, onNavigate }) => {
  const [activeInningsIndex, setActiveInningsIndex] = useState(0);

  const otherMatches = VERIFIED_MATCHES.filter((m) => m.id !== match.id).slice(0, 4);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb & Back navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <button
          type="button"
          onClick={() => onNavigate('/cricket/ind-vs-nz')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट पर वापस जाएँ</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>स्रोत: {match.dataSource}</span>
          <span aria-hidden="true">·</span>
          <span>अंतिम सत्यापन: {match.lastUpdatedHindi}</span>
        </div>
      </div>

      {/* Match Header Banner */}
      <section className="mt-8 bg-white border border-stone-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-3">
          <span className="font-semibold text-[#1E3A8A]">{match.seriesName}</span>
          <span aria-hidden="true">·</span>
          <span>{match.matchNumber}</span>
          <span aria-hidden="true">·</span>
          <span>प्रारूप: {match.format}</span>
          <span aria-hidden="true">·</span>
          <span>
            स्थिति:{' '}
            {match.status === 'completed'
              ? 'सम्पन्न (सत्यापित परिणाम)'
              : match.status === 'live'
              ? 'लाइव'
              : 'आगामी मुकाबला'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-editorial font-bold text-stone-900 leading-tight">
          {match.team1} बनाम {match.team2} – {match.matchNumber}
        </h1>

        {/* Key Metadata Row */}
        <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-stone-600">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-stone-400" />
            <span>तारीख: {match.dateHindi}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-stone-400" />
            <span>भारतीय समय: {match.timeIST}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-stone-400" />
            <span>
              वेन्यू: {match.venue}, {match.cityCountry}
            </span>
          </span>
        </div>

        {/* Venue / Stadium Image Strip */}
        <div className="mt-5 h-44 sm:h-56 rounded-xl overflow-hidden bg-stone-900 relative">
          <SafeImage
            src="/images/cricket-stadium.jpg"
            fallbackSrc="/images/cricket-pitch.jpg"
            alt={`${match.venue} क्रिकेट स्टेडियम`}
            priority={true}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 text-xs text-stone-200">
            आधिकारिक वेन्यू: {match.venue} ({match.cityCountry})
          </div>
        </div>

        {/* Team Scores Box */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-stone-200">
          <div className="p-5 bg-[#FBF9F5] border border-stone-200 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500">टीम 1</p>
              <p className="text-lg font-bold text-stone-900 mt-0.5">{match.team1}</p>
            </div>
            <div className="text-right">
              <p className="text-xl sm:text-2xl font-bold tabular-score text-stone-900">
                {match.team1Score || 'मैच शुरू होने की प्रतीक्षा'}
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#FBF9F5] border border-stone-200 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500">टीम 2</p>
              <p className="text-lg font-bold text-stone-900 mt-0.5">{match.team2}</p>
            </div>
            <div className="text-right">
              <p className="text-xl sm:text-2xl font-bold tabular-score text-stone-900">
                {match.team2Score || 'मैच शुरू होने की प्रतीक्षा'}
              </p>
            </div>
          </div>
        </div>

        {/* Toss, Result & Player of the Match Summary */}
        <div className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-xs text-stone-500 font-medium">टॉस का परिणाम</p>
            <p className="text-stone-900 font-medium mt-1">{match.tossHindi}</p>
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">मैच परिणाम और सीरीज स्थिति</p>
            <p className="text-[#14532D] font-semibold mt-1">{match.resultHindi}</p>
            <p className="text-xs text-stone-600 mt-1">{match.seriesResultStatus}</p>
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">मैन ऑफ द मैच (Player of the Match)</p>
            <p className="text-stone-900 font-semibold mt-1 flex items-start gap-1.5">
              <Award className="w-4 h-4 text-[#9A3412] shrink-0 mt-1" />
              <span>{match.playerOfTheMatch || 'मैच समाप्त होने के बाद आधिकारिक रूप से घोषित होगा'}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Full Batting & Bowling Scorecard Section */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-editorial font-bold text-stone-900">
              विस्तृत स्कोरकार्ड (बल्लेबाजी और गेंदबाजी आँकड़े)
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              बल्लेबाजों के रन, गेंदें, चौके-छक्के और गेंदबाजों के ओवर, मेडन, रन तथा विकेट
            </p>
          </div>

          {match.scorecards.length > 1 && (
            <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg">
              {match.scorecards.map((sc, idx) => (
                <button
                  key={sc.inningsTitle}
                  type="button"
                  onClick={() => setActiveInningsIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeInningsIndex === idx
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {sc.team}
                </button>
              ))}
            </div>
          )}
        </div>

        {match.scorecards.length > 0 ? (
          <div className="space-y-8">
            {match.scorecards.map((innings, idx) => {
              const isVisible = idx === activeInningsIndex || match.scorecards.length <= 2;
              if (!isVisible) return null;

              return (
                <div key={innings.inningsTitle} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-stone-100/80 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-stone-900">{innings.inningsTitle}</h3>
                    <div className="text-sm font-semibold tabular-score text-stone-900">
                      कुल स्कोर: {innings.totalScore} ({innings.overs}) · अतिरिक्त: {innings.extras}
                    </div>
                  </div>

                  {/* Batting Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-stone-200 text-xs text-stone-500 bg-[#FBF9F5]">
                          <th className="py-3 px-4 sm:px-6 font-semibold">बल्लेबाज</th>
                          <th className="py-3 px-4 font-semibold">आउट होने का विवरण</th>
                          <th className="py-3 px-4 text-right font-semibold">रन (R)</th>
                          <th className="py-3 px-4 text-right font-semibold">गेंदें (B)</th>
                          <th className="py-3 px-4 text-right font-semibold">चौके (4s)</th>
                          <th className="py-3 px-4 text-right font-semibold">छक्के (6s)</th>
                          <th className="py-3 px-4 sm:px-6 text-right font-semibold">स्ट्राइक रेट (SR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200/70">
                        {innings.batters.map((batter) => (
                          <tr key={batter.name} className="hover:bg-stone-50/80">
                            <td className="py-3 px-4 sm:px-6 font-semibold text-stone-900">{batter.name}</td>
                            <td className="py-3 px-4 text-stone-600">{batter.dismissal}</td>
                            <td className="py-3 px-4 text-right font-bold tabular-score text-stone-900">
                              {batter.runs}
                            </td>
                            <td className="py-3 px-4 text-right tabular-score text-stone-700">{batter.balls}</td>
                            <td className="py-3 px-4 text-right tabular-score text-stone-700">{batter.fours}</td>
                            <td className="py-3 px-4 text-right tabular-score text-stone-700">{batter.sixes}</td>
                            <td className="py-3 px-4 sm:px-6 text-right tabular-score text-stone-700">
                              {batter.strikeRate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Bowling Table */}
                  <div className="border-t border-stone-200">
                    <div className="px-6 py-2.5 bg-stone-50 border-b border-stone-200 text-xs font-semibold text-stone-600">
                      गेंदबाजी आँकड़े (विपक्षी टीम)
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 text-xs text-stone-500 bg-[#FBF9F5]">
                            <th className="py-3 px-4 sm:px-6 font-semibold">गेंदबाज</th>
                            <th className="py-3 px-4 text-right font-semibold">ओवर (O)</th>
                            <th className="py-3 px-4 text-right font-semibold">मेडन (M)</th>
                            <th className="py-3 px-4 text-right font-semibold">रन (R)</th>
                            <th className="py-3 px-4 text-right font-semibold">विकेट (W)</th>
                            <th className="py-3 px-4 sm:px-6 text-right font-semibold">इकॉनमी (ECON)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200/70">
                          {innings.bowlers.map((bowler) => (
                            <tr key={bowler.name} className="hover:bg-stone-50/80">
                              <td className="py-3 px-4 sm:px-6 font-semibold text-stone-900">{bowler.name}</td>
                              <td className="py-3 px-4 text-right tabular-score text-stone-700">{bowler.overs}</td>
                              <td className="py-3 px-4 text-right tabular-score text-stone-700">{bowler.maidens}</td>
                              <td className="py-3 px-4 text-right tabular-score text-stone-700">{bowler.runs}</td>
                              <td className="py-3 px-4 text-right font-bold tabular-score text-[#1E3A8A]">
                                {bowler.wickets}
                              </td>
                              <td className="py-3 px-4 sm:px-6 text-right tabular-score text-stone-700">
                                {bowler.economy}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#9A3412] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  यह आगामी मुकाबला है — स्कोरकार्ड अभी उपलब्ध नहीं है
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  यह मैच <strong>{match.dateHindi}</strong> को <strong>{match.timeIST}</strong> पर{' '}
                  <strong>{match.venue}</strong> में शुरू होगा। हमारी संपादकीय नीति के अनुसार भविष्य के मैचों के लिए कोई भी काल्पनिक या नकली स्कोरकार्ड नहीं दिखाया जाता। मैच शुरू होने के बाद ही सत्यापित डेटा प्रदर्शित होगा।
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Hindi Summary, Key Moments & Playing XI */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Match Summary & Turning Points */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-editorial font-bold text-stone-900">
              मैच का हिंदी में सारांश और मुख्य घटनाएँ
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">{match.summaryHindi}</p>
          </div>

          <div className="pt-6 border-t border-stone-200">
            <h3 className="text-base font-bold text-stone-900 mb-3">मुख्य पल और टर्निंग पॉइंट्स</h3>
            <ul className="space-y-2.5 text-sm text-stone-700">
              {match.keyMomentsHindi.map((moment, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A] mt-1">0{i + 1}.</span>
                  <span>{moment}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-stone-200">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#1E3A8A]" />
              <span>आधिकारिक प्रसारण और लाइव स्ट्रीमिंग जानकारी</span>
            </h3>
            <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 bg-[#FBF9F5] border border-stone-200 rounded-lg">
                <dt className="text-xs text-stone-500">टीवी चैनल (TV Broadcast)</dt>
                <dd className="font-semibold text-stone-900 mt-1">{match.broadcastInfoHindi.tvChannels}</dd>
              </div>
              <div className="p-3.5 bg-[#FBF9F5] border border-stone-200 rounded-lg">
                <dt className="text-xs text-stone-500">लाइव स्ट्रीमिंग (OTT / Mobile)</dt>
                <dd className="font-semibold text-stone-900 mt-1">{match.broadcastInfoHindi.liveStreaming}</dd>
              </div>
            </dl>
            <p className="text-xs text-stone-500 mt-2">{match.broadcastInfoHindi.verificationNote}</p>
          </div>
        </div>

        {/* Right 5 cols: Official Playing XI */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-stone-200">
            <h2 className="text-xl font-editorial font-bold text-stone-900">दोनों टीमों की प्लेइंग इलेवन</h2>
            <span className="text-xs font-medium text-stone-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#14532D]" />
              {match.playingXIStatus === 'declared' ? 'आधिकारिक घोषित' : 'टॉस पर घोषित होगी'}
            </span>
          </div>

          <div className="mt-5 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-200">
                भारत (IND) प्लेइंग इलेवन / स्क्वाड
              </h3>
              <ol className="mt-3 space-y-1.5 text-sm text-stone-700 list-decimal list-inside">
                {match.indiaPlayingXI.map((player) => (
                  <li key={player} className="py-0.5">
                    {player}
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-200">
                न्यूज़ीलैंड (NZ) प्लेइंग इलेवन / स्क्वाड
              </h3>
              <ol className="mt-3 space-y-1.5 text-sm text-stone-700 list-decimal list-inside">
                {match.nzPlayingXI.map((player) => (
                  <li key={player} className="py-0.5">
                    {player}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links to Related Matches & Hindi Articles */}
      <section className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-editorial font-bold text-stone-900 mb-4">
            अन्य भारत बनाम न्यूज़ीलैंड मैच और स्कोरकार्ड
          </h3>
          <div className="space-y-3">
            {otherMatches.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onNavigate(`/cricket/ind-vs-nz/match/${m.slug}`)}
                className="w-full text-left p-4 bg-white border border-stone-200 rounded-lg hover:border-[#1E3A8A] transition-colors"
              >
                <div className="text-xs text-stone-500">
                  {m.dateHindi} · {m.venue}
                </div>
                <div className="text-sm font-bold text-stone-900 mt-1">
                  {m.team1} बनाम {m.team2} – {m.matchNumber}
                </div>
                <div className="text-xs text-[#1E3A8A] mt-1">{m.resultHindi}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-editorial font-bold text-stone-900 mb-4">
            संबंधित हिंदी क्रिकेट लेख (SEO सत्यापित)
          </h3>
          <div className="space-y-3">
            {HINDI_CRICKET_ARTICLES.slice(0, 4).map((art) => (
              <button
                key={art.slug}
                type="button"
                onClick={() => onNavigate(art.urlPath)}
                className="w-full text-left p-4 bg-white border border-stone-200 rounded-lg hover:border-[#1E3A8A] transition-colors"
              >
                <div className="text-xs text-stone-500">
                  {art.categoryHindi} · {art.publishedDateHindi}
                </div>
                <div className="text-sm font-bold text-stone-900 mt-1">{art.titleHindi}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
