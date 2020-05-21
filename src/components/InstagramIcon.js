import * as React from "react";

function InstagramIcon(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <title>{"instagram"}</title>
      <path
        d="M6.667 0A6.667 6.667 0 000 6.667v10.666A6.667 6.667 0 006.667 24h10.666A6.667 6.667 0 0024 17.333V6.667A6.667 6.667 0 0017.333 0H6.667zM20 2.667c.733 0 1.333.6 1.333 1.333s-.6 1.333-1.333 1.333-1.333-.6-1.333-1.333.6-1.333 1.333-1.333zm-8 2.666a6.667 6.667 0 110 13.334 6.667 6.667 0 010-13.334zM12 8a4.001 4.001 0 10.003 8.003A4.001 4.001 0 0012 8z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default InstagramIcon;
