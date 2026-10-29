import React from 'react';
import { Download, CheckCircle2, FolderArchive, Globe, Shield, Terminal, ArrowLeft } from 'lucide-react';

interface DeployAndZipGuideProps {
  onNavigate: (path: string) => void;
}

export const DeployAndZipGuide: React.FC<DeployAndZipGuideProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <button
          type="button"
          onClick={() => onNavigate('/cricket/ind-vs-nz')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट पर वापस जाएँ</span>
        </button>
        <span className="text-xs text-stone-500">Netlify Production Ready · Build Verified</span>
      </div>

      {/* Primary Download Hero Box */}
      <section className="mt-8 bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#1E3A8A]">
              पूर्ण प्रोजेक्ट पैकेज (React + TypeScript + Tailwind + Netlify Config)
            </div>
            <h1 className="mt-2 text-2xl sm:text-4xl font-editorial font-bold text-stone-900">
              प्रोजेक्ट ZIP डाउनलोड करें और Netlify पर Deploy करें
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              इस ZIP फाइल में आपकी मौजूदा <strong>HindiTech Guide</strong> वेबसाइट और नया{' '}
              <strong>भारत बनाम न्यूज़ीलैंड क्रिकेट अपडेट</strong> सेक्शन, सभी 8 मौलिक हिंदी लेख, सत्यापित स्कोरकार्ड डेटा,{' '}
              <code>netlify.toml</code>, <code>public/_redirects</code>, और <code>public/sitemap.xml</code> सहित सभी जरूरी सोर्स फाइलें और बिल्ड एसेट्स शामिल हैं।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href="/hinditech-guide-ind-vs-nz-netlify.zip"
              download="hinditech-guide-ind-vs-nz-netlify.zip"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#1E3A8A] hover:bg-[#172E6E] text-white font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              <Download className="w-5 h-5" />
              <span>प्रोजेक्ट ZIP डाउनलोड करें (.zip)</span>
            </a>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FBF9F5] hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              <Globe className="w-4 h-4 text-[#1E3A8A]" />
              <span>XML साइटमैप देखें (/sitemap.xml)</span>
            </a>
          </div>
        </div>

        {/* Included Files Checklist */}
        <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-[#FBF9F5] border border-stone-200 rounded-lg">
            <div className="font-bold text-stone-900 flex items-center gap-1.5">
              <FolderArchive className="w-4 h-4 text-[#1E3A8A]" />
              <span>संपूर्ण सोर्स और Assets</span>
            </div>
            <p className="text-stone-600 mt-1">
              src/, public/, index.html, package.json, vite.config.ts, और सभी जनरेटेड इमेज एसेट्स।
            </p>
          </div>

          <div className="p-3.5 bg-[#FBF9F5] border border-stone-200 rounded-lg">
            <div className="font-bold text-stone-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#14532D]" />
              <span>Netlify SPA Routing</span>
            </div>
            <p className="text-stone-600 mt-1">
              <code>netlify.toml</code> और <code>public/_redirects</code> शामिल हैं ताकि हर लेख का URL सीधे खुले।
            </p>
          </div>

          <div className="p-3.5 bg-[#FBF9F5] border border-stone-200 rounded-lg">
            <div className="font-bold text-stone-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#1E3A8A]" />
              <span>SEO और Sitemap.xml</span>
            </div>
            <p className="text-stone-600 mt-1">
              सभी 8 हिंदी क्रिकेट लेखों और मैच स्कोरकार्ड के साफ URLs <code>public/sitemap.xml</code> में शामिल हैं।
            </p>
          </div>

          <div className="p-3.5 bg-[#FBF9F5] border border-stone-200 rounded-lg">
            <div className="font-bold text-stone-900 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#14532D]" />
              <span>सुरक्षित API Architecture</span>
            </div>
            <p className="text-stone-600 mt-1">
              <code>.env.example</code> और सर्वर प्रॉक्सी शामिल; कोई भी API कुंजी सार्वजनिक कोड में नहीं है।
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Netlify Deployment Instructions in Hindi */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-editorial font-bold text-stone-900 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#1E3A8A]" />
            <span>तरीका 1: GitHub / Git के माध्यम से Netlify पर Deploy करें (अनुशंसित)</span>
          </h2>

          <ol className="space-y-4 text-sm text-stone-700 list-decimal list-inside">
            <li>
              ऊपर दिए गए <strong>"प्रोजेक्ट ZIP डाउनलोड करें"</strong> बटन पर क्लिक करके{' '}
              <code>hinditech-guide-ind-vs-nz-netlify.zip</code> अपने कंप्यूटर पर डाउनलोड करें और उसे Extract (Unzip) करें।
            </li>
            <li>
              प्रोजेक्ट फोल्डर को अपने GitHub, GitLab या Bitbucket रिपॉजिटरी में पुश करें।
            </li>
            <li>
              <strong>Netlify Dashboard</strong> (app.netlify.com) में लॉगिन करें और{' '}
              <strong>"Add new site" → "Import an existing project"</strong> चुनें।
            </li>
            <li>
              प्रोजेक्ट में पहले से मौजूद <code>netlify.toml</code> के कारण Netlify अपने आप सही सेटिंग्स ले लेगा:
              <div className="mt-2 p-3 bg-stone-100 rounded-lg font-mono text-xs text-stone-800 space-y-1">
                <div>Build command: npm run build</div>
                <div>Publish directory: dist</div>
              </div>
            </li>
            <li>
              <strong>"Deploy site"</strong> पर क्लिक करें। कुछ ही सेकंड में आपकी वेबसाइट लाइव हो जाएगी!
            </li>
          </ol>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-editorial font-bold text-stone-900">
            तरीका 2: Netlify Drop (सीधे dist फोल्डर अपलोड करें) और API कॉन्फ़िगरेशन
          </h2>

          <ol className="space-y-4 text-sm text-stone-700 list-decimal list-inside">
            <li>
              हमारे डाउनलोड किए गए ZIP में पहले से टेस्ट किया हुआ प्रोडक्शन <code>dist/</code> फोल्डर भी शामिल है, या आप अपने कंप्यूटर पर टर्मिनल में यह कमांड चला सकते हैं:
              <div className="mt-2 p-3 bg-stone-100 rounded-lg font-mono text-xs text-stone-800">
                npm install &amp;&amp; npm run build
              </div>
            </li>
            <li>
              इसके बाद <strong>app.netlify.com/drop</strong> पर जाएँ और सीधे <code>dist</code> फोल्डर को ड्रैग-एंड-ड्रॉप करें।
            </li>
            <li>
              <strong>वैकल्पिक लाइव क्रिकेट API सेटअप:</strong> यदि आप भविष्य में पेड लाइव क्रिकेट API (जैसे CricAPI या Sportmonks) जोड़ना चाहते हैं, तो Netlify में{' '}
              <strong>Site configuration → Environment variables</strong> में जाकर <code>CRICAPI_KEY</code> वेरिएबल जोड़ें। इसे कभी भी फ्रंटएंड कोड में न लिखें।
            </li>
            <li>
              <strong>Google Search Console:</strong> अपनी साइट लाइव होने के बाद Google Search Console में जाकर{' '}
              <code>https://आपका-डोमेन/sitemap.xml</code> सबमिट करें। (नोट: कोई भी प्रामाणिक प्रणाली Google में निश्चित रैंकिंग या ट्रैफिक की झूठी गारंटी नहीं देती; मौलिक हिंदी कंटेंट और साफ तकनीकी SEO सर्वोत्तम अभ्यास हैं।)
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};
