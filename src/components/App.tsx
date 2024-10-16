import { useState } from "react";
import "../styles/app.css";
// import MainComponent from "./home/Home";
import { AuthPage } from "./auth/Auth";
import Home from "./home/Home";

function App() {
    const [authed, setAuthed] = useState(true);

    return authed ? <Home /> : <AuthPage setAuthed={setAuthed} />;
}

export default App;
