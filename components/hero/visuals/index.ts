'use client';

import dynamic from 'next/dynamic';

/**
 * THE HERO VISUAL SWAP POINT.
 *
 * The hero renders whatever this exports. To replace the animation, a shader,
 * a WebGL scene, a live model demo, a video, write the component and change
 * the import below. Nothing else needs to know.
 *
 * Loaded client-side only, so it never blocks first paint of the headline.
 */
export const HeroVisual = dynamic(() => import('./Lattice'), { ssr: false });
