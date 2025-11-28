export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="relative z-10 border-t border-white/10 py-10 text-center text-sm text-white/70">
			<div className="mx-auto max-w-6xl px-6">
				<p>
					© {year} Matur •{' '}
					<a className="underline hover:text-white focus-visible:text-white" href="mailto:podpora@matur.sk">
						podpora@matur.sk
					</a>{' '}
					• <a className="underline hover:text-white focus-visible:text-white" href="#cookies">Cookies</a> •{' '}
					<a className="underline hover:text-white focus-visible:text-white" href="/cennik">
						Cenník
					</a>{' '}
					•{' '}
					<a className="underline hover:text-white focus-visible:text-white" href="/podmienky-viazanosti">
						Podmienky viazanosti
					</a>
				</p>
				<div className="mt-3 flex justify-center gap-4">
					<a aria-label="Twitter" className="text-white/60 hover:text-white focus-visible:text-white" href="#" role="link">X</a>
					<a aria-label="Instagram" className="text-white/60 hover:text-white focus-visible:text-white" href="#" role="link">IG</a>
					<a aria-label="Facebook" className="text-white/60 hover:text-white focus-visible:text-white" href="#" role="link">FB</a>
				</div>
			</div>
		</footer>
	);
}








