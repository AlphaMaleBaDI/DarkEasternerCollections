/**
 * Dark Easterner Collections - Motion System
 * Centralized motion tokens for unified cinematic pacing.
 */

export const cinematicEase = [0.22, 1, 0.36, 1] as const;
export const smoothEase = [0.4, 0, 0.2, 1] as const;

export const motionTokens = {
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    slower: 1.2,
    cinematic: 1.6,
  },
  ease: {
    cinematic: cinematicEase,
    smooth: smoothEase,
  },
  stagger: {
    normal: 0.1,
    luxury: 0.2,
  }
};

/**
 * Common transition presets for consistency.
 */
export const transitions = {
  cinematic: {
    duration: motionTokens.duration.slow,
    ease: motionTokens.ease.cinematic,
  },
  slower: {
    duration: motionTokens.duration.slower,
    ease: motionTokens.ease.cinematic,
  },
  fade: {
    duration: motionTokens.duration.normal,
    ease: motionTokens.ease.smooth,
  }
};
