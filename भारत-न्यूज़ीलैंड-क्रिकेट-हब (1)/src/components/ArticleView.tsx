import React from 'react';
import { ArrowLeft, Calendar, CheckCircle2, ExternalLink, FileText, Globe } from 'lucide-react';
import { HindiCricketArticle, HINDI_CRICKET_ARTICLES } from '../data/hindiArticlesData';
import { VERIFIED_MATCHES } from '../data/cricketData';
import { SafeImage } from './SafeImage';

interface ArticleViewProps {
  article: HindiCricketArticle;
  allArticles: HindiCricketArticle[];
  onNavigate: (path: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, allArticles, onNavigate }) => {
  const relatedArticles = allArticles.filter((a) => article.relatedArticleSlugs.includes(a.slug));
  const relatedMatches = VERIFIED_MATCHES.filter((m) => article.relatedMatchSlugs.includes(m.slug));

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <button
          type="button"
          onClick={() => onNavigate('/cricket/ind-vs-nz')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट मुख्य पृष्ठ</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>{article.categoryHindi}</span>
          <span aria-hidden="true">·</span>
          <span>सत्यापन: {article.lastVerifiedHindi}</span>
        </div>
      </div>

      {/* Quick Switcher for All 8 Required Hindi Articles */}
      <div className="mt-6 bg-white border border-stone-200 rounded-xl p-4">
        <div className="text-xs font-semibold text-stone-500 mb-2.5">
          सभी 8 विशेष हिंदी क्रिकेट लेख (सीधे पढ़ें):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {HINDI_CRICKET_ARTICLES.map((item) => {
            const isCurrent = item.slug === article.slug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => onNavigate(item.urlPath)}
                className={`text-left px-3 py-2 rounded-lg text-xs transition-colors border ${
                  isCurrent
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] font-semibold'
                    : 'bg-[#FBF9F5] text-stone-800 border-stone-200 hover:border-stone-400'
                }`}
              >
                <span className="font-mono mr-1.5">0{item.id}.</span>
                <span>{item.categoryHindi}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Editorial Layout (70% Main Article / 30% Margin Sidebar) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left/Center Main Editorial Column */}
        <article className="lg:col-span-8 bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-[#1E3A8A]">{article.categoryHindi}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              प्रकाशित: {article.publishedDateHindi}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeHindi}</span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-4xl font-editorial font-bold text-stone-900 leading-tight">
            {article.titleHindi}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            {article.subtitleHindi}
          </p>

          {/* Editorial Verified Pitch / Stadium Image Banner */}
          <div className="mt-6 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
            <div className="h-60 sm:h-72 w-full overflow-hidden">
              <SafeImage
                src="/images/cricket-pitch.jpg"
                fallbackSrc="/images/cricket-stadium.jpg"
                alt={article.titleHindi}
                priority={true}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 italic">
              सत्यापित मैच पिच और बॉल विश्लेषण · स्रोत: {article.dataSourceHindi}
            </div>
          </div>

          {/* Author & Source Attribution Strip */}
          <div className="mt-6 py-4 border-y border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
            <div>
              <span className="font-semibold text-stone-900">{article.authorHindi}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>मौलिक हिंदी संपादकीय लेख</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#14532D] font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>डेटा स्रोत: {article.dataSourceHindi}</span>
            </div>
          </div>

          {/* Article Sections */}
          <div className="mt-8 space-y-8">
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-editorial font-bold text-stone-900">
                  {section.headingHindi}
                </h2>

                {section.paragraphsHindi.map((para, pIdx) => (
                  <p key={pIdx} className="text-base text-stone-800 leading-relaxed max-w-[72ch]">
                    {para}
                  </p>
                ))}

                {section.bulletPointsHindi && section.bulletPointsHindi.length > 0 && (
                  <ul className="space-y-2.5 pt-2 text-sm sm:text-base text-stone-800">
                    {section.bulletPointsHindi.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#1E3A8A] mt-1.5">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.tableData && (
                  <div className="mt-4 border border-stone-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-stone-100 border-b border-stone-200 text-xs text-stone-600">
                            {section.tableData.headers.map((header, hIdx) => (
                              <th key={hIdx} className="py-3 px-4 font-semibold">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200/80">
                          {section.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-stone-50/80">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`py-3 px-4 ${
                                    cIdx === 0 ? 'font-semibold text-stone-900' : 'text-stone-700'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Editorial Authenticity & Copyright Notice */}
          <div className="mt-10 pt-6 border-t border-stone-200 text-xs text-stone-500 space-y-1.5">
            <p className="font-semibold text-stone-700">
              कॉपीराइट, विश्वसनीयता और संपादकीय पारदर्शिता सूचना:
            </p>
            <p>
              यह लेख HindiTech Guide की संपादकीय टीम द्वारा मौलिक और सरल हिंदी में लिखा गया है। किसी भी अन्य समाचार पोर्टल के लेख या बिना अनुमति के मीडिया (फोटो/वीडियो) की नकल नहीं की गई है। सभी क्रिकेट आँकड़े आधिकारिक स्रोतों ({article.dataSourceHindi}) से सत्यापित हैं।
            </p>
          </div>
        </article>

        {/* Right Margin Sidebar (SEO Meta Details, Related Articles & Match Scorecards) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* SEO Metadata Verification Card */}
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 pb-3 border-b border-stone-200">
              <Globe className="w-4 h-4 text-[#1E3A8A]" />
              <span>Google SEO एवं मेटा विवरण (सक्रिय)</span>
            </h3>
            <dl className="mt-3 space-y-3 text-xs">
              <div>
                <dt className="text-stone-500">साफ URL (Clean Canonical URL):</dt>
                <dd className="font-mono text-[#1E3A8A] break-all mt-0.5">{article.urlPath}</dd>
              </div>
              <div>
                <dt className="text-stone-500">मेटा टाइटल (Meta Title):</dt>
                <dd className="font-medium text-stone-900 mt-0.5">{article.seoMetaTitle}</dd>
              </div>
              <div>
                <dt className="text-stone-500">मेटा विवरण (Meta Description):</dt>
                <dd className="text-stone-700 mt-0.5 leading-relaxed">{article.seoMetaDescription}</dd>
              </div>
              <div>
                <dt className="text-stone-500">संरचित डेटा (Schema.org JSON-LD):</dt>
                <dd className="text-[#14532D] font-medium mt-0.5">
                  NewsArticle Schema (hi-IN) सक्रिय · Sitemap.xml में शामिल
                </dd>
              </div>
            </dl>
          </div>

          {/* Related Hindi Articles */}
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <h3 className="text-base font-editorial font-bold text-stone-900 flex items-center gap-2 pb-3 border-b border-stone-200">
              <FileText className="w-4 h-4 text-[#1E3A8A]" />
              <span>संबंधित हिंदी क्रिकेट लेख</span>
            </h3>
            <div className="mt-4 space-y-3">
              {relatedArticles.map((rel) => (
                <button
                  key={rel.slug}
                  type="button"
                  onClick={() => onNavigate(rel.urlPath)}
                  className="w-full text-left p-3.5 bg-[#FBF9F5] border border-stone-200 rounded-lg hover:border-[#1E3A8A] transition-colors"
                >
                  <div className="text-xs text-stone-500">
                    {rel.categoryHindi} · {rel.publishedDateHindi}
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-1">{rel.titleHindi}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Related Match Scorecards */}
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <h3 className="text-base font-editorial font-bold text-stone-900 pb-3 border-b border-stone-200">
              संबंधित मैचों के पूर्ण स्कोरकार्ड
            </h3>
            <div className="mt-4 space-y-3">
              {relatedMatches.map((m) => (
                <button
                  key={m.slug}
                  type="button"
                  onClick={() => onNavigate(`/cricket/ind-vs-nz/match/${m.slug}`)}
                  className="w-full text-left p-3.5 bg-[#FBF9F5] border border-stone-200 rounded-lg hover:border-[#1E3A8A] transition-colors"
                >
                  <div className="text-xs text-stone-500">
                    {m.dateHindi} · {m.venue}
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    {m.team1} बनाम {m.team2} ({m.matchNumber})
                  </div>
                  <div className="text-xs text-[#1E3A8A] mt-1 inline-flex items-center gap-1">
                    <span>पूरा स्कोरकार्ड देखें</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
