import React, { useState } from 'react';

interface TechLogoProps {
  name: string;
  logo: string;
  localLogo: string;
  className?: string;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, logo, localLogo, className }) => {
  const [imgSrc, setImgSrc] = useState(logo);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      console.warn(`Failed to load CDN image for ${name}, switching to local backup: ${localLogo}`);
      setImgSrc(localLogo);
      setHasError(true);
    }
  };

  if (!imgSrc) return null;

  return <img src={imgSrc} alt={name} className={className} onError={handleError} />;
};
