import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import Loading from './Loading';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode;
    buttonStyle: 'style1' | 'style2'
}

const Button = ({loading, children, buttonStyle, ...rest}: IButton) => {
  return (
    <button 
      {...rest} 
      className=
      { buttonStyle == 'style1' ? 
        'bg-zinc-900 text-zinc-300 px-8 py-2 transition-all hover:brightness-75 rounded-sm my-2 flex items-center justify-center' : 
        'bg-zinc-300 text-zinc-900 px-8 py-2 transition-all hover:brightness-75 rounded-sm my-2 flex items-center justify-center'
      }
    >
        {loading && <Loading />}
        {!loading && (children)}
    </button>
  )
}

export default Button