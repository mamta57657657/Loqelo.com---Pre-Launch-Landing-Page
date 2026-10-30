/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Detailed Grass Blade Silhouette Divider matching the signature landscape design
 * from the Elite Outdoor Solution brand aesthetic.
 */

import React from 'react';

interface GrassDividerProps {
  fillColor?: string;
  className?: string;
  height?: number;
  flipY?: boolean;
}

export function GrassSilhouetteDivider({
  fillColor = '#FFFFFF',
  className = '',
  height = 54,
  flipY = false,
}: GrassDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-10 ${
        flipY ? 'rotate-180' : ''
      } ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
        className="w-full h-full block animate-grass-sway"
        fill={fillColor}
      >
        <path d="M0,90 L0,75 
          C12,68 18,35 22,12 C24,38 29,65 35,74 
          C42,65 48,25 52,2 C56,32 61,64 68,76 
          C74,68 80,45 84,28 C87,52 92,72 98,78 
          C105,62 110,18 115,0 C118,29 124,66 130,75 
          C137,65 142,40 148,22 C152,48 158,68 165,77 
          C172,64 178,32 182,14 C186,42 192,69 200,76 
          C208,60 214,20 220,5 C224,35 230,67 238,75 
          C245,63 250,38 255,20 C260,49 265,70 272,78 
          C280,60 286,26 290,8 C294,36 300,68 308,76 
          C315,62 320,30 326,16 C330,44 336,71 345,77 
          C352,61 358,22 364,2 C368,34 374,67 382,75 
          C390,60 395,35 400,18 C405,48 412,70 420,78 
          C428,58 434,15 440,0 C444,30 450,66 458,76 
          C465,62 470,36 476,19 C480,46 488,71 496,77 
          C504,59 510,24 516,6 C520,38 526,69 535,76 
          C542,63 548,32 554,15 C558,45 565,70 574,78 
          C582,58 588,18 594,2 C598,32 605,66 614,75 
          C622,60 628,34 634,17 C638,47 646,71 655,77 
          C663,59 670,22 676,5 C680,36 688,68 697,76 
          C705,61 712,30 718,12 C722,43 730,70 740,78 
          C748,58 755,16 761,0 C765,31 773,65 782,75 
          C790,60 796,33 802,16 C806,46 815,70 824,77 
          C832,59 839,24 845,6 C850,38 858,68 868,76 
          C876,62 882,31 888,14 C893,44 901,70 910,78 
          C918,58 925,18 931,2 C936,33 944,66 954,75 
          C962,60 968,34 974,17 C979,47 988,71 998,77 
          C1006,59 1013,22 1019,5 C1024,36 1032,68 1042,76 
          C1050,61 1057,30 1063,12 C1068,43 1076,70 1086,78 
          C1094,58 1101,16 1107,0 C1112,31 1120,65 1130,75 
          C1138,60 1144,33 1150,16 C1155,46 1164,70 1174,77 
          C1182,62 1188,35 1194,22 C1197,45 1200,68 1200,90 Z" />
      </svg>
    </div>
  );
}
