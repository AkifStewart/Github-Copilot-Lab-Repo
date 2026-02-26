import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ContactPage from './ContactPage';

// Mock components
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

const renderContactPage = () => render(<ContactPage />);

describe('ContactPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the contact form', () => {
        renderContactPage();

        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Request')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('shows thank you modal on submit and clears form', () => {
        renderContactPage();

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByLabelText('Request'), { target: { value: 'Please help me.' } });

        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText('Thank you for your message.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();

        // Form fields should be cleared
        expect(screen.getByLabelText('Name')).toHaveValue('');
        expect(screen.getByLabelText('Email')).toHaveValue('');
        expect(screen.getByLabelText('Request')).toHaveValue('');
    });

    it('closes the modal when Continue is clicked', () => {
        renderContactPage();

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByLabelText('Request'), { target: { value: 'Please help me.' } });

        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
        expect(screen.getByText('Thank you for your message.')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
        expect(screen.queryByText('Thank you for your message.')).not.toBeInTheDocument();
    });
});
