import { useEffect, useRef } from "react";

export default function useOutsideClick(close, listenPhase = true) {
    const ref = useRef();

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) close(); // if you click outside ref
        }
        document.addEventListener("click", handleClick, listenPhase); // listen in capturing phase not puppling phase true => capturing
        return () => document.removeEventListener("click", handleClick, listenPhase);
    }, [close, listenPhase]);

    return ref;
}