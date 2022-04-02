import clsx from "clsx";
import { useState } from "react";
import useAuth from "./hooks/auth";
import HeaderBox from "./pages/header";
import Home from "./pages/home";
import SearchBox from "./pages/searchbar";

function App() {
    const { authenticated } = useAuth();
    const [animationEnd, setAnimationEnd] = useState(false);
    const [flyAnimEnd, setFlyAnimEnd] = useState(false);
    const handleLogout = () => {
        document.location.href = "/";
    };

    return (
        <div
            className={clsx(
                "w-screen h-screen bg-slate-900 overflow-hidden",
                "flex flex-col justify-center items-center text-slate-100 font-virgil",
                { "pt-32": authenticated }
            )}
        >
            <HeaderBox onAnimationEnd={() => setFlyAnimEnd(true)} />
            <SearchBox
                onLogout={handleLogout}
                show={flyAnimEnd}
                onAnimationEnd={() => setAnimationEnd(true)}
            />
            {animationEnd && authenticated && <Home />}
        </div>
    );
}

export default App;
