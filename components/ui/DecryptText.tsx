import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface DecryptTextProps {
    text: string;
    className?: string;
    speed?: number;
    maxIterations?: number;
    revealDirection?: 'forward' | 'random';
    useOriginalCharsOnly?: boolean;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?';

export const DecryptText: React.FC<DecryptTextProps> = ({
    text,
    className = '',
    speed = 30,
    maxIterations = 10,
    revealDirection = 'random',
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView && !isScrambling) {
            scramble();
        }
    }, [isInView]);

    const scramble = () => {
        setIsScrambling(true);
        let iteration = 0;

        const interval = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';

                        // If we've passed the iteration threshold for this index, show the real char
                        if (index < iteration) {
                            return text[index];
                        }

                        // Otherwise show a random char
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setIsScrambling(false);
            }

            iteration += 1 / 3; // Slower reveal
        }, speed);
    };

    return (
        <motion.span
            ref={containerRef}
            className={`inline-block ${className}`}
            onMouseEnter={scramble} // Re-scramble on hover for fun
        >
            {displayText}
        </motion.span>
    );
};
