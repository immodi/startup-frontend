import { ComponentsProps } from "./profileInterfaces";

const ProfileComponent: React.FC<ComponentsProps> = ({ user, isDarkMode }) => {
    return (
        <div className="flex flex-col flex-grow p-5">
            <section className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-5">
                <h2
                    className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-[#4A00E0]"}`}
                >
                    Welcome, {user.name}
                </h2>
                <div className="flex flex-col space-y-2">
                    <p
                        className={`${isDarkMode ? "text-white" : "text-gray-700"}`}
                    >
                        <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p
                        className={`${isDarkMode ? "text-white" : "text-gray-700"}`}
                    >
                        <span className="font-medium">Joined on:</span>{" "}
                        {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h2
                    className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-[#4A00E0]"}`}
                >
                    Recent Activity
                </h2>
                <ul className="space-y-3">
                    {user.recentActivities.map((activity, index) => (
                        <li
                            key={index}
                            className={`${isDarkMode ? "text-white" : "text-gray-700"} p-3 border-b dark:border-gray-600`}
                        >
                            {activity}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ProfileComponent;
