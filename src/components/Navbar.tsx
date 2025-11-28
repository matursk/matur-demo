import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const links = [
	{ href: '/', label: 'Domov' },
	{ href: '/cennik', label: 'Cenník' },
	{ href: '/cookies', label: 'Cookies' },
	{ href: 'mailto:podpora@matur.sk', label: 'Kontakt' },
];

export default function Navbar() {
	const [compact, setCompact] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const { scrollY } = useScroll();
	const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.35]);

	useEffect(() => {
		const onScroll = () => setCompact(window.scrollY > 10);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) setMobileOpen(false);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<motion.header
			aria-label="Navigácia"
			className="glass nav-water fixed inset-x-0 top-0 z-30"
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: [0.22, 0.9, 0.23, 1] }}
			style={{
				boxShadow: shadowOpacity.get() ? '0 8px 24px rgba(0,0,0,0.35)' : 'none',
			}}
		>
			<nav
				className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 ${
					compact ? 'h-[58px]' : 'h-[77px]'
				} transition-[height] duration-300`}
				aria-label="Hlavná navigácia"
			>
				<Link to="/" className="flex items-center gap-2 font-semibold tracking-wide" aria-label="Matur domov">
					<img
						src="/app_icon.png"
						alt="Matur logo"
						className="h-10 w-10 object-contain select-none pointer-events-none"
						draggable={false}
					/>
					<span className="text-white/90 text-base">Matur</span>
				</Link>
				<div className="flex items-center gap-4 sm:gap-6">
					<ul className="hidden md:flex items-center gap-6 text-base">
						{links.map((l) => (
							<li key={l.label}>
								{l.href.startsWith('mailto:') ? (
									<a className="text-white/80 hover:text-white focus-visible:text-white" href={l.href}>
										{l.label}
									</a>
								) : (
									<Link className="text-white/80 hover:text-white focus-visible:text-white" to={l.href}>
										{l.label}
									</Link>
								)}
							</li>
						))}
					</ul>
					<a
						className="rounded-lg bg-primary px-4 py-2.5 text-base font-medium text-black hover:brightness-110 focus-visible:brightness-110 shadow-glow"
						href="/#pricing"
						aria-label="Prejsť na cenník"
						onClick={() => setMobileOpen(false)}
					>
						Prejsť na cenník
					</a>
					<button
						type="button"
						className="md:hidden rounded-lg border border-white/25 bg-black/20 px-3 py-2 text-white transition hover:border-white/40 focus-visible:border-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
						onClick={() => setMobileOpen((open) => !open)}
						aria-label="Otvoriť navigačné menu"
						aria-expanded={mobileOpen}
					>
						<span className="relative block h-5 w-6">
							<span
								className={`absolute left-0 top-1 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
									mobileOpen ? 'translate-y-[6px] rotate-45' : ''
								}`}
							/>
							<span
								className={`absolute left-0 bottom-1 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
									mobileOpen ? '-translate-y-[6px] -rotate-45' : ''
								}`}
							/>
						</span>
					</button>
				</div>
			</nav>
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						className="md:hidden px-4 sm:px-6 pb-4"
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
					>
						<div className="rounded-2xl border border-white/10 bg-black/65 p-4 backdrop-blur-xl space-y-3">
							<ul className="flex flex-col gap-2 text-base">
								{links.map((l) => (
									<li key={`mobile-${l.label}`}>
										{l.href.startsWith('mailto:') ? (
											<a
												className="flex items-center justify-between rounded-lg px-3 py-2 text-white/90 hover:bg-white/5 focus-visible:bg-white/10 focus-visible:outline-none"
												href={l.href}
												onClick={() => setMobileOpen(false)}
											>
												{l.label}
											</a>
										) : (
											<Link
												className="flex items-center justify-between rounded-lg px-3 py-2 text-white/90 hover:bg-white/5 focus-visible:bg-white/10 focus-visible:outline-none"
												to={l.href}
												onClick={() => setMobileOpen(false)}
											>
												{l.label}
											</Link>
										)}
									</li>
								))}
							</ul>
							<a
								className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-base font-semibold text-black shadow-glow hover:brightness-110 focus-visible:brightness-110"
								href="/#pricing"
								onClick={() => setMobileOpen(false)}
							>
								Prejsť na cenník
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}



