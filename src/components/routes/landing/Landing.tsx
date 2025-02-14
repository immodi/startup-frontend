import { Context, ContextInterface } from "@/components/util/context";
import { isFirstTimeUser } from "@/helpers/auth/isFirstTimeUser";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageHeader from "./landing-components/LandingHeader";
import LandingTitle from "./landing-components/LandingTitle";
import { LoadingSpinner } from "@/components/ui/Spinner";

interface StepsInterface {
    title: string;
    description: string;
    videoSrc: string;
}

const LandingPage: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const navigate = useNavigate();
    const { toggleDarkMode } = context;
    const isDarkMode = context.localState.isDarkMode;

    useEffect(() => {
        if (!isFirstTimeUser()) {
            navigate("/home", { replace: true });
        }
    }, []);

    const steps: StepsInterface[] = [
        {
            title: "1. Select a Template",
            description:
                "Browse and choose from a variety of pre-designed templates to start creating your document quickly.",
            videoSrc:
                "https://etfpfh256n.ufs.sh/f/V9SjqVBFCIKnlAlyIdPMlP5SiQVyYHtCTWref1xg3LBGoKpk",
        },
        {
            title: "2. Custom Design (Optional)",
            description:
                "Not satisfied with existing templates? Use our Designer tab to create your own custom template from scratch.",
            videoSrc:
                "https://etfpfh256n.ufs.sh/f/V9SjqVBFCIKntoCZTJwqO4UY1CAZWi7oVm92kxdGpQwRgeJf",
        },
        {
            title: "3. Export Your Template (Optional)",
            description:
                "After designing your custom template, export it for future use or modifications.",
            videoSrc:
                "https://etfpfh256n.ufs.sh/f/V9SjqVBFCIKnAjiulJRXnBebRFpYx8HjIEQa4l5ofMNUCD3k",
        },
        {
            title: "4. Fill Your Content",
            description:
                "Use our simple text form to input exactly what you want in your document.",
            videoSrc:
                "https://etfpfh256n.ufs.sh/f/V9SjqVBFCIKnwQAOU2Tn6PHVr8s9jqhezU5LdNROYmxJBKfX",
        },
        {
            title: "5. Generate PDF",
            description:
                "Click the generate button and let our system process your request. Your PDF will be ready for download shortly.",
            videoSrc:
                "https://etfpfh256n.ufs.sh/f/V9SjqVBFCIKnJBzI7Kt6ftysr1kcon7ITRvZ4DYNwezB5VbW",
        },
        {
            title: "6. Access Previous Files",
            description:
                "Easily download any of your previously generated PDF files directly from your profile section.",
            videoSrc:
                "https://etfpfh256n.ufs.sh/f/V9SjqVBFCIKnuwE82EUJI38FfYtoQqL4xWO65ZTVylzXAuEG",
        },
    ];

    return (
        <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
            <div className="bg-gray-100 dark:bg-gray-800 transition-all duration-300">
                <LandingPageHeader
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                <main className="container mx-auto px-6 py-12">
                    {/* Catchy Header Banner */}
                    <LandingTitle />

                    {/* Steps Section */}
                    {StepsComponent(steps)}

                    {/* PDF Preview Section */}
                    <div className="mt-32 text-center">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            See It In Action
                        </h3>
                        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-4 rounded-lg shadow-xl">
                            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                                <iframe
                                    src="https://etfpfh256n.ufs.sh/f/V9SjqVBFCIKn5PPoug0dhEFaYzX5KT6pP2uqt81eQMLgb3GS"
                                    className="w-full h-96"
                                    title="PDF Preview"
                                >
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Your browser does not support PDF
                                        previews.
                                        <a
                                            href="https://etfpfh256n.ufs.sh/f/V9SjqVBFCIKn5PPoug0dhEFaYzX5KT6pP2uqt81eQMLgb3GS"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Download the PDF
                                        </a>
                                    </p>
                                </iframe>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
                                    Example of a generated PDF document
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                * Actual PDF output may vary based on template
                                and content
                            </p>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer
                className={`w-full bg-white dark:bg-gray-900 shadow p-4 text-center text-gray-700 dark:text-gray-300 transition duration-300`}
            >
                <p>
                    © {new Date().getFullYear()} GenPDF. All Rights Reserved.
                </p>
                <div className="mt-2">
                    <a
                        href="/privacy-policy"
                        className="text-blue-500 dark:text-blue-400 hover:underline mx-2"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="/terms-of-service"
                        className="text-blue-500 dark:text-blue-400 hover:underline mx-2"
                    >
                        Terms of Service
                    </a>
                </div>
            </footer>
        </div>
    );
};

// Inside your component
const StepsComponent = (steps: StepsInterface[]) => {
    const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
    const [isLoadingVideos, setIsLoadingVideos] = useState(true);
    const handleFullscreen = (index: number) => {
        const video: HTMLVideoElement | null = videoRefs.current[index];
        if (video) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        }
    };

    function toogleLoadingState() {
        setIsLoadingVideos(!isLoadingVideos);
    }

    useEffect(() => {setIsLoadingVideos(false)},[])

    return (
        <div className="space-y-24">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""} items-center gap-8`}
                >
                    {/* Video Container */}
                    <div className="w-full md:w-1/2">
                        <div className="relative pt-[56.25%]">
                            <video
                                onLoadedData={() => {}}
                                ref={(el) => (videoRefs.current[index] = el)}
                                className={`absolute ${isLoadingVideos && "hidden"} top-0 left-0 w-full h-full object-contain`}
                                muted
                                loop
                                autoPlay
                                playsInline
                            >
                                <source src={step.videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div
                                className={`w-full h-full flex justify-center items-center ${!isLoadingVideos && "hidden"}`}
                            >
                                <LoadingSpinner className="w-20 h-20" />
                            </div>

                            {/* Fullscreen Button */}
                            <button
                                onClick={() => handleFullscreen(index)}
                                className={`absolute bottom-2 right-2 z-10 bg-black/50 text-white rounded-lg px-3 py-1 hover:bg-black/80 transition-colors cursor-pointer  ${isLoadingVideos && "hidden"}`}
                                aria-label="Fullscreen"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Rest of the component remains the same */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {step.title}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LandingPage;
