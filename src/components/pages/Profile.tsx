import React, { useState } from "react";
import { LoadingSpinner } from "../ui/Spinner";
import { PageProps } from "@/interfaces/pageProp";
import { File, LogOut, Settings, User } from "lucide-react";

interface User {
    name: string;
    email: string;
    joinDate: Date;
}

const Profile: React.FC<PageProps> = ({ isDarkMode, isMenuOpen }) => {
    const user: User = {
        name: "modi",
        email: "test@test.com",
        joinDate: new Date(2024),
    };

    const token = "user-auth-token"; // Placeholder for your token

    return (
        <div
            className={`flex ${isMenuOpen && "translate-x-24"} flex-col bg-gray-100 dark:bg-gray-800 transition-all duration-300 flex-grow min-h-screen`}
        >
            {/* Top Navigation Menu */}
            <header className={`bg-white dark:bg-gray-900 p-5 shadow-md`}>
                <ul className="flex justify-around items-center space-x-8">
                    <li>
                        <a
                            href="#"
                            className={`p-3 rounded-full transition-colors duration-200 ${
                                isDarkMode
                                    ? "text-white hover:bg-gray-700"
                                    : "text-gray-700 hover:bg-gray-200"
                            } flex items-center justify-center`}
                        >
                            <User size={28} /> {/* User Icon */}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`p-3 rounded-full transition-colors duration-200 ${
                                isDarkMode
                                    ? "text-white hover:bg-gray-700"
                                    : "text-gray-700 hover:bg-gray-200"
                            } flex items-center justify-center`}
                        >
                            <File size={28} /> {/* Document Icon */}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`p-3 rounded-full transition-colors duration-200 ${
                                isDarkMode
                                    ? "text-white hover:bg-gray-700"
                                    : "text-gray-700 hover:bg-gray-200"
                            } flex items-center justify-center`}
                        >
                            <Settings size={28} /> {/* Settings Icon */}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`p-3 rounded-full transition-colors duration-200 ${
                                isDarkMode
                                    ? "text-white hover:bg-gray-700"
                                    : "text-gray-700 hover:bg-gray-200"
                            } flex items-center justify-center`}
                        >
                            <LogOut size={28} /> {/* Logout Icon */}
                        </a>
                    </li>
                </ul>
            </header>

            {/* Main Content */}
            <div className="flex flex-col flex-grow p-5">
                {/* User Info Section */}
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
                            <span className="font-medium">Email:</span>{" "}
                            {user.email}
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
                {/* <section className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
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
                </section> */}
            </div>
        </div>
    );
};

export default Profile;
