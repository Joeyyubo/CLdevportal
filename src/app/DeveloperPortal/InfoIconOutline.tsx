import * as React from 'react';

/**
 * Outline-style info icon: black circle with thin border, white interior, black "i" inside.
 * Use for all tooltip info icons across the app.
 */
export const InfoIconOutline: React.FunctionComponent<{ style?: React.CSSProperties; size?: number }> = ({
  style,
  size = 16
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', ...style }}
  >
    <circle cx="8" cy="8" r="7" stroke="#151515" strokeWidth="1.5" fill="none" />
    <circle cx="8" cy="5" r="1" fill="#151515" />
    <path d="M8 6.5V11" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
