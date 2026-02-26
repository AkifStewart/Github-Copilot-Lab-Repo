import { useState, useEffect, useContext } from 'react';
import { Product } from '../types';
import Header from './Header';
import Footer from './Footer';
import { CartContext } from '../context/CartContext';

const PromotionPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }

    const { addToCart } = cartContext;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productFiles = [
                    'apple.json',
                    'grapes.json',
                    'orange.json',
                    'pear.json'
                ];
                const productPromises = productFiles.map(async (file) => {
                    const response = await fetch(`products/${file}`);
                    if (!response.ok) throw new Error(`Failed to load ${file}`);
                    return await response.json();
                });
                const loadedProducts = await Promise.all(productPromises);
                setProducts(loadedProducts);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const newArrivals = products.filter((p) => p.isNewArrival);
    const saleProducts = products.filter((p) => p.onSale);

    if (loading) {
        return (
            <div className="app">
                <Header />
                <main className="main-content">
                    <div className="loading">Loading promotions...</div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="promotion-container">
                    <section className="promotion-section" aria-label="New Arrivals">
                        <h2>🌟 New Arrivals</h2>
                        {newArrivals.length === 0 ? (
                            <p className="promotion-empty">No new arrivals at the moment.</p>
                        ) : (
                            <div className="carousel">
                                {newArrivals.map((product) => (
                                    <div key={product.id || product.name} className="product-card carousel-card">
                                        {product.image && (
                                            <img
                                                src={`products/productImages/${product.image}`}
                                                alt={product.name}
                                                className="product-image"
                                            />
                                        )}
                                        <div className="product-info">
                                            <span className="badge badge-new">New</span>
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-price">${product.price.toFixed(2)}</p>
                                            {product.description && (
                                                <p className="product-description">{product.description}</p>
                                            )}
                                            <button
                                                onClick={() => addToCart(product)}
                                                className={`add-to-cart-btn ${product.inStock ? '' : 'disabled'}`}
                                                disabled={!product.inStock}
                                            >
                                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="promotion-section" aria-label="Sale Products">
                        <h2>🏷️ On Sale</h2>
                        {saleProducts.length === 0 ? (
                            <p className="promotion-empty">No sale products at the moment.</p>
                        ) : (
                            <div className="carousel">
                                {saleProducts.map((product) => (
                                    <div key={product.id || product.name} className="product-card carousel-card">
                                        {product.image && (
                                            <img
                                                src={`products/productImages/${product.image}`}
                                                alt={product.name}
                                                className="product-image"
                                            />
                                        )}
                                        <div className="product-info">
                                            <span className="badge badge-sale">Sale</span>
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-price">
                                                <span className="price-original">${product.price.toFixed(2)}</span>
                                                <span className="price-sale">${product.salePrice !== undefined ? product.salePrice.toFixed(2) : product.price.toFixed(2)}</span>
                                            </p>
                                            {product.description && (
                                                <p className="product-description">{product.description}</p>
                                            )}
                                            <button
                                                onClick={() => addToCart(product)}
                                                className={`add-to-cart-btn ${product.inStock ? '' : 'disabled'}`}
                                                disabled={!product.inStock}
                                            >
                                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PromotionPage;
