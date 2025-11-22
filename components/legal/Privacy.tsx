import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyProps {
  onBack: () => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans pt-24 pb-12 px-6 md:px-12 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-brand-cyan hover:text-brand-cyan-dim transition-colors mb-8 font-mono text-sm uppercase tracking-widest"
      >
        <ArrowLeft size={16} /> Return_To_Base
      </button>

      <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
        Privacy Policy
      </h1>
      <p className="text-slate-500 font-mono text-xs mb-8">LAST_UPDATED: 2025-01-01</p>

      <div className="space-y-8 leading-relaxed text-sm md:text-base">
        <section>
          <h2 className="text-xl text-white font-bold mb-4">1. Introduction</h2>
          <p>
            Ethan C. ("we", "our", or "us") operates this portfolio website. This page informs you
            of our policies regarding the collection, use, and disclosure of personal data when you
            use our Service and the choices you have associated with that data.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-bold mb-4">2. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and
            improve our Service to you.
          </p>

          <h3 className="text-lg text-slate-200 font-bold mt-4 mb-2">Types of Data Collected</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>
              <strong className="text-slate-300">Personal Data:</strong> While using our Service, we
              may ask you to provide us with certain personally identifiable information that can be
              used to contact or identify you ("Personal Data"). This may include, but is not
              limited to: Email address, First name and last name, Cookies and Usage Data.
            </li>
            <li>
              <strong className="text-slate-300">Usage Data:</strong> We may also collect
              information on how the Service is accessed and used ("Usage Data"). This Usage Data
              may include information such as your computer's Internet Protocol address (e.g. IP
              address), browser type, browser version, the pages of our Service that you visit, the
              time and date of your visit, the time spent on those pages, unique device identifiers
              and other diagnostic data.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-white font-bold mb-4">3. Use of Data</h2>
          <p>Ethan C. uses the collected data for various purposes:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>
              To allow you to participate in interactive features of our Service when you choose to
              do so
            </li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-white font-bold mb-4">4. Transfer of Data</h2>
          <p>
            Your information, including Personal Data, may be transferred to — and maintained on —
            computers located outside of your state, province, country or other governmental
            jurisdiction where the data protection laws may differ than those from your
            jurisdiction. Your consent to this Privacy Policy followed by your submission of such
            information represents your agreement to that transfer.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-bold mb-4">5. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of
            transmission over the Internet, or method of electronic storage is 100% secure. While we
            strive to use commercially acceptable means to protect your Personal Data, we cannot
            guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-bold mb-4">6. Third-Party Service Providers</h2>
          <p>
            We may employ third party companies and individuals to facilitate our Service ("Service
            Providers"), to provide the Service on our behalf, to perform Service-related services
            or to assist us in analyzing how our Service is used. These third parties have access to
            your Personal Data only to perform these tasks on our behalf and are obligated not to
            disclose or use it for any other purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-bold mb-4">7. Links to Other Sites</h2>
          <p>
            Our Service may contain links to other sites that are not operated by us. If you click
            on a third party link, you will be directed to that third party's site. We strongly
            advise you to review the Privacy Policy of every site you visit. We have no control over
            and assume no responsibility for the content, privacy policies or practices of any third
            party sites or services.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-white font-bold mb-4">8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page. You are advised to review this Privacy
            Policy periodically for any changes. Changes to this Privacy Policy are effective when
            they are posted on this page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default React.memo(Privacy);
