export interface SearchProps {
    isVisible: boolean;
    setSearchTerm: (value: string) => void;
    searchRef: React.RefObject<HTMLInputElement | null>;
    searchTerm: string;
}
