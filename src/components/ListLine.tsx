import { ListLineProps } from '@/interfaces/IList'
import { deleteListThunk } from '@/lib/slices/listSlice'
import { AppDispatch } from '@/lib/store'
import Link from 'next/link'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

export const ListLine = ({data}: ListLineProps) => {
    const dispatch = useDispatch<AppDispatch>();
    
    const handleDelete = async () => {
        dispatch(deleteListThunk(data._id))
    }

    return (
        <div className='border-b-2 border-purple-700 p-4 flex justify-between my-2'>
            <Link href={`/list/${data._id}`} ><p>{data.name} - {data.items?.length !== 1 ? data.items?.length + ' itens' : data.items?.length + ' item'}</p></Link>
            <span className='cursor-pointer' onClick={handleDelete}><FaTrash /></span>
        </div>
    )
}