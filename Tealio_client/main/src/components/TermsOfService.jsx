import React from 'react';

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-20 py-8 font-serif">
            <h1 className="text-3xl font-bold text-center mb-8">Tealio's Terms of Service</h1>
            <div className="text-lg leading-relaxed">
                <p>Welcome to Tealio! Before you indulge in the world of our exquisite teas, please take a moment to review our Terms of Service. By accessing or using our website and services, you agree to comply with the following terms and conditions:</p>
                <ol className="list-decimal mt-6 mb-8 space-y-4">
                    <li><strong>Acceptance of Terms:</strong><br />
                        By accessing or using the Tealio website or services, you agree to be bound by these Terms of Service, our Privacy Policy, and any additional terms and conditions that may apply to specific services or features.
                    </li>
                    <li><strong>Account Registration:</strong><br />
                        Certain features of our website may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    </li>
                    <li><strong>Age Requirement:</strong><br />
                        You must be at least 18 years old to create an account and make purchases on our website. By using our services, you affirm that you are of legal age to enter into this agreement.
                    </li>
                    <li><strong>Product Information:</strong><br />
                        We make every effort to provide accurate and up-to-date information about our products, including descriptions, prices, and availability. However, we cannot guarantee that all information is error-free, and we reserve the right to correct any errors or inaccuracies.
                    </li>
                    <li><strong>Ordering and Payment:</strong><br />
                        By placing an order on our website, you agree to pay the specified price for the products and any applicable taxes and shipping fees. Payment can be made using the available payment methods accepted on our website.
                    </li>
                    <li><strong>Shipping and Delivery:</strong><br />
                        Our Shipping Policy governs the terms and conditions related to the shipping and delivery of your orders. Please review our Shipping Policy for more information.
                    </li>
                    <li><strong>Returns and Refunds:</strong><br />
                        Our Refund Policy outlines the terms and conditions for returns, exchanges, and refunds of products purchased from Tealio. By making a purchase, you agree to comply with our Refund Policy.
                    </li>
                    <li><strong>Intellectual Property:</strong><br />
                        The content and materials available on the Tealio website, including text, images, logos, and trademarks, are protected by copyright and other intellectual property laws. You agree not to use, reproduce, or distribute any content from our website without our express written permission.
                    </li>
                    <li><strong>Prohibited Activities:</strong><br />
                        You agree not to engage in any prohibited activities while using our website or services, including but not limited to: violating any laws or regulations, infringing upon the rights of others, or engaging in fraudulent or deceptive conduct.
                    </li>
                    <li><strong>Limitation of Liability:</strong><br />
                        Tealio shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services, even if we have been advised of the possibility of such damages.
                    </li>
                    <li><strong>Governing Law:</strong><br />
                        These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                    </li>
                    <li><strong>Changes to Terms:</strong><br />
                        Tealio reserves the right to update or modify these Terms of Service at any time without prior notice. Any changes will be effective immediately upon posting on our website. We encourage you to review these terms periodically for updates.
                    </li>
                </ol>
                <p>If you have any questions or concerns about our Terms of Service, please contact us at <a href="mailto:support@tealio.com" className="text-teal-500">support@tealio.com</a>. Thank you for choosing Tealio—we're excited to embark on a flavorful journey with you!</p>
            </div>
        </div>
    );
};

export default TermsOfService;
