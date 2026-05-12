import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 22 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} text-luxury-gold`}
    >
      {/* Outer Ring - Soft & Elegant */}
      <circle 
        cx="50" 
        cy="50" 
        r="46" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeOpacity="0.4" 
      />
      
      {/* Authentic 5-Point Crown - Distilled from master logo */}
      <g transform="translate(25, 30) scale(0.5)">
        <path
          d="M50 10L62 35L90 35L68 52L78 80L50 62L22 80L32 52L10 35L38 35L50 10Z"
          fill="currentColor"
          fillOpacity="0.9"
        />
        {/* Diamond Base */}
        <path
          d="M50 90L75 65L50 40L25 65L50 90Z"
          fill="currentColor"
          fillOpacity="0.7"
        />
      </g>
      
      {/* Inner subtle detailing */}
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
    </svg>
  );
};
