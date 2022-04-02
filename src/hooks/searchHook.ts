import React from "react";

/**
 * This hook is used to handle search of menu items
 * @returns {[string, (value: string) => void]}
 */
export default function useSearch(searchField: HTMLInputElement) {
    const [search, setSearch] = React.useState("");
    const handleSearch = React.useCallback((value: string) => {
        setSearch(value);
    }, []);
    React.useEffect(() => {}, []);
    return [search, handleSearch];
}
