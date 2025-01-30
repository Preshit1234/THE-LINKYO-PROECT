import { useState, useEffect } from "react";

export default function useClickDetector() {
    const [clickedElement, setClickedElement] = useState(null);

    useEffect(() => {
        const handleClick = (event) => {
            setClickedElement(event.target);
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return [clickedElement, setClickedElement];
}
