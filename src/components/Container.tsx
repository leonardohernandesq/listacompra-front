import React, { PropsWithChildren } from 'react'

export const Container = ({children}: PropsWithChildren) => {
  return (
    <div className='w-full max-w-7xl mx-auto relative'>
        {children}
    </div>
  )
}