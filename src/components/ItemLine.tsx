import { ItemLineProps } from '@/interfaces/IItem'
import { deleteItemThunk } from '@/lib/slices/itemSlice'
import { AppDispatch } from '@/lib/store'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { ModalAddItemByList } from './ModalAddItemByList'

export const ItemLine = ({data}: ItemLineProps) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    
    const handleDelete = async () => {
        dispatch(deleteItemThunk(data._id))
    }

    return (
        <>
            <div className='border-b-2 border-purple-700'>
                <div className='p-4 flex items-center justify-between my-2'>
                    <span className='w-10 cursor-pointer' title='Adicionar em uma lista' onClick={() => setShowModal(!showModal)}><FiPlusCircle size={20} /></span>
                    <p className='w-full'>{data.name}</p>
                    <span className='cursor-pointer' onClick={handleDelete}><FaTrash /></span>
                </div>
                    {showModal && <ModalAddItemByList dataItem={data} />}
            </div>
        </>
    )
}