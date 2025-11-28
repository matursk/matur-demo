// Canvas-based autonomous starfield that renders behind content.
// Settings live in src/starfieldConfig.ts — edit star count, speed, sizes, twinkle, and motion there.
// Performance notes:
// - Respects prefers-reduced-motion (fewer/slower stars, no twinkle).
// - Pauses drawing when the tab is hidden.
// - Density scales with viewport area to keep a consistent look.
import { useEffect, useRef } from 'react';
import { starfieldConfig as CONFIG } from '../starfieldConfig';

export default function StarsBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const prefersReducedMotion = typeof window !== 'undefined'
		? window.matchMedia('(prefers-reduced-motion: reduce)').matches
		: false;

	useEffect(() => {
		// Canvas setup
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext('2d')!;

		// Derived effective config, respecting reduced motion
		const motionScale = CONFIG.motionScale * (prefersReducedMotion ? CONFIG.reducedMotionScale : 1);
		const speed = CONFIG.starSpeed * motionScale;
		const twinkleAmount = prefersReducedMotion ? 0 : CONFIG.twinkleAmount;

		// Density scaling by viewport area to keep visual density roughly constant.
		// Baseline area corresponds to 1920x1080.
		const BASE_AREA = 1920 * 1080;

		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);
		const areaScale = (width * height) / BASE_AREA;
		let targetStarCount = Math.max(32, Math.round(CONFIG.starCount * areaScale * (prefersReducedMotion ? CONFIG.reducedMotionScale : 1)));

		type Star = {
			x: number;
			y: number;
			r: number;
			ax: number; // angle in radians for autonomous drift
			speed: number; // per-star speed multiplier
			twinklePhase: number;
		};

		const stars: Star[] = [];

		function rand(min: number, max: number): number {
			return Math.random() * (max - min) + min;
		}

		function spawnStar(): Star {
			const [minR, maxR] = CONFIG.sizeRange;
			return {
				x: Math.random() * width,
				y: Math.random() * height,
				r: rand(minR, maxR),
				ax: rand(-Math.PI, Math.PI),
				speed: rand(0.6, 1.4),
				twinklePhase: Math.random() * Math.PI * 2,
			};
		}

		function resizePopulation(count: number) {
			if (stars.length < count) {
				while (stars.length < count) stars.push(spawnStar());
			} else if (stars.length > count) {
				stars.length = count;
			}
		}

		resizePopulation(targetStarCount);

		let raf = 0;
		let lastTs = performance.now();
		let hidden = document.visibilityState === 'hidden';

		const onResize = () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
			const newAreaScale = (width * height) / BASE_AREA;
			targetStarCount = Math.max(32, Math.round(CONFIG.starCount * newAreaScale * (prefersReducedMotion ? CONFIG.reducedMotionScale : 1)));
			resizePopulation(targetStarCount);
		};

		const onVisibility = () => {
			hidden = document.visibilityState === 'hidden';
			// If becoming visible, restart the RAF loop immediately for snappy resume.
			if (!hidden && !raf) {
				lastTs = performance.now();
				raf = requestAnimationFrame(draw);
			}
		};

		window.addEventListener('resize', onResize);
		document.addEventListener('visibilitychange', onVisibility);

		// Autonomous starfield animation using requestAnimationFrame
		function draw(ts: number) {
			// Reduce processing when tab is not visible: skip drawing entirely.
			if (hidden) {
				raf = 0;
				return;
			}
			const dt = Math.min(64, ts - lastTs) / 1000; // clamp dt to avoid large jumps
			lastTs = ts;

			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = '#97DAFF';

			for (let i = 0; i < stars.length; i++) {
				const s = stars[i];

				// Drift position (autonomous, not mouse-controlled)
				const v = speed * s.speed;
				s.x += Math.cos(s.ax) * v * dt;
				s.y += Math.sin(s.ax) * v * dt * 0.6; // slightly less vertical movement for calmer feel

				// Wrap around edges
				if (s.x < -4) s.x = width + 4;
				else if (s.x > width + 4) s.x = -4;
				if (s.y < -4) s.y = height + 4;
				else if (s.y > height + 4) s.y = -4;

				// Twinkle: subtle alpha modulation
				s.twinklePhase += dt * (0.6 + s.speed * 0.8);
				const alpha = 0.6 + Math.sin(s.twinklePhase) * 0.5 * twinkleAmount;
				ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));

				// Draw
				ctx.beginPath();
				ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx.fill();
			}

			raf = requestAnimationFrame(draw);
		}

		raf = requestAnimationFrame(draw);

		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	}, [prefersReducedMotion]);

	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
			<canvas ref={canvasRef} className="h-full w-full" />
		</div>
	);
}
