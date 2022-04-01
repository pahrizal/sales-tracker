import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import GoogleIcon from "./assets/icons/GoogleIcon";
import LogoutIcon from "./assets/icons/LogoutIcon";
import Button from "./components/Button";
import MenuItem from "./components/MenuItem";
import useAuth from "./hooks/authHook";

function App() {
    const { authenticated, authenticate, logout } = useAuth();
    const [animationEnd, setAnimationEnd] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const searchBoxRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const header = headerRef.current;
        if (authenticated && headerRef.current) {
            setTimeout(() => {
                header && header.classList.add("flyTopLeft");
                setTimeout(() => {
                    if (searchBoxRef.current) {
                        searchBoxRef.current.classList.add("animate__bounceInRight", "show");
                        searchBoxRef.current.classList.remove("hidden");
                    }
                    setTimeout(() => {
                        setAnimationEnd(true);
                    });
                }, 1000);
            }, 1000);
        }
    }, [authenticated]);
    const handleLogout = () => {
        logout();
        if (headerRef.current) {
            headerRef.current.classList.remove("flyTopLeft");
        }
    };

    return (
        <div
            className={clsx(
                "w-screen h-screen bg-slate-900 overflow-hidden",
                "flex flex-col justify-center items-center text-slate-100",
                { "pt-32": authenticated }
            )}
        >
            <div ref={headerRef} className="fixed flex flex-col mb-8">
                <p className="font-kitchen text-7xl animate__animated animate__zoomInDown">Sales</p>
                <p className="font-kitchen text-7xl animate__animated animate__zoomInUp text-lime-400">Tracker</p>
                <div className="font-fibre text-2xl">
                    <h1>Track your sales and make more money.</h1>
                </div>
                {!authenticated && (
                    <div className="flex flex-row mt-6">
                        <Button icon={<GoogleIcon height={32} />} onClick={() => authenticate()}>
                            Sign in with Google
                        </Button>
                    </div>
                )}
            </div>
            {authenticated && (
                <div
                    ref={searchBoxRef}
                    className="absolute flex flex-row w-80 h-[40px] animate__animated hidden right-8 top-11"
                >
                    <div
                        className={clsx(
                            "border flex-grow border-r-0 border-lime-400 rounded-[2rem]",
                            "rounded-r-none flex flex-row items-center"
                        )}
                    >
                        <input
                            className={clsx("w-full outline-none py-2 px-5 bg-transparent")}
                            type="text"
                            placeholder="Type to search your item here"
                        />
                    </div>
                    <div className="flex flex-row border-l h-full border px-2 border-lime-400">
                        <button title="Logout" onClick={handleLogout} className="bl-1 -rotate-90 hover:rotate-0">
                            <LogoutIcon className="" fill="#A3E635" />
                        </button>
                    </div>
                </div>
            )}
            {animationEnd && authenticated && (
                <section
                    className={clsx(
                        "w-full animate__animated animate__fadeIn h-full overflow-y-auto",
                        "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-16",
                        "p-4 pt-16 justify-center"
                    )}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
                        <MenuItem key={x} picture={`https://picsum.photos/128/128?${x}`} />
                    ))}
                </section>
            )}
        </div>
    );
}

export default App;
