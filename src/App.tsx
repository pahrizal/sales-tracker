import clsx from "clsx";
import React, { useState } from "react";
import useAuth from "./hooks/authHook";
import HeaderBox from "./views/HeaderBox";
import MenuView from "./views/MenuView";
import SearchBox from "./views/SearchBox";

function App() {
    const { authenticated } = useAuth();
    const [animationEnd, setAnimationEnd] = useState(false);
    const [flyAnimEnd, setFlyAnimEnd] = useState(false);
    const handleLogout = () => {
        document.location.href = "/";
    };
    React.useEffect(() => {
        if (authenticated) {
            // document.location.reload();
        }
    }, [authenticated]);
    return (
        <div
            className={clsx(
                "w-screen h-screen bg-slate-900 overflow-hidden",
                "flex flex-col justify-center items-center text-slate-100 font-virgil",
                { "pt-32": authenticated }
            )}
        >
            <HeaderBox onAnimationEnd={() => setFlyAnimEnd(true)} />
            <SearchBox onLogout={handleLogout} show={flyAnimEnd} onAnimationEnd={() => setAnimationEnd(true)} />
            {animationEnd && authenticated && <MenuView />}
        </div>
    );
}

export default App;
