import { useEffect } from 'react';
import Navbar from './components/Navbar';
import StarsBackground from './components/StarsBackground';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cookies from './components/Cookies';
import OrderBase from './pages/OrderBase';
import OrderPremium from './pages/OrderPremium';
import OrderCustom from './pages/OrderCustom';
import CommitmentTerms from './pages/CommitmentTerms';
import Cennik from './pages/Cennik';

export default function App() {
	useEffect(() => {
		const onCustomParallax = () => {};
		window.addEventListener('stars:parallax', onCustomParallax as EventListener);
		return () => window.removeEventListener('stars:parallax', onCustomParallax as EventListener);
	}, []);

	return (
		<div className="relative min-h-screen overflow-x-hidden">
			<StarsBackground />
			<Navbar />
			<div className="relative z-10">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/objednavka/zakladne" element={<OrderBase />} />
					<Route path="/objednavka/premium" element={<OrderPremium />} />
					<Route path="/objednavka/custom" element={<OrderCustom />} />
					<Route path="/podmienky-viazanosti" element={<CommitmentTerms />} />
					<Route path="/cennik" element={<Cennik />} />
					<Route
						path="/cookies"
						element={
							<main className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
								<Cookies />
							</main>
						}
					/>
				</Routes>
			</div>
			<Footer />
		</div>
	);
}



