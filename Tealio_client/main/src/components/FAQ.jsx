import React, { useState } from 'react';

const FAQ = () => {
    const [open, setOpen] = useState(null);

    const toggleFAQ = (index) => {
        setOpen(open === index ? null : index);
    };

    return (
        <section className="p-4">
            <h2 className="text-xl font-bold mb-4 text-center">FAQs</h2>
            <div className="faq mb-4">
                <h3 className="text-lg font-semibold cursor-pointer" onClick={() => toggleFAQ(0)}>
                    Where does my tea come from?
                    <span className="ml-2">{open === 0 ? '▲' : '▼'}</span>
                </h3>
                {open === 0 && <p>Our teas are sourced from the finest tea gardens in China, India, Sri Lanka, and Japan.</p>}
            </div>
            <div className="faq mb-4">
                <h3 className="text-lg font-semibold cursor-pointer" onClick={() => toggleFAQ(1)}>
                    How should I store my tea?
                    <span className="ml-2">{open === 1 ? '▲' : '▼'}</span>
                </h3>
                {open === 1 && <p>Tea should be stored in a cool, dry place away from direct sunlight and strong odors.</p>}
            </div>
            <div className="faq mb-4">
                <h3 className="text-lg font-semibold cursor-pointer" onClick={() => toggleFAQ(2)}>
                    What is the best way to brew tea?
                    <span className="ml-2">{open === 2 ? '▲' : '▼'}</span>
                </h3>
                {open === 2 && <p>Each type of tea has its own optimal brewing method. Generally, use fresh, filtered water and steep for the recommended time on the package.</p>}
            </div>
            <div className="faq mb-4">
                <h3 className="text-lg font-semibold cursor-pointer" onClick={() => toggleFAQ(3)}>
                    Do you offer organic teas?
                    <span className="ml-2">{open === 3 ? '▲' : '▼'}</span>
                </h3>
                {open === 3 && <p>Yes, we offer a selection of organic teas. Look for the organic label on our product listings.</p>}
            </div>
        </section>
    );
};

export default FAQ;
