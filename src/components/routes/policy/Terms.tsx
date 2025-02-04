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

            {/* Section 1: Acceptance of Terms */}
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

            {/* Section 2: Use of Services */}
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

            {/* Section 3: Intellectual Property */}
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

            {/* Section 4: Termination */}
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

            {/* Section 5: Consumer Right to Cancel */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    5. Consumer Right to Cancel
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    If you are a Consumer and unless the below exception
                    applies, you have the right to cancel this Agreement and
                    return the Product within 14 days without giving any reason.
                    The cancellation period will expire after 14 days from the
                    day after completion of the Transaction. To meet the
                    cancellation deadline, it is sufficient that you send us
                    your communication concerning your exercise of the
                    cancellation right before the expiration of the 14 day
                    period.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    To cancel your order, you must inform Paddle of your
                    decision. To ensure immediate processing, please do so by
                    contacting Paddle{" "}
                    <a
                        href="https://paddle.net/contact"
                        className="text-blue-500 hover:underline"
                    >
                        here
                    </a>
                    . Please note that in respect of subscription services your
                    right to cancel is only present following the initial
                    subscription and not upon each automatic renewal.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    You also have the right to inform us using the model
                    cancellation form below or by making any other clear,
                    unambiguous statement through our available communication
                    channels. If you use Paddle's{" "}
                    <a
                        href="https://paddle.net/contact"
                        className="text-blue-500 hover:underline"
                    >
                        “Contact Us” form online
                    </a>
                    , they will communicate acknowledgment of receipt of your
                    cancellation request to you without delay.
                </p>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                    <p className="text-lg font-semibold mb-2">
                        To Paddle, Buyer Support Team
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        I hereby give notice that I cancel my contract of sale
                        of the following Products
                        <br />
                        Ordered on
                        <br />
                        Name of consumer(s),
                        <br />
                        Address of consumer(s),
                        <br />
                        Signature of consumer(s) (only if this form is notified
                        on paper),
                        <br />
                        Date
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mt-6 mb-2">
                    Effect of Cancellation
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    If you cancel this Agreement as permitted above, we will
                    reimburse to you all payments received from you.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    We will make the reimbursement without undue delay, and not
                    later than 14 days after the day on which we are informed
                    about your decision to cancel this Agreement.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    We will make the reimbursement using the same means of
                    payment as you used for the initial transaction and you will
                    not incur any fees as a result of the reimbursement.
                </p>

                <h3 className="text-xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mt-6 mb-2">
                    Exception to the Right to Cancel
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    Your right as a Consumer to cancel your order does not apply
                    to the supply of Digital Content that you have started to
                    download, stream or otherwise acquire and to Products which
                    you have had the benefit of.
                </p>

                <h3 className="text-xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mt-6 mb-2">
                    Refund Policy
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    Refunds are provided at the sole discretion of Paddle and on
                    a case-by-case basis and may be refused. Paddle will refuse
                    a refund request if we find evidence of fraud, refund abuse,
                    or other manipulative behaviour that entitles Paddle to
                    counterclaim the refund.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    This does not affect your rights as a Consumer in relation
                    to Products which are not as described, faulty or not fit
                    for purpose.
                </p>
            </section>

            {/* Section 6: Limitation of Liability */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    6. Limitation of Liability
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    GenPDF is provided "as is" without warranties of any kind.
                    We are not liable for any direct, indirect, incidental, or
                    consequential damages resulting from your use of our
                    services.
                </p>
            </section>

            {/* Section 7: Changes to Terms */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    7. Changes to Terms
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    We may update these Terms from time to time. Any changes
                    will be effective immediately upon posting. It is your
                    responsibility to review the Terms regularly.
                </p>
            </section>

            {/* Section 8: Contact Us */}
            <section>
                <h2 className="text-2xl font-semibold text-[#4A00E0] dark:text-[#7A1CAC] mb-4">
                    8. Contact Us
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
