import React from 'react'
import { FaPlus } from "react-icons/fa";


export const HeadContent = ({show, title}: any) => {
    return (
        <div className='flex flex-col justify-between items-center w-full bg-zinc-900 py-3 px-4 border-b-2 border-purple-700'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='font-semibold text-2xl'>{title}</h1>
                {show !== null && (
                    <button className='bg-purple-700 w-8 h-8 flex items-center justify-center' onClick={() => show()}>
                    <FaPlus height={30} width={30} />
                    </button>
                )}
            </div>
        </div>
    )
}