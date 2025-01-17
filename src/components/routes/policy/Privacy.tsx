import { HomeContext, HomeContextInterface } from "@/components/util/context";
import React, { useContext } from "react";

const PrivacyPolicy: React.FC = () => {
    const homeContext = useContext(HomeContext) as HomeContextInterface;

    const { isMenuOpen } = homeContext;
    return (
        <div
            className={`${isMenuOpen && "translate-x-24"} transition duration-300 bg-gray-100 dark:bg-gray-800 w-full dark:text-white text-gray-800 mx-auto px-4 py-8`}
        >
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">
                Welcome to GenPDF! Your privacy is important to us. This Privacy
                Policy explains how we collect, use, and protect your
                information when you use our services.
            </p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                    1. Information We Collect
                </h2>
                <p>We collect the following types of information:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>
                        Personal information you provide, such as your name,
                        email, and payment details.
                    </li>
                    <li>
                        Usage data, such as the pages you visit and actions you
                        perform on our site.
                    </li>
                    <li>
                        Cookies and tracking technologies to enhance your
                        experience.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                    2. How We Use Your Information
                </h2>
                <p>We use your information to:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Provide and improve our services.</li>
                    <li>
                        Communicate with you about updates, offers, and support.
                    </li>
                    <li>Ensure the security of our platform.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                    3. How We Protect Your Information
                </h2>
                <p>
                    We use industry-standard security measures to protect your
                    information. However, no method of transmission over the
                    Internet is 100% secure, and we cannot guarantee absolute
                    security.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Access the information we hold about you.</li>
                    <li>Request corrections or updates to your information.</li>
                    <li>
                        Request deletion of your information, subject to legal
                        obligations.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                    5. Changes to This Privacy Policy
                </h2>
                <p>
                    We may update this Privacy Policy from time to time. Any
                    changes will be posted on this page with an updated revision
                    date.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please
                    contact us at{" "}
                    <a
                        href="mailto:admin@genpdf.xyz"
                        className="text-blue-500 hover:underline"
                    >
                        admin@genpdf.xyz
                    </a>
                    .
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
