import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import PromotionPage from './PromotionPage';
import { CartContext } from '../context/CartContext';

// Mock components
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

const mockCartContext = {
    cartItems: [],
    addToCart: vi.fn(),
    clearCart: vi.fn()
};

const mockNewArrival = {
    id: '1',
    name: 'Apple',
    description: 'A juicy red apple',
    price: 0.5,
    image: 'apple.png',
    inStock: true,
    isNewArrival: true,
    reviews: []
};

const mockSaleProduct = {
    id: '4',
    name: 'Pear',
    description: 'A sweet and juicy pear',
    price: 0.6,
    image: 'pear.png',
    inStock: true,
    onSale: true,
    salePrice: 0.45,
    reviews: []
};

const renderWithContext = () => {
    return render(
        <CartContext.Provider value={mockCartContext}>
            <PromotionPage />
        </CartContext.Provider>
    );
};

describe('PromotionPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows loading state initially', () => {
        vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
        renderWithContext();
        expect(screen.getByText('Loading promotions...')).toBeInTheDocument();
    });

    it('renders new arrivals and sale sections after loading', async () => {
        vi.stubGlobal('fetch', vi.fn((url: string) => {
            const fileName = (url as string).split('/').pop();
            const dataMap: Record<string, object> = {
                'apple.json': mockNewArrival,
                'grapes.json': { id: '2', name: 'Grapes', price: 2.5, inStock: true, reviews: [] },
                'orange.json': { id: '3', name: 'Orange', price: 0.75, inStock: false, reviews: [] },
                'pear.json': mockSaleProduct
            };
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(dataMap[fileName!] ?? {})
            });
        }));

        renderWithContext();

        await waitFor(() => {
            expect(screen.getByText('🌟 New Arrivals')).toBeInTheDocument();
            expect(screen.getByText('🏷️ On Sale')).toBeInTheDocument();
        });

        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Pear')).toBeInTheDocument();
    });

    it('displays sale price and original price for sale products', async () => {
        vi.stubGlobal('fetch', vi.fn((url: string) => {
            const fileName = (url as string).split('/').pop();
            const dataMap: Record<string, object> = {
                'apple.json': { id: '1', name: 'Apple', price: 0.5, inStock: true, reviews: [] },
                'grapes.json': { id: '2', name: 'Grapes', price: 2.5, inStock: true, reviews: [] },
                'orange.json': { id: '3', name: 'Orange', price: 0.75, inStock: false, reviews: [] },
                'pear.json': mockSaleProduct
            };
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(dataMap[fileName!] ?? {})
            });
        }));

        renderWithContext();

        await waitFor(() => {
            expect(screen.getByText('🏷️ On Sale')).toBeInTheDocument();
        });

        expect(screen.getByText('$0.60')).toBeInTheDocument();
        expect(screen.getByText('$0.45')).toBeInTheDocument();
    });

    it('shows empty message when no new arrivals exist', async () => {
        vi.stubGlobal('fetch', vi.fn((url: string) => {
            const fileName = (url as string).split('/').pop();
            const dataMap: Record<string, object> = {
                'apple.json': { id: '1', name: 'Apple', price: 0.5, inStock: true, reviews: [] },
                'grapes.json': { id: '2', name: 'Grapes', price: 2.5, inStock: true, reviews: [] },
                'orange.json': { id: '3', name: 'Orange', price: 0.75, inStock: false, reviews: [] },
                'pear.json': mockSaleProduct
            };
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(dataMap[fileName!] ?? {})
            });
        }));

        renderWithContext();

        await waitFor(() => {
            expect(screen.getByText('No new arrivals at the moment.')).toBeInTheDocument();
        });
    });
});
