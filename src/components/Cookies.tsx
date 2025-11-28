import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function sanitizeHtml(html: string): string {
	// Very small sanitizer: allow only basic tags and safe attributes on <a>.
	const allowedTags = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'STRONG', 'EM', 'A', 'BR']);
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	const walk = (node: Node): Node | null => {
		if (node.nodeType === Node.TEXT_NODE) return node.cloneNode(true);
		if (node.nodeType !== Node.ELEMENT_NODE) return null;

		const el = node as HTMLElement;
		const tag = el.tagName;

		if (!allowedTags.has(tag)) {
			// Flatten unknown tags by recursing into their children
			const frag = document.createDocumentFragment();
			el.childNodes.forEach((child) => {
				const cleaned = walk(child);
				if (cleaned) frag.appendChild(cleaned);
			});
			return frag;
		}

		const safe = document.createElement(tag.toLowerCase());
		// Preserve only safe attributes for anchors
		if (tag === 'A') {
			const href = el.getAttribute('href') || '';
			if (href) {
				safe.setAttribute('href', href);
				// Force safe target/rel for external links
				if (/^https?:\/\//i.test(href)) {
					safe.setAttribute('target', '_blank');
					safe.setAttribute('rel', 'noopener noreferrer');
				}
			}
		}

		el.childNodes.forEach((child) => {
			const cleaned = walk(child);
			if (cleaned) safe.appendChild(cleaned);
		});
		return safe;
	};

	const container = document.createElement('div');
	const source = doc.body;
	source.childNodes.forEach((child) => {
		const cleaned = walk(child);
		if (cleaned) container.appendChild(cleaned);
	});
	return container.innerHTML;
}

export default function Cookies() {
	const [html, setHtml] = useState<string | null>(null);
	const [plainText, setPlainText] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			// 1) Try same-origin static copy first (drop a full HTML into public/cookies-source.html)
			try {
				const local = await fetch('/cookies-source.html', { credentials: 'same-origin' });
				if (!cancelled && local.ok) {
					const localHtml = await local.text();
					setHtml(sanitizeHtml(localHtml));
					return;
				}
			} catch {}

			// 2) Attempt direct fetch (likely blocked by CORS, but try once)
			try {
				const res = await fetch('https://matur.sk/cookie-policy', { mode: 'cors' });
				if (!cancelled && res.ok) {
					const text = await res.text();
					// Try to extract main/article if present
					const parser = new DOMParser();
					const doc = parser.parseFromString(text, 'text/html');
					const candidate =
						doc.querySelector('main, article, [role="main"], #main, .content, .container') || doc.body;
					const cleaned = sanitizeHtml(candidate.innerHTML || '');
					setHtml(cleaned || null);
					if (cleaned) return;
				}
			} catch {}

			// 3) Fallback to CORS-friendly reader (text-only)
			try {
				// Try HTTPS target first, then HTTP (some sites redirect differently)
				const res1 = await fetch('https://r.jina.ai/https://matur.sk/cookie-policy');
				if (!cancelled && res1.ok) {
					const text = await res1.text();
					setPlainText(text.trim());
					return;
				}
				const res2 = await fetch('https://r.jina.ai/http://matur.sk/cookie-policy');
				if (!cancelled && res2.ok) {
					const text = await res2.text();
					setPlainText(text.trim());
					return;
				}
			} catch {}

			// 4) If everything fails, show error
			if (!cancelled) setError('Nepodarilo sa načítať zásady cookies.');
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	const header = useMemo(
		() => (
			<header className="space-y-3">
				<h2 id="cookies-title" className="text-2xl md:text-3xl font-semibold">
					Zásady používania súborov cookies
				</h2>
			</header>
		),
		[],
	);

	return (
		<div className="mx-auto max-w-4xl space-y-8">
			{header}

			<motion.section
				className="glass rounded-xl p-6 shadow-glass"
				initial={{ opacity: 0, y: 12 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
			>
				{!html && !plainText && !error && <p className="text-white/80">Načítavam obsah…</p>}
				{error && (
					<p className="text-white/80">
						{error}{' '}
						<a className="text-primary hover:underline" href="https://matur.sk/cookie-policy" target="_blank" rel="noreferrer">
							Otvoriť pôvodný dokument
						</a>
					</p>
				)}
				{html && <div className="policy-content" dangerouslySetInnerHTML={{ __html: html }} />}
				{!html && plainText && (
					<pre className="policy-content whitespace-pre-wrap text-white/85">{plainText}</pre>
				)}
			</motion.section>
		</div>
	);
}


