import { ComponentsProps } from "./profileInterfaces";

const SettingsComponent: React.FC<ComponentsProps> = ({ isDarkMode }) => {
    return (
        <div className="flex flex-col flex-grow p-5">
            <section
                className={`bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-5`}
            >
                <h2
                    className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-[#4A00E0]"}`}
                >
                    Settings
                </h2>

                <div
                    className={`${isDarkMode ? "text-white" : "text-gray-700"} mt-4`}
                >
                    This is the settings page. Content will be added here.
                </div>
            </section>
        </div>
    );
};

export default SettingsComponent;
