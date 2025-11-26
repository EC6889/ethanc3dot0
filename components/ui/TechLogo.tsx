import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TechLogoProps {
  name: string;
  logo?: string;
  localLogo?: string;
  className?: string;
  icon?: LucideIcon | any;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, logo, localLogo, className, icon: Icon }) => {
  const [imgSrc, setImgSrc] = React.useState<string | undefined>(logo);
  const [hasError, setHasError] = React.useState(false);

  // If we have an explicit icon component, render it
  if (Icon) {
    return <Icon className={className} />;
  }

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
