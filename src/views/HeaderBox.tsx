import React, { useEffect, useRef } from "react";
import GoogleIcon from "../assets/icons/GoogleIcon";
import Button from "../components/Button";
import useAuth from "../hooks/authHook";

interface Props {
    onAnimationEnd?: () => void;
}
const HeaderBox: React.FC<Props> = ({ onAnimationEnd }) => {
    const { authenticated, authenticate } = useAuth();
    const headerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const header = headerRef.current;
        if (authenticated && headerRef.current) {
            setTimeout(() => {
                header && header.classList.add("flyTopLeft");
                onAnimationEnd && onAnimationEnd();
            }, 1000);
        } else {
            // remove fly animation class class
            headerRef.current && headerRef.current.classList.remove("flyTopLeft");
        }
    }, [authenticated, onAnimationEnd]);

    return (
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
    );
};

export default HeaderBox;
