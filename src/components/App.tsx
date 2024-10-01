import { useState } from "react";
import fileDownloader from "../helpers/fileDownloader";
import { LoadingSpinner } from "./ui/spinner";
import "../styles/app.css";

function App() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center flex-col ">
                <h1 className="text-3xl text-black2-400 font-bold">
                    Hello world!
                </h1>

                <div className="w-auto h-auto mt-6 flex items-center justify-center">
                    {!isLoading ? (
                        <button
                            onClick={() => {
                                setIsLoading(!isLoading);
                                fileDownloader(
                                    "pdf",
                                    "document",
                                    new Map([["title", "Hello, world!"]]),
                                    setIsLoading,
                                )
                                    .then((res) => {
                                        console.log(res);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }}
                        >
                            <span className="download-button bg-slate-300 p-2 rounded transition-all">
                                Download
                            </span>
                        </button>
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
