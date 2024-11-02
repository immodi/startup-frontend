import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, Zap } from "lucide-react";

const LandingFeatures: React.FC = () => {
    return (
        <section className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[#4A00E0] dark:text-[#FFF]">
                Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="dark:bg-gray-900">
                    <CardContent className="p-6">
                        <Zap className="w-12 h-12 mb-4 mx-auto text-[#4A00E0] dark:text-[#FFF]" />
                        <h3 className="text-xl font-semibold mb-2 text-[#4A00E0] dark:text-[#FFF]">
                            Fast Generation
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Create professional PDFs in seconds, not hours.
                        </p>
                    </CardContent>
                </Card>
                <Card className="dark:bg-gray-900">
                    <CardContent className="p-6">
                        <FileText className="w-12 h-12 mb-4 mx-auto text-[#4A00E0] dark:text-[#FFF]" />
                        <h3 className="text-xl font-semibold mb-2 text-[#4A00E0] dark:text-[#FFF]">
                            Custom Templates
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Choose from a variety of templates or create your
                            own.
                        </p>
                    </CardContent>
                </Card>
                <Card className="dark:bg-gray-900">
                    <CardContent className="p-6">
                        <Check className="w-12 h-12 mb-4 mx-auto text-[#4A00E0] dark:text-[#FFF]" />
                        <h3 className="text-xl font-semibold mb-2 text-[#4A00E0] dark:text-[#FFF]">
                            AI-Powered Content
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Generate high-quality content tailored to your
                            needs.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default LandingFeatures;
