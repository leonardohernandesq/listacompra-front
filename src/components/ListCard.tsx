import Link from 'next/link';
import React from 'react'

import { FaListCheck, FaEye, FaTrash } from "react-icons/fa6";
import { ListLineProps } from '@/interfaces/IList';

import { useDispatch } from 'react-redux';
import { deleteListThunk } from '@/lib/slices/listSlice';
import { AppDispatch } from '@/lib/store';
import { useRouter } from 'next/navigation'

export const ListCard = ({data}: ListLineProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleDeleteList = () => {
    dispatch(deleteListThunk(data._id))
  }

  const handleViewList = () => {
    router.push(`/list/${data._id}`)
  }

  return (
    <div className='bg-zinc-950 h-64 w-full p-4 flex flex-col justify-center items-center border-b-2 border-purple-700'>
        <FaListCheck className='text-purple-700 mb-3' size={30}/>
        <h3 className='text-2xl font-semibold'>{data.name}</h3>
        <span className='text-zinc-400 text-sm'>{data.items.length !== 1 ? `${data.items.length} itens` : `${data.items.length} item`}</span>
        <div className='flex justify-center w-full gap-4 mt-6'>
            <button onClick={handleViewList} className='bg-purple-700 p-4 rounded-md' title='Visualizar'>
                <FaEye size={20}/>
            </button>
            <button onClick={handleDeleteList} className='bg-zinc-900 p-4 rounded-md' title='Excluir'>
                <FaTrash size={20}/>
            </button>
        </div>
    </div>
  )
}
