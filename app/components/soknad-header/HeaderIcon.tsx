import React from "react";

function SvgHeaderIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      role="img"
      aria-labelledby="header-icon"
    >
      <g clipPath="url(#clip0_3649_100246)">
        <path
          d="M21.9513 32.4804L7.41433 17.9433L18.2369 7.12081L32.7739 21.6578L38.912 15.5197L43.7615 43.468L15.8132 38.6185L21.9513 32.4804Z"
          fill="#CCF1D6"
        />
        <path
          d="M23.918 6.41667V19.25H1.16797L1.16797 5.25H16.0472"
          stroke="#262626"
          strokeWidth="2"
        />
        <circle cx="12.8346" cy="9.33366" r="3.66667" stroke="#262626" strokeWidth="2" />
        <path
          d="M24.0833 5.25016C24.0833 7.27521 22.4417 8.91683 20.4167 8.91683C18.3916 8.91683 16.75 7.27521 16.75 5.25016C16.75 3.22512 18.3916 1.5835 20.4167 1.5835C22.4417 1.5835 24.0833 3.22512 24.0833 5.25016Z"
          stroke="#262626"
          strokeWidth="2"
        />
        <circle cx="36.75" cy="37.3335" r="13" stroke="#262626" strokeWidth="2" />
        <path d="M45.9727 45.9651L55.3893 55.3818" stroke="#262626" strokeWidth="2" />
        <path
          d="M28.5623 35.1377L42.8902 31.2985C43.0681 31.2509 43.2508 31.3564 43.2985 31.5342L44.2475 35.076C44.3904 35.6094 44.0739 36.1578 43.5404 36.3007L30.5004 39.7948C29.9669 39.9377 29.4186 39.6211 29.2756 39.0877L28.3266 35.5459C28.279 35.3681 28.3845 35.1853 28.5623 35.1377Z"
          stroke="#262626"
          strokeWidth="2"
        />
        <path
          d="M31.1975 44.0076L30.1622 40.1439L44.0072 36.4341L45.0425 40.2978C45.1854 40.8313 44.8688 41.3796 44.3353 41.5226L32.4223 44.7147C31.8888 44.8576 31.3405 44.541 31.1975 44.0076Z"
          stroke="#262626"
          strokeWidth="2"
        />
        <path
          d="M38.0229 32.775L37.7209 31.6481C37.3874 30.4033 36.108 29.6646 34.8632 29.9981V29.9981C33.6184 30.3317 32.8798 31.6111 33.2133 32.8559L33.5152 33.9828"
          stroke="#262626"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_3649_100246">
          <rect width="56" height="56" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgHeaderIcon);
export const HeaderIcon = ForwardRef;
