import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Tier = {
	title: string;
	price: string;
	points: string[];
	actionLabel: string;
	emphasized?: boolean;
	ctaTo?: string;
	variant?: 'blue' | 'black' | 'default';
};

const tiers: Tier[] = [
	{
		title: 'Základné licencie',
		price: '15€ / licencia',
		points: [
			'Základný balík lekcií a otázok',
			'Aktivácie licenčným kľúčom',
			'Podpora správy študentov',
			'Okamžité doručenie',
		],
		actionLabel: 'Kúpiť',
		ctaTo: '/objednavka/zakladne',
	},
	{
		title: 'Prémiové licencie',
		price: '20€ / licencia + 5€ za lekciu*',
		variant: 'blue',
		points: [
			'Prémiový balík lekcií vytvorený priamo pre vašu školu',
			'Aktivácie licenčným kľúčom',
			'Podpora správy študentov',
			'Garancia doručenia do 30 dní od doloženia podkladov**',
		],
		actionLabel: 'Získať cenovú ponuku',
		ctaTo: '/objednavka/premium',
		emphasized: true,
	},
	{
		title: 'Vlastné riešenie',
		price: 'cena dohodou',
		variant: 'black',
		points: [
			'Kompletne vlastná aplikácia len pre vašu školu',
			'Branding a téma podľa manuálu školy',
			'Vlastný licenčný systém a správa prístupov',
			'Možnosť rozšírení, integrácií a špeciálnych modulov',
		],
		actionLabel: 'Získať cenovú ponuku',
		ctaTo: '/objednavka/custom',
	},
];

const cardBase = 'relative flex h-full flex-col rounded-2xl p-6 shadow-glass backdrop-blur-xl';

const variantCardClasses: Record<NonNullable<Tier['variant']>, string> = {
	blue: 'bg-gradient-to-b from-sky-900/70 via-sky-800/50 to-slate-900/80 border border-sky-300/40 text-sky-50 shadow-[0_25px_60px_rgba(15,118,255,0.25)]',
	black: 'bg-gradient-to-b from-fuchsia-950 via-purple-900/80 to-slate-900/90 border border-fuchsia-400/50 text-white shadow-[0_35px_80px_rgba(217,70,239,0.35)]',
	default: 'glass border border-white/10 text-white/85',
};

const priceClasses: Record<NonNullable<Tier['variant']>, string> = {
	blue: 'text-sky-200',
	black: 'text-fuchsia-200',
	default: 'text-primary',
};

const bulletClasses: Record<NonNullable<Tier['variant']>, string> = {
	blue: 'bg-sky-300/90',
	black: 'bg-fuchsia-300',
	default: 'bg-primary/80',
};

const listTextClasses: Record<NonNullable<Tier['variant']>, string> = {
	blue: 'text-sky-50/90',
	black: 'text-white/90',
	default: 'text-white/85',
};

const ctaClasses: Record<NonNullable<Tier['variant']>, string> = {
	blue: 'bg-sky-300 text-slate-900 hover:bg-sky-200 focus-visible:bg-sky-200',
	black: 'bg-gradient-to-r from-fuchsia-400 to-rose-400 text-black hover:brightness-110 focus-visible:brightness-110',
	default: 'bg-white/10 text-white hover:bg-white/15 focus-visible:bg-white/15',
};

export default function Pricing() {
	return (
		<div className="mx-auto max-w-6xl">
			<div className="mb-8 text-center">
				<p className="text-sm uppercase tracking-wider text-white/60">Licencie a ceny</p>
				<h3 className="mt-2 text-2xl font-semibold">Vyberte si plán, ktorý vám sedí</h3>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{tiers.map((tier) => {
					const variant = tier.variant ?? 'default';
					const ctaBase = ctaClasses[variant];
					const priceColor = priceClasses[variant];
					const bullet = bulletClasses[variant];
					const listColor = listTextClasses[variant];
					return (
						<motion.article
							key={tier.title}
							className={`${cardBase} ${variantCardClasses[variant]} ${
								tier.emphasized ? 'ring-1 ring-primary/40 shadow-glow' : ''
							}`}
							initial={{ opacity: 0, y: 14 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 45px rgba(0,0,0,0.4)' }}
							whileTap={{ scale: 0.995 }}
							viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
							transition={{ duration: 0.5, ease: [0.22, 0.9, 0.23, 1] }}
							aria-label={`${tier.title} – ${tier.price}`}
						>
							{tier.emphasized && (
								<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-primary px-3 py-1 text-xs font-semibold text-black shadow-glow">
									Odporúčané
								</span>
							)}
							{variant === 'black' ? (
								<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/25 bg-gradient-to-r from-slate-950 via-black to-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-glow">
									LIMITLESS
								</span>
							) : null}
							<header className="mb-4 min-h-[84px]">
								<h4 className="text-lg font-semibold">{tier.title}</h4>
								<p className={`mt-1 text-xl font-bold ${priceColor}`}>{tier.price}</p>
							</header>
							<ul className={`mb-6 flex-1 space-y-2 ${listColor}`}>
								{tier.points.map((pt) => (
									<li key={pt} className="flex items-start gap-2.5">
										<span className={`mt-2.5 inline-block h-1.5 w-1.5 rounded-full ${bullet}`} aria-hidden="true" />
										<span className="leading-relaxed">{pt}</span>
									</li>
								))}
							</ul>
							{tier.ctaTo ? (
								<Link
									to={tier.ctaTo}
									className={`mt-auto w-full rounded-md px-4 py-2.5 text-center font-semibold shadow-glow ${ctaBase}`}
									aria-label={`${tier.title}: ${tier.actionLabel}`}
								>
									{tier.actionLabel}
								</Link>
							) : (
								<a
									href="#"
									onClick={(e) => e.preventDefault()}
									className={`mt-auto w-full rounded-md px-4 py-2.5 text-center font-semibold shadow-glow ${ctaBase}`}
									aria-label={`${tier.title}: ${tier.actionLabel}`}
								>
									{tier.actionLabel}
								</a>
							)}
						</motion.article>
					);
				})}
			</div>
			<div className="mt-4 space-y-1 text-xs text-white/60">
				<p>
					* Poplatok za lekciu je jednorazový. Do finálnej ceny sa môžu počítať aj iné poplatky. Kompletný cenník nájdete na{' '}
					<Link className="underline hover:text-white focus-visible:text-white" to="/cennik">
						cenník
					</Link>
					.
				</p>
				<p>** Pri štandardných podmienkach – 1. predmet, hladká spolupráca, žiadne grafické zmeny a pod.</p>
			</div>
		</div>
	);
}


