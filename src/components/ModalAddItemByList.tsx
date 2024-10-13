import { addItemThunk, addItemThunkByList } from '@/lib/slices/itemSlice'
import { fetchListsThunk } from '@/lib/slices/listSlice'
import { AppDispatch, RootState } from '@/lib/store'
import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

export const ModalAddItemByList = ({dataItem}: any) => {
  const {lists} = useSelector((state:RootState) => state.list);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchListsThunk());
  }, [dispatch])

  const [dataAddList, setDataAddList] = useState({
    itemId: dataItem._id,
    listId: '',
    quantity: '',
  })

  const handleAddItemInList = (e: any) => {
    e.preventDefault();
    dispatch(addItemThunkByList(dataAddList))
  }

  return (
    <div className='relative w-full flex flex-col justify-center items-center pb-4'>
      <h3 className='mb-4 font-bold text-xl'>Adicionar <span className='text-purple-600'>{dataItem.name}</span> na lista</h3>
      <div className='flex w-full gap-2'>  
        <select 
          className='bg-zinc-950 flex-1 p-4 outline-none rounded-none' 
          value={dataAddList.listId}
          onChange={(e) => setDataAddList((prevState) => ({...prevState, listId: e.target.value}))}
          required
          >
          <option className={'rounded-none'} value="">Selecione a lista desejada</option>
          {
            lists.map((item) => (
              <option key={item._id} className={'rounded-none'} value={item._id}>{item.name}</option>
            ))
          }
        </select>
        <input 
          type='number'
          className=' w-32 bg-zinc-950 p-4 outline-none' 
          placeholder='QTD.' 
          value={dataAddList.quantity} 
          onChange={(e) => setDataAddList((prevState) => ({...prevState, quantity: e.target.value}))} 
          required
        />
        <button type='button' onClick={handleAddItemInList} className='bg-purple-700 flex justify-center items-center p-4'>
          <FiPlus size={20}/>
        </button>
      </div>
    </div>
  )
}