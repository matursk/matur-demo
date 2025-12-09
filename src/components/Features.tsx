import { motion } from 'framer-motion';

const features = [
	{
		title: 'Maturitné okruhy a modelové zadania',
		desc: 'Lekcie sú tesne naviazané na otázky z maturít – s postupmi riešenia, vysvetlením správnych odpovedí a odporúčanou stratégiou.',
	},
	{
		title: 'Adaptívne cvičenia v 10/20/30-min blokoch',
		desc: 'Študenti si volia dĺžku session podľa rozvrhu, systém sleduje chyby a odporúča ďalší obsah, aby sa učili len to, čo potrebujú.',
	},
	{
		title: 'Inteligentné pripomienky a plánovanie',
		desc: 'Automatické notifikácie pripomenú dôležité termíny, testy či slabé témy a pomôžu vybudovať konzistentný rytmus prípravy.',
	},
	{
		title: 'Motivácia cez ciele, streaky a odmeny',
		desc: 'Denné ciele, série dní a virtuálne badge zvyšujú zapojenie, pričom učitelia okamžite vidia, kto potrebuje povzbudenie.',
	},
	{
		title: 'Prehľady pre vedenie a podporu',
		desc: 'Dashboardy ukazujú progres tried, najčastejšie chyby a odporúčané témy; náš tím reaguje na podnety školy prakticky v reálnom čase.',
	},
];

export default function Features() {
	return (
		<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{features.map((f) => (
				<motion.div
					key={f.title}
					className="glass group rounded-xl p-6 shadow-glass outline-none"
					whileHover={{ scale: 1.02 }}
					whileFocus={{ scale: 1.01 }}
					tabIndex={0}
					role="button"
					aria-label={`${f.title}: ${f.desc}`}
				>
					<div className="mb-3 flex items-center justify-between">
						<h3 className="text-lg font-semibold">{f.title}</h3>
						<motion.span
							className="h-2 w-2 rounded-full bg-primary/80"
							animate={{ scale: [1, 1.6, 1] }}
							transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
							aria-hidden="true"
						/>
					</div>
					<p className="text-white/80">{f.desc}</p>
					<motion.div
						className="mt-4 h-24 w-full overflow-hidden rounded-lg bg-white/5"
						initial={false}
						whileHover={{ boxShadow: '0 0 0 1px rgba(151,218,255,0.4), 0 0 24px rgba(72,183,255,0.25)' }}
						aria-hidden="true"
					>
						<motion.div
							className="h-full w-[200%] bg-[radial-gradient(circle_at_center,_rgba(72,183,255,0.35),_transparent_55%)]"
							animate={{ x: ['0%', '-50%'] }}
							transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
						/>
					</motion.div>
				</motion.div>
			))}
		</div>
	);
}





