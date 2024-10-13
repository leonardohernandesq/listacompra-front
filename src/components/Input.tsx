import { InputHTMLAttributes, ChangeEvent } from "react";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { BsEye } from "react-icons/bs";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    error?: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    titleLabel: string;
    isPassword?: boolean;
}

const Input = ({
    name,
    titleLabel,
    isPassword = false,
    value,
    onChange,
    error,
    type = 'text',
    ...rest
    }: InputProps) => {
    const [showPassword, togglePasswordVisibility] = usePasswordToggle();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value); 
    };

    const handleShowPassword = (e: any) => {
        e.preventDefault();
        togglePasswordVisibility();
    };

    return (
        <div className="flex flex-col my-2 w-full">
        <label className="text-sm mb-1 text-gray-300" htmlFor={name}>
            {titleLabel}
        </label>
        <div className="relative w-full">
            <input
            id={name}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            value={value}
            onChange={handleInputChange}
            className={`
                placeholder:text-slate-400
                text-zinc-800 
                bg-gray-300 
                py-2 
                px-4 
                outline-none 
                rounded 
                border-t-4 
                border-b-4 
                w-full
                ${error ? "border-b-red-600" : ""} 
                ${value.length > 5 ? "border-b-green-600" : ""}
            `}
            {...rest}
            />
            {isPassword && (
            <button
                onClick={handleShowPassword}
                className="bg-purple-600 w-10 h-12 flex justify-center items-center rounded-sm absolute bottom-0 right-0"
            >
                <BsEye size={20} />
            </button>
            )}
        </div>
        {error && <span className="text-sm mt-1 text-red-300">{error}</span>}
        </div>
    );
};

export default Input;
