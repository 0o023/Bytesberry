import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="container mx-auto px-20 font-serif py-8">
            <h1 className="text-3xl font-bold  text-center mb-8">Tealio's Refund Policy</h1>
            <div className="text-lg leading-relaxed">
                <p>At Tealio, we take pride in providing you with the finest teas and accessories. If for any reason you are not completely satisfied with your purchase, we offer a straightforward Refund Policy to ensure your peace of mind. Please review the details below:</p>
                <ol className="list-decimal mt-6 mb-8 space-y-4">
                    <li><strong>Returns and Exchanges:</strong><br />
                        <p>Tea Products: We gladly accept returns or exchanges of unopened and unused tea products within 30 days of purchase. Simply reach out to our Customer Support team at <a href="mailto:support@tealio.com" className="text-teal-500">support@tealio.com</a> with your order details and reason for return. Once approved, we will provide instructions on how to proceed with your return or exchange.</p>
                        <p>Teaware and Accessories: Unopened and undamaged teaware and accessories may be returned or exchanged within 30 days of purchase. Please ensure the item is in its original packaging and accompanied by proof of purchase. Contact our Customer Support team to initiate the process.</p>
                    </li>
                    <li><strong>Refunds:</strong><br />
                        <p>Tea Products: If you are dissatisfied with the quality or flavor of our tea, please notify us within 30 days of purchase for a full refund or exchange. We may request additional details or feedback to improve our products and service.</p>
                        <p>Teaware and Accessories: Refunds for teaware and accessories will be issued upon receipt and inspection of the returned item. Once approved, refunds will be processed to the original payment method within 5-7 business days.</p>
                    </li>
                    <li><strong>Damaged or Defective Items:</strong><br />
                        <p>In the rare event that your order arrives damaged or defective, please inform us immediately upon receipt. We will promptly arrange for a replacement or issue a refund, depending on your preference. Please provide clear photos of the damaged or defective item for our records.</p>
                    </li>
                    <li><strong>How to Initiate a Return or Refund:</strong><br />
                        <p>To initiate a return, exchange, or refund, please contact our Customer Support team at <a href="mailto:support@tealio.com" className="text-teal-500">support@tealio.com</a> with your order number, details of the item(s) you wish to return, and the reason for return. Our team will guide you through the process and provide any necessary assistance.</p>
                    </li>
                    <li><strong>Conditions for Returns and Refunds:</strong><br />
                        <p>All returned items must be in their original packaging and condition, unused, and free from any signs of damage or alteration.</p>
                        <p>Shipping and handling charges are non-refundable, unless the return is due to an error on our part or a defective product.</p>
                        <p>Refunds will be processed to the original form of payment used for the purchase.</p>
                        <p>Please allow up to 10 business days for the refund to reflect in your account, depending on your financial institution's processing times.</p>
                    </li>
                </ol>
                <p className="mt-8">Thank you for choosing Tealio for your tea needs. Should you have any questions or require further assistance regarding our Refund Policy, please don't hesitate to contact our dedicated Customer Support team. We're here to ensure your tea experience with Tealio exceeds your expectations.</p>
            </div>
        </div>
    );
};

export default RefundPolicy;
