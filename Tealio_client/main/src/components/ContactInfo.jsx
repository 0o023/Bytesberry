import React from 'react';

const ContactInfo = () => {
    return (
        <div className="container mx-auto px-20 py-8 font-serif">
            <h1 className="text-3xl font-bold text-center mb-8">Contact Tealio</h1>
            <div className="text-lg leading-relaxed">
                <p>For inquiries, assistance, or simply to share your tea experiences, Tealio welcomes your correspondence through the following channels:</p>
                <ol className="list-decimal mt-6 mb-8 space-y-4">
                    <li><strong>Telephone Support:</strong><br />
                        Should you have questions regarding our teas, brewing methods, or any other inquiries, please feel free to contact our Tea Support Line at <strong>8617350755-TEALOVE</strong>. Our knowledgeable tea experts are available to assist you Monday through Friday, from <strong>9:00 AM to 5:00 PM (IST)</strong>.
                    </li>
                    <li><strong>Email Communication:</strong><br />
                        For general inquiries, feedback, or potential collaborations, you may reach us via email at <strong>info@tealio.com</strong>. Rest assured, our team is committed to promptly addressing your messages with the utmost professionalism and care.
                    </li>
                    <li><strong>Social Media Engagement:</strong><br />
                        Engage with our vibrant tea community on Instagram, Facebook, and Twitter by following <strong>@TealioTea</strong>. Stay updated on the latest tea trends, exclusive offers, and brewing tips while interacting with fellow tea enthusiasts.
                    </li>
                    <li><strong>Visit Us:</strong><br />
                        Should you find yourself in the vicinity, we cordially invite you to visit our esteemed tea emporium located at <strong>Basnett Building, Below Janta Bhanvan DPH Complex,737101</strong>. Our doors are open, and we eagerly await the opportunity to share a cup of tea and meaningful conversation with you.
                    </li>
                </ol>
                <p className="mt-8">Your correspondence is of great importance to us at Tealio, and we extend our sincere gratitude for considering us as your tea purveyor of choice. We eagerly anticipate the opportunity to serve you and foster a harmonious relationship centered around our shared love for exceptional tea.</p>
            </div>
        </div>
    );
};

export default ContactInfo;
