import { CategoryLineProps } from '@/interfaces/ICategory'
import { deleteCategoryThunk } from '@/lib/slices/categorySlice'
import { AppDispatch } from '@/lib/store'
import Link from 'next/link'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

export const CategoryLine = ({data}: CategoryLineProps) => {
    const dispatch = useDispatch<AppDispatch>();
    
    const handleDelete = async () => {
        dispatch(deleteCategoryThunk(data._id))
    }

    return (
        <div className='border-b-2 border-purple-700 p-4 flex justify-between my-2'>
            <p>{data.name}</p>
            <span className='cursor-pointer' onClick={handleDelete}><FaTrash /></span>
        </div>
    )
}