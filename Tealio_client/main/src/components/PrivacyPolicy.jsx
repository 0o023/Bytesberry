// PrivacyPolicy.js
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-20 py-8 font-serif">
            <h1 className="text-3xl font-bold text-center mb-8">Tealio's Whispers of Privacy</h1>
            <div className="text-lg leading-relaxed">
                <p>Welcome to Tealio, where every sip of tea is accompanied by a whisper of privacy. We're passionate about not only crafting the finest teas but also safeguarding your personal information with the utmost care and dedication. Here's a peek into our world of privacy:</p>
                <ol className="list-decimal mt-6 mb-8">
                    <li><strong>Brewed with Care: Gathering Information</strong><br />
                        Just like selecting the finest tea leaves, we collect information with precision and care. When you interact with our website or services, we may gather personal details like your name, address, and payment information. But fear not, we handle your data as delicately as we do our tea leaves.
                    </li>
                    <li><strong>Infusing Flavors: How We Use Your Information</strong><br />
                        Your information isn't just data to us; it's the essence of our relationship. We use it to enhance your Tealio experience, from processing orders and providing support to personalizing your journey with us. Consider it a dash of honey in your cup, sweetening every interaction.
                    </li>
                    <li><strong>Blending Harmonies: Sharing Your Information</strong><br />
                        Just as teas blend harmoniously with complementary flavors, we may share your information with trusted partners. Whether it's to fulfill orders or improve our services, rest assured, your privacy remains our top priority. We only share what's necessary, like sharing a favorite tea blend with a friend.
                    </li>
                    <li><strong>Guarding the Tea Chest: Ensuring Data Security</strong><br />
                        Your privacy is the treasure we guard with unwavering dedication. We employ the latest security measures to protect your information from unauthorized access or tampering. Think of us as the vigilant guardians of your digital tea chest, ensuring your secrets remain safe and sound.
                    </li>
                    <li><strong>Sipping Choices: Your Control Over Your Information</strong><br />
                        Just as you control the steeping time of your tea, you have the power to manage your information with us. Feel free to update, access, or delete your details as you please. And if you prefer not to receive our occasional whispers, you can always opt-out of promotional communications.
                    </li>
                    <li><strong>Brewing New Recipes: Changes to Our Privacy Policy</strong><br />
                        Like a tea master refining their craft, we continually evolve our Privacy Policy to better serve you. Any changes will be as transparent as our brewing process, with updates posted on our website. We encourage you to stay tuned for the latest blend of privacy perfection.
                    </li>
                    <li><strong>Pouring Heartfelt Conversations: Reach Out to Us</strong><br />
                        Questions, concerns, or just want to share your tea stories? Our virtual doors are always open. Drop us a line at <a href="mailto:contact@tealio.com" className="text-teal-500">contact@tealio.com</a>, and we'll brew up a heartfelt conversation with you.
                    </li>
                </ol>
                <p className="mt-8">So, join us in raising a cup of privacy-infused tea to the delightful journey ahead. At Tealio, your privacy is not just a policy—it's the secret ingredient in every sip.</p>
            </div>
            <p className="text-sm text-gray-600 mt-8">
                <em>Note: Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.</em>
            </p>
        </div>
    );
};

export default PrivacyPolicy;
