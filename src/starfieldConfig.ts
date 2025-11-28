// Centralized configuration for the canvas starfield.
// Edit these values to control density, motion, appearance, and performance.
export type StarfieldConfig = {
	// Total number of stars rendered across the screen at 1920x1080.
	// The actual count scales with viewport area to keep density consistent.
	starCount: number;
	// Base motion speed in pixels per second; higher = faster drift.
	starSpeed: number;
	// Multiplier applied to all motion for subtle/strong motion tuning.
	motionScale: number;
	// Star radius range in CSS pixels [min, max].
	sizeRange: [number, number];
	// Twinkle intensity (0 = off, 1 = strong). Typical: 0.0–0.6
	twinkleAmount: number;
	// Performance scaling applied on devices that prefer reduced motion.
	// Example: 0.4 means 40% of stars and slower speed.
	reducedMotionScale: number;
};

// Default starfield configuration.
// Tip: For mobile performance, reduce starCount and starSpeed slightly.
export const starfieldConfig: StarfieldConfig = {
	starCount: 450, // controls density; see note above
	starSpeed: 24, // px/s baseline drift
	motionScale: 1.0, // global motion multiplier
	sizeRange: [0.6, 1.8], // star size bounds
	twinkleAmount: 0.35, // 0 disables twinkle
	reducedMotionScale: 0.45, // fewer/slower stars when reduced motion is on
};

// Where to edit in the future:
// - starCount: Increase/decrease for more/fewer stars.
// - starSpeed: Increase for faster drift, decrease for calmer motion.
// - motionScale: One knob to scale all motion (e.g., 0.8 for slightly calmer).
// - sizeRange: Make stars bigger/smaller overall.
// - twinkleAmount: 0 disables twinkling; 0.2–0.5 is subtle to moderate.
// - reducedMotionScale: Controls automatic performance reduction when users
//   prefer reduced motion or when the tab is hidden (internally applied).

