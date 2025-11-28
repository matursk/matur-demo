import FadeOnScroll from '../components/FadeOnScroll';
import { Link } from 'react-router-dom';

const coreFees = [
	{
		title: 'Základné licencie',
		price: '15€ / licencia',
		details: 'Pripravený obsah s okamžitou aktiváciou a štandardnou podporou.',
	},
	{
		title: 'Prémiové licencie',
		price: '20€ / licencia',
		details: 'Obsah na mieru podľa sylabu školy vrátane revízií a projektového manažmentu.',
	},
	{
		title: 'Pridané lekcie',
		price: '5€ za lekciu (jednorazovo)',
		details: 'Účtujeme jednorazovo za každú novú lekciu, ktorú pripravujeme exkluzívne pre vašu školu.',
	},
];

const extraFees = [
	{ label: 'Expresná produkcia (do 10 dní)', price: 'od 150€' },
	{ label: 'Rozšírená grafika, video a motion dizajn', price: 'podľa rozsahu' },
	{ label: 'Dodatočné revízie nad rámec balíka', price: '35€ / hod.' },
	{ label: 'Preklady a titulky (AJ, NJ, HU)', price: '25€ / normostranu' },
	{ label: 'Integrácia do LMS školy (Moodle, MS Teams…)', price: 'od 200€' },
	{ label: 'Workshop / školenie učiteľov', price: '80€ / hod.' },
	{ label: 'Prvá konzultácia na mieste školy', price: '0€' },
	{ label: 'Ďalšie konzultácie na mieste (iba doprava)', price: '0,45€ / km' },
	{ label: 'Licencie na prémiové fotobanky a 3D prvky', price: 'podľa licencie' },
];

export default function Cennik() {
	return (
		<main className="relative z-10 py-16 md:py-24 px-6 md:px-10 lg:px-16">
			<section aria-labelledby="pricing-details">
				<h1 id="pricing-details" className="sr-only">
					Kompletný cenník
				</h1>
				<FadeOnScroll>
					<div className="mx-auto max-w-5xl space-y-10">
						<header className="text-center">
							<p className="text-sm uppercase tracking-wider text-white/60">Cenník</p>
							<h2 className="mt-2 text-3xl font-semibold">Ako počítame cenu</h2>
							<p className="mt-3 text-white/70">
								Nižšie nájdete orientačné ceny za licencie a doplnkové služby. Finálnu cenu vždy potvrdzujeme v záväznej ponuke podľa rozsahu
								a požadovaného termínu dodania.
							</p>
						</header>

						<div className="glass rounded-2xl p-6 shadow-glass">
							<h3 className="text-lg font-semibold">Licencie a lekcie</h3>
							<div className="mt-5 grid gap-4 md:grid-cols-3">
								{coreFees.map((fee) => (
									<div key={fee.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
										<p className="text-sm uppercase tracking-wide text-white/60">{fee.title}</p>
										<p className="mt-2 text-2xl font-semibold text-primary">{fee.price}</p>
										<p className="mt-3 text-sm text-white/75 leading-relaxed">{fee.details}</p>
									</div>
								))}
							</div>
							<p className="mt-4 text-xs text-white/60">
								Prémiové licencie vyžadujú minimálne 30 platených licencií. Poplatok za lekciu je jednorazový a platí pre každú novú lekciu v
								rámci prémiového obsahu.
							</p>
						</div>

						<div className="glass rounded-2xl p-6 shadow-glass">
							<h3 className="text-lg font-semibold">Ďalšie poplatky</h3>
							<ul className="mt-4 space-y-3 text-white/85">
								{extraFees.map((item) => (
									<li key={item.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
										<span>{item.label}</span>
										<span className="font-semibold text-primary">{item.price}</span>
									</li>
								))}
							</ul>
							<p className="mt-4 text-xs text-white/60">
								Tieto položky pripočítavame iba v prípade, že si ich klient vyžiada alebo sú nutné na dodanie projektu v dohodnutej kvalite a
								čase. Prvá konzultácia na mieste školy je vždy zdarma; pri ďalších konzultáciách účtujeme len cestovné 0,45€ / km a čas na mieste
								je bez poplatku.
							</p>
						</div>

						<div className="glass rounded-2xl p-6 shadow-glass text-center">
							<p className="text-sm text-white/75">
								Potrebujete presnú kalkuláciu? Zašlite parametre cez{' '}
								<Link className="font-semibold underline hover:text-white focus-visible:text-white" to="/objednavka/premium">
									formulár prémiových licencií
								</Link>{' '}
								alebo nám napíšte na{' '}
								<a className="font-semibold underline hover:text-white focus-visible:text-white" href="mailto:podpora@matur.sk">
									podpora@matur.sk
								</a>
								.
							</p>
						</div>
					</div>
				</FadeOnScroll>
			</section>
		</main>
	);
}

