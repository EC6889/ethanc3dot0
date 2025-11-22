import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsProps {
    onBack: () => void;
}

const Terms: React.FC<TermsProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans pt-24 pb-12 px-6 md:px-12 max-w-4xl mx-auto">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-brand-cyan hover:text-brand-cyan-dim transition-colors mb-8 font-mono text-sm uppercase tracking-widest"
            >
                <ArrowLeft size={16} /> Return_To_Base
            </button>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Terms & Conditions</h1>
            <p className="text-slate-500 font-mono text-xs mb-8">LAST_UPDATED: 2025-01-01</p>

            <div className="space-y-8 leading-relaxed text-sm md:text-base">
                <section>
                    <h2 className="text-xl text-white font-bold mb-4">1. Agreement to Terms</h2>
                    <p>By accessing and using this website (the "Site"), operated by Ethan C. ("we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the Site.</p>
                </section>

                <section>
                    <h2 className="text-xl text-white font-bold mb-4">2. Intellectual Property Rights</h2>
                    <p>Other than the content you own, under these Terms, Ethan C. and/or its licensors own all the intellectual property rights and materials contained in this Site. You are granted a limited license only for purposes of viewing the material contained on this Site.</p>
                    <p className="mt-2">You are specifically restricted from:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                        <li>Publishing any Site material in any other media without prior written consent.</li>
                        <li>Selling, sublicensing, and/or otherwise commercializing any Site material.</li>
                        <li>Publicly performing and/or showing any Site material.</li>
                        <li>Using this Site in any way that is or may be damaging to this Site or to any person or business entity.</li>
                        <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this Site.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl text-white font-bold mb-4">3. No Warranties</h2>
                    <p className="uppercase font-mono text-xs text-slate-500 mb-2">DISCLAIMER</p>
                    <p>This Site is provided "as is," with all faults, and Ethan C. expresses no representations or warranties, of any kind related to this Site or the materials contained on this Site. Nothing contained on this Site shall be interpreted as advising you.</p>
                </section>

                <section>
                    <h2 className="text-xl text-white font-bold mb-4">4. Limitation of Liability</h2>
                    <p>In no event shall Ethan C., nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Site whether such liability is under contract. Ethan C., including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Site.</p>
                </section>

                <section>
                    <h2 className="text-xl text-white font-bold mb-4">5. Indemnification</h2>
                    <p>You hereby indemnify to the fullest extent Ethan C. from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
                </section>

                <section>
                    <h2 className="text-xl text-white font-bold mb-4">6. Severability</h2>
                    <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
                </section>

                <section>
                    <h2 className="text-xl text-white font-bold mb-4">7. Variation of Terms</h2>
                    <p>Ethan C. is permitted to revise these Terms at any time as it sees fit, and by using this Site you are expected to review these Terms on a regular basis.</p>
                </section>

                <section>
                    <h2 className="text-xl text-white font-bold mb-4">8. Governing Law & Jurisdiction</h2>
                    <p>These Terms will be governed by and interpreted in accordance with the laws of Malaysia, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Malaysia for the resolution of any disputes.</p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
