import Header from './Header';
import Footer from './Footer';

const AboutPage = () => {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <h2>About Us</h2>
                <p>
                    Welcome to <strong>The Daily Harvest</strong> — your trusted source for fresh,
                    high-quality produce delivered straight to your door.
                </p>
                <p>
                    Founded with a passion for healthy living and sustainable farming, we partner
                    with local growers to bring you the finest fruits and vegetables every day.
                    Our mission is to make wholesome, nutritious food accessible to everyone.
                </p>
                <p>
                    We believe that great food starts with great ingredients. That is why we carefully
                    select every item in our store to ensure freshness, flavour, and value. Whether
                    you are stocking up on everyday staples or exploring something new, we have got
                    you covered.
                </p>
                <p>
                    Thank you for choosing The Daily Harvest. We look forward to being part of your
                    healthy lifestyle journey.
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
