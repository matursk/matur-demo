import FadeOnScroll from '../components/FadeOnScroll';
import HeroStage from '../components/HeroStage';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Pricing from '../components/Pricing';

export default function Home() {
	return (
		<main id="main" className="relative z-10">
			<section aria-label="Hero sekcia">
				<HeroStage />
			</section>
			<section aria-labelledby="howitworks" className="py-24 md:py-32 px-6 md:px-10 lg:px-16">
				<h2 id="howitworks" className="sr-only">
					Ako to funguje
				</h2>
				<FadeOnScroll>
					<HowItWorks />
				</FadeOnScroll>
			</section>
			<section aria-labelledby="features" className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
				<h2 id="features" className="sr-only">
					Funkcie
				</h2>
				<FadeOnScroll>
					<Features />
				</FadeOnScroll>
			</section>
			<section aria-labelledby="pricing" className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
				<h2 id="pricing" className="sr-only">
					Cenník
				</h2>
				<FadeOnScroll>
					<Pricing />
				</FadeOnScroll>
			</section>
		</main>
	);
}


