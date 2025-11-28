export type StarfieldConfig = {
	starCount: number;
	starSpeed: number;
	motionScale: number;
	sizeRange: [number, number];
	twinkleAmount: number;
	reducedMotionScale: number;
};

export const starfieldConfig: StarfieldConfig = {
	starCount: 450,
	starSpeed: 24,
	motionScale: 1.0,
	sizeRange: [0.6, 1.8],
	twinkleAmount: 0.35,
	reducedMotionScale: 0.45,
};

