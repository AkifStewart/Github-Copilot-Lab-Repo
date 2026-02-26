import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [request, setRequest] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowModal(true);
        setName('');
        setEmail('');
        setRequest('');
    };

    const handleContinue = () => {
        setShowModal(false);
    };

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="cart-container">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="review-form">
                            <label htmlFor="contact-name">Name</label>
                            <input
                                id="contact-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                required
                            />
                            <label htmlFor="contact-email">Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                required
                            />
                            <label htmlFor="contact-request">Request</label>
                            <textarea
                                id="contact-request"
                                value={request}
                                onChange={(e) => setRequest(e.target.value)}
                                placeholder="Your request"
                                required
                            />
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </main>
            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <p>Thank you for your message.</p>
                        <div className="checkout-modal-actions">
                            <button onClick={handleContinue}>Continue</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default ContactPage;
