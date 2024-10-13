import React from 'react'

export const BodyContent = ({show, children}: any) => {
    return (
        <div className={`bg-zinc-900 p-4 ${show ? 'flex flex-col' : 'hidden'}`}>
            {children}
        </div>
    )
}