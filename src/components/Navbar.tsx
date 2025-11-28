import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const links = [
	{ href: '/', label: 'Domov' },
	{ href: '/cennik', label: 'Cenník' },
	{ href: '/cookies', label: 'Cookies' },
	{ href: 'mailto:podpora@matur.sk', label: 'Kontakt' },
];

export default function Navbar() {
	const [compact, setCompact] = useState(false);
	const { scrollY } = useScroll();
	const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.35]);

	useEffect(() => {
		const onScroll = () => setCompact(window.scrollY > 10);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<motion.header
			aria-label="Navigácia"
			/* Watery navbar: class 'nav-water' enables ripple + adjustable CSS variables in globals.css */
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
				<div className="flex items-center gap-6">
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
					>
						Prejsť na cenník
					</a>
				</div>
			</nav>
		</motion.header>
	);
}



