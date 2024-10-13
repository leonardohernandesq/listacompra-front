'use client'

import { useState } from "react";


export const usePasswordToggle = (): [boolean, () => void] => {

    const [showPassoword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisible = ():void => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
    return [showPassoword, togglePasswordVisible]
}