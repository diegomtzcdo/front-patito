interface ButtonProps {
    id: string;
    isDisabled?: boolean;
    handleClick: () => void;
    children: React.ReactNode;
}

export default function Button({ id, isDisabled = false, handleClick, children }: ButtonProps) {
    return (
        <button
            id={id}
            className={`mt-4 px-4 py-2 font-semibold bg-primary text-white hover:bg-hover-color active:bg-pressed rounded-lg shadow-md ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isDisabled}
            onClick={handleClick}>
            {children}
        </button>
    );
}
