import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutPage from './AboutPage';

vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

describe('AboutPage', () => {
    it('renders the About Us heading', () => {
        render(<AboutPage />);
        expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument();
    });

    it('renders the company name', () => {
        render(<AboutPage />);
        expect(screen.getAllByText(/The Daily Harvest/i).length).toBeGreaterThan(0);
    });

    it('renders the header and footer', () => {
        render(<AboutPage />);
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
