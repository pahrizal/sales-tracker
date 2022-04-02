import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import LogoutIcon from "../assets/icons/LogoutIcon";
import useAuth from "../hooks/authHook";

interface Props {
    show?: boolean;
    onAnimationEnd?: () => void;
    onLogout?: () => void;
}
const SearchBox: React.FC<Props> = ({ onAnimationEnd, onLogout, show }) => {
    const { authenticated, logout } = useAuth();
    const searchBoxRef = useRef<HTMLDivElement>(null);
    const [animationEnd, setAnimationEnd] = useState(false);
    useEffect(() => {
        if (authenticated && show && searchBoxRef.current) {
            setTimeout(() => {
                if (searchBoxRef.current) {
                    searchBoxRef.current.classList.add("animate__bounceInRight", "show");
                    searchBoxRef.current.classList.remove("hidden");
                }
                setTimeout(() => {
                    setAnimationEnd(true);
                });
            }, 1000);
        }
    }, [authenticated, show]);
    useEffect(() => {
        if (animationEnd && onAnimationEnd) {
            onAnimationEnd();
        }
    }, [animationEnd, onAnimationEnd]);

    const handleLogout = () => {
        logout();
        onLogout && onLogout();
    };

    return authenticated && show ? (
        <div
            ref={searchBoxRef}
            className={clsx(
                "xl:w-[50vw] lg:w-[60vw] md:w-[70vw] sm:w-[70vw] w-full",
                "absolute flex flex-row pl-16 h-[40px] animate__animated hidden right-8 xl:top-11 lg:top-11 md:top-11 sm:top-11 top-24"
            )}
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
    ) : (
        <></>
    );
};

export default SearchBox;