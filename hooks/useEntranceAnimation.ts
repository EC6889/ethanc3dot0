import { useState, useEffect } from 'react';

interface AnimationPhases {
    showDigitalRain: boolean;
    showLogo: boolean;
    showNav: boolean;
    showHeroBackground: boolean;
    showHeroTitle: boolean;
    showHeroSubtitle: boolean;
    showHeroTypewriter: boolean;
    showHeroCTA: boolean;
}

interface UseEntranceAnimationReturn extends AnimationPhases {
    isComplete: boolean;
}

export const useEntranceAnimation = (trigger: boolean): UseEntranceAnimationReturn => {
    const [phases, setPhases] = useState<AnimationPhases>({
        showDigitalRain: false,
        showLogo: false,
        showNav: false,
        showHeroBackground: false,
        showHeroTitle: false,
        showHeroSubtitle: false,
        showHeroTypewriter: false,
        showHeroCTA: false,
    });

    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!trigger) return;

        // CYBERPUNK MATRIX SEQUENCE - Fast & Aggressive

        // Phase 1: Digital Rain (immediate, fills screen)
        const rainTimer = setTimeout(() => {
            setPhases(prev => ({ ...prev, showDigitalRain: true }));
        }, 50);

        // Phase 2: Logo burns through (early, overlaps with rain)
        const logoTimer = setTimeout(() => {
            setPhases(prev => ({ ...prev, showLogo: true }));
        }, 400);

        // Phase 3: Background materializes (while logo animates)
        const bgTimer = setTimeout(() => {
            setPhases(prev => ({ ...prev, showHeroBackground: true }));
        }, 600);

        // Phase 4: Navbar emerges from circuit traces
        const navTimer = setTimeout(() => {
            setPhases(prev => ({ ...prev, showNav: true }));
        }, 900);

        // Phase 5: Title GLITCHES in with chromatic aberration
        const titleTimer = setTimeout(() => {
            setPhases(prev => ({ ...prev, showHeroTitle: true }));
        }, 1300);

        // Phase 6: Subtitle with electromagnetic ripple
        const subtitleTimer = setTimeout(() => {
            setPhases(prev => ({ ...prev, showHeroSubtitle: true }));
        }, 2000);

        // Phase 7: Typewriter with glitch
        const typewriterTimer = setTimeout(() => {
            setPhases(prev => ({ ...prev, showHeroTypewriter: true }));
        }, 2400);

        // Phase 8: CTA - Final pulse
        const ctaTimer = setTimeout(() => {
            setPhases(prev => ({ ...prev, showHeroCTA: true }));
            setIsComplete(true);
        }, 2800);

        return () => {
            clearTimeout(rainTimer);
            clearTimeout(logoTimer);
            clearTimeout(navTimer);
            clearTimeout(bgTimer);
            clearTimeout(titleTimer);
            clearTimeout(subtitleTimer);
            clearTimeout(typewriterTimer);
            clearTimeout(ctaTimer);
        };
    }, [trigger]);

    return {
        ...phases,
        isComplete,
    };
};
