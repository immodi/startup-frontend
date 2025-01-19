import { HomeContext, HomeContextInterface } from "@/components/util/context";
import React, { useContext } from "react";

const TermsOfService: React.FC = () => {
    const homeContext = useContext(HomeContext) as HomeContextInterface;

    const { isMenuOpen } = homeContext;
    return (
        <div
            className={`${isMenuOpen && "translate-x-24"} transition duration-300 bg-gray-100 dark:bg-gray-800 w-full dark:text-white text-gray-800 mx-auto px-6 py-8`}
        >
            <h1 className="text-4xl font-extrabold text-center text-[#4A00E0] dark:text-[#7A1CAC] mb-8">
                Terms of Service
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Welcome to{" "}
                <span className="font-semibold text-[#4A00E0] dark:text-[#7A1CAC]">
                    GenPDF
                </span>
                ! These Terms of Service ("Terms") govern your use of our
                website and services. By accessing or using our services, you
                agree to be bound by these Terms.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    1. Acceptance of Terms
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    By using GenPDF, you acknowledge that you have read,
                    understood, and agree to these Terms. If you do not agree,
                    you must not use our services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    2. Use of Services
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    You agree to use our services only for lawful purposes and
                    in compliance with all applicable laws and regulations. You
                    must not:
                </p>
                <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="text-lg">
                        Engage in unauthorized access, use, or interference with
                        our services.
                    </li>
                    <li className="text-lg">
                        Submit false, misleading, or illegal content.
                    </li>
                    <li className="text-lg">
                        Attempt to disrupt or damage the services or
                        infrastructure.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    3. Intellectual Property
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    All content, trademarks, and logos on GenPDF are the
                    property of their respective owners. You may not use or
                    reproduce them without prior written consent.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    4. Termination
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    We reserve the right to terminate or suspend your access to
                    our services at any time, without notice, for conduct that
                    violates these Terms or is otherwise harmful to our services
                    or users.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    5. Limitation of Liability
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    GenPDF is provided "as is" without warranties of any kind.
                    We are not liable for any direct, indirect, incidental, or
                    consequential damages resulting from your use of our
                    services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    6. Changes to Terms
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    We may update these Terms from time to time. Any changes
                    will be effective immediately upon posting. It is your
                    responsibility to review the Terms regularly.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    7. Contact Us
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    If you have any questions about these Terms, please contact
                    us at{" "}
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

export default TermsOfService;
