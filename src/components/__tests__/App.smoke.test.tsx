import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

describe('App smoke test', () => {
	it('renders CTA link to APK', () => {
		render(<App />);
		const ctas = screen.getAllByRole('link', { name: /Stiahnuť preview \(APK\)/i });
		expect(ctas[0]).toHaveAttribute('href', 'https://release.matur.sk/matur-preview-0.5.2.apk');
	});
});








