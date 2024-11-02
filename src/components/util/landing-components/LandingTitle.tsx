import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const LandingTitle: React.FC = () => {
    return (
        <section className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#4A00E0] dark:text-[#FFF]">
                Generate Professional PDFs in Seconds
            </h1>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
                Transform your ideas into beautifully formatted PDF documents
                with ease.
            </p>
            <Button
                size="lg"
                className="text-lg px-8 bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white"
            >
                Get Started <ArrowRight className="ml-2" />
            </Button>
        </section>
    );
};

export default LandingTitle;
