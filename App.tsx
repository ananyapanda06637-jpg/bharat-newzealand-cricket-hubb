/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CricketHubView } from './components/CricketHubView';
import { HomeTechGuideView } from './components/HomeTechGuideView';
import { ArticleView } from './components/ArticleView';
import { ScorecardView } from './components/ScorecardView';
import { DeployAndZipGuide } from './components/DeployAndZipGuide';
import { HINDI_CRICKET_ARTICLES, HindiCricketArticle } from './data/hindiArticlesData';
import { VERIFIED_MATCHES } from './data/cricketData';
import { updatePageSEO } from './utils/seoManager';

interface LiveApiStatus {
  liveAvailable: boolean;
  providerConfigured: boolean;
  providerName: string;
  lastCheckedHindi: string;
  messageHindi: string;
  nextScheduledMatchHindi: string;
}

const DEFAULT_LIVE_STATUS: LiveApiStatus = {
  liveAvailable: false,
  providerConfigured: false,
  providerName: 'BCCI / NZC / ICC एवं ESPNcricinfo आधिकारिक अभिलेख',
  lastCheckedHindi: '28 अक्टूबर 2026, भारतीय समयानुसार',
  messageHindi:
    'इस समय कोई भी भारत बनाम न्यूज़ीलैंड क्रिकेट मैच लाइव नहीं चल रहा है और बाहरी लाइव स्कोर स्ट्रीम उपलब्ध नहीं है।',
  nextScheduledMatchHindi:
    'अगला निर्धारित मुकाबला: भारत बनाम न्यूज़ीलैंड चौथा टी20I – 30 अक्टूबर 2026, सुबह 11:45 बजे IST (ईडन पार्क, ऑकलैंड)।',
};

export default function App() {
  // Default initial route to the new India vs New Zealand Cricket Update hub if at root or preserve current URL path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p && p !== '/' && p !== '/index.html') {
        return p;
      }
    }
    return '/cricket/ind-vs-nz';
  });

  const [articles, setArticles] = useState<HindiCricketArticle[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('hinditech_custom_cricket_articles');
        if (saved) {
          const parsed = JSON.parse(saved) as HindiCricketArticle[];
          return [...HINDI_CRICKET_ARTICLES, ...parsed];
        }
      } catch {
        // ignore storage errors
      }
    }
    return HINDI_CRICKET_ARTICLES;
  });

  const [liveStatus, setLiveStatus] = useState<LiveApiStatus>(DEFAULT_LIVE_STATUS);

  const fetchLiveStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/cricket/live-status');
      if (res.ok) {
        const data = (await res.json()) as LiveApiStatus;
        setLiveStatus(data);
      }
    } catch {
      // Static Netlify fallback
      const nowStr = new Date().toLocaleTimeString('hi-IN', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setLiveStatus((prev) => ({
        ...prev,
        lastCheckedHindi: `28 अक्टूबर 2026 (${nowStr} IST)`,
      }));
    }
  }, []);

  useEffect(() => {
    fetchLiveStatus();
  }, [fetchLiveStatus]);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/cricket/ind-vs-nz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((newPath: string) => {
    setCurrentPath(newPath);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', newPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handlePublishCustomArticle = useCallback(
    (newArt: HindiCricketArticle) => {
      setArticles((prev) => {
        const updated = [...prev, newArt];
        try {
          const customOnly = updated.filter(
            (a) => !HINDI_CRICKET_ARTICLES.some((base) => base.slug === a.slug)
          );
          localStorage.setItem('hinditech_custom_cricket_articles', JSON.stringify(customOnly));
        } catch {
          // ignore storage error
        }
        return updated;
      });
      // Also post to backend API if running
      fetch('/api/cricket/manual-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArt),
      }).catch(() => {});

      handleNavigate(newArt.urlPath);
    },
    [handleNavigate]
  );

  // Dynamic SEO and Schema.org updates per route
  useEffect(() => {
    if (currentPath === '/') {
      updatePageSEO({
        title: 'HindiTech Guide – सरल हिंदी टेक गाइड और भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट',
        description:
          'HindiTech Guide पर पढ़ें स्मार्टफोन रिव्यू, साइबर सुरक्षा, स्मार्ट टीवी स्ट्रीमिंग टिप्स और भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट।',
        canonicalPath: '/',
        schemaType: 'WebSite',
      });
      return;
    }

    if (currentPath === '/deploy-guide') {
      updatePageSEO({
        title: 'प्रोजेक्ट ZIP डाउनलोड और Netlify डिप्लॉयमेंट गाइड | HindiTech Guide',
        description:
          'भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट और HindiTech Guide प्रोजेक्ट की ZIP फाइल डाउनलोड करें और Netlify पर deploy करने के सरल हिंदी निर्देश पढ़ें।',
        canonicalPath: '/deploy-guide',
        schemaType: 'CollectionPage',
      });
      return;
    }

    if (currentPath.startsWith('/cricket/ind-vs-nz/match/')) {
      const matchSlug = currentPath.replace('/cricket/ind-vs-nz/match/', '');
      const foundMatch = VERIFIED_MATCHES.find((m) => m.slug === matchSlug);
      if (foundMatch) {
        updatePageSEO({
          title: foundMatch.seoTitle,
          description: foundMatch.seoDescription,
          canonicalPath: currentPath,
          schemaType: 'SportsEvent',
          schemaData: {
            startDate: foundMatch.isoDate,
            location: {
              '@type': 'Place',
              name: foundMatch.venue,
              address: foundMatch.cityCountry,
            },
            competitor: [
              { '@type': 'SportsTeam', name: foundMatch.team1 },
              { '@type': 'SportsTeam', name: foundMatch.team2 },
            ],
          },
        });
        return;
      }
    }

    if (currentPath.startsWith('/cricket/ind-vs-nz/')) {
      const artSlug = currentPath.replace('/cricket/ind-vs-nz/', '');
      const foundArticle = articles.find((a) => a.slug === artSlug);
      if (foundArticle) {
        updatePageSEO({
          title: foundArticle.seoMetaTitle,
          description: foundArticle.seoMetaDescription,
          canonicalPath: foundArticle.urlPath,
          schemaType: 'NewsArticle',
          schemaData: {
            datePublished: foundArticle.isoPublishedDate,
            dateModified: '2026-10-28',
            author: {
              '@type': 'Organization',
              name: foundArticle.authorHindi,
            },
          },
        });
        return;
      }
    }

    // Default Cricket Hub SEO
    updatePageSEO({
      title: 'भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट – शेड्यूल, स्कोरकार्ड, परिणाम और प्लेइंग 11 | HindiTech Guide',
      description:
        'भारत बनाम न्यूज़ीलैंड क्रिकेट सीरीज का पूरा शेड्यूल, सत्यापित स्कोरकार्ड, मैच परिणाम, टॉस, दोनों टीमों की प्लेइंग इलेवन और 8 विशेष हिंदी लेख।',
      canonicalPath: '/cricket/ind-vs-nz',
      schemaType: 'CollectionPage',
    });
  }, [currentPath, articles]);

  // Render active route view
  const renderMainContent = () => {
    if (currentPath === '/') {
      return <HomeTechGuideView onNavigate={handleNavigate} />;
    }

    if (currentPath === '/deploy-guide') {
      return <DeployAndZipGuide onNavigate={handleNavigate} />;
    }

    if (currentPath.startsWith('/cricket/ind-vs-nz/match/')) {
      const matchSlug = currentPath.replace('/cricket/ind-vs-nz/match/', '');
      const foundMatch =
        VERIFIED_MATCHES.find((m) => m.slug === matchSlug) || VERIFIED_MATCHES[0];
      return <ScorecardView match={foundMatch} onNavigate={handleNavigate} />;
    }

    if (currentPath.startsWith('/cricket/ind-vs-nz/')) {
      const artSlug = currentPath.replace('/cricket/ind-vs-nz/', '');
      const foundArticle = articles.find((a) => a.slug === artSlug);
      if (foundArticle) {
        return (
          <ArticleView
            article={foundArticle}
            allArticles={articles}
            onNavigate={handleNavigate}
          />
        );
      }
    }

    return (
      <CricketHubView
        articles={articles}
        liveStatus={liveStatus}
        onRefreshLiveStatus={fetchLiveStatus}
        onPublishCustomArticle={handlePublishCustomArticle}
        onNavigate={handleNavigate}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-1">{renderMainContent()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
