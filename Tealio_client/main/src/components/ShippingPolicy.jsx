import React from 'react';

const ShippingPolicy = () => {
    return (
        <div className="container mx-auto px-20 font-serif py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Tealio's Shipping Policy</h1>
            <div className="text-lg leading-relaxed">
                <p>Tealio is committed to delivering the essence of our teas to every nook and cranny of India. Our Shipping Policy ensures a seamless journey from our tea gardens to your teapot:</p>
                <ol className="list-decimal mt-6 mb-8 space-y-4">
                    <li><strong>Shipping Destinations:</strong><br />
                        Tealio currently ships orders within India, ensuring that every corner of the country can enjoy our exquisite teas.
                    </li>
                    <li><strong>Order Processing Time:</strong><br />
                        Orders are swiftly processed and dispatched within 2-3 business days from the date of purchase. We prioritize efficiency to get your teas to you as quickly as possible.
                    </li>
                    <li><strong>Shipping Methods and Rates:</strong><br />
                        We offer standard shipping for all orders within India, with rates calculated based on the destination address and the weight of your items.
                    </li>
                    <li><strong>Estimated Delivery Times:</strong><br />
                        Estimated delivery times range from 3 to 7 business days from the date of dispatch, depending on your location. While we strive for timely deliveries, please note that external factors may occasionally affect these estimates.
                    </li>
                    <li><strong>Order Tracking:</strong><br />
                        Keep tabs on your shipment with our shipping confirmation email, which includes tracking information. Stay in the loop and anticipate the arrival of your cherished teas.
                    </li>
                    <li><strong>Shipping Address Accuracy:</strong><br />
                        Accurate shipping information is crucial. To avoid delays or issues, ensure your details are complete and correct when placing your order.
                    </li>
                    <li><strong>Shipping Notifications:</strong><br />
                        Receive timely updates throughout the shipping process, from order confirmation to dispatch and delivery confirmation. We keep you informed every step of the way.
                    </li>
                    <li><strong>Shipping Restrictions:</strong><br />
                        Certain items may have shipping limitations to specific regions within India due to logistical considerations. Review product descriptions and shipping information prior to purchase.
                    </li>
                </ol>
                <p className="mt-8">Thank you for choosing Tealio for your tea needs. With our efficient shipping process, we're dedicated to bringing the joy of tea to your doorstep, wherever you may be in India.</p>
            </div>
        </div>
    );
};

export default ShippingPolicy;
