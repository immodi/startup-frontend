import { useState } from "react";
import "../styles/app.css";
import MainComponent from "./Main";
import { AuthPage } from "./Auth/Auth";

function App() {
    const [authed, setAuthed] = useState(false);

    return authed ? <MainComponent /> : <AuthPage setAuthed={setAuthed} />;
}

export default App;
