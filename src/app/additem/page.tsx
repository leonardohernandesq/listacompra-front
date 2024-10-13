'use client'

import { BodyContent } from '@/components/BodyContent';
import { Container }from '@/components/Container';
import { HeadContent } from '@/components/HeadContent';
import { Header } from '@/components/Header';
import { ItemLine } from '@/components/ItemLine';
import Loading from '@/components/Loading';
import { fetchCategoriesThunk } from '@/lib/slices/categorySlice';
import { addItemThunk, fetchItensThunk } from '@/lib/slices/itemSlice';
import { AppDispatch, RootState } from '@/lib/store';
import React, { FormEvent, useEffect, useState } from 'react';
import { GrSend } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';

const addItem = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {itens, loading: loadingItem, error: errorItem} = useSelector((state: RootState) => state.item)
  const {categories, loading: loadingCategory, error: errorCategory} = useSelector((state: RootState) => state.category)

  const [show, setShow] = useState(true);
  const [dataItem, setDataItem] = useState({
    name: '',
    categoryId  : ''
  });

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
    dispatch(fetchItensThunk());
  }, [dispatch])

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(addItemThunk(dataItem))
    console.log(dataItem)
  }


  return (
    <Container>
      <Header />
      <HeadContent title="Adicionar Produto" show={() => setShow(!show)}/>
      <BodyContent show={show}>
          <form onSubmit={handleSubmit}  className='flex flex-wrap justify-center items-center gap-2'>
            <input 
              className=' w-3/4 bg-zinc-950 flex-1 p-4 outline-none' 
              placeholder='Insira o nome do item desejado.' 
              value={dataItem.name} 
              onChange={(e) => setDataItem((prevState) => ({...prevState, name: e.target.value}))} 
              required
            />
            <select 
              className='bg-zinc-950 flex-1 h-14 px-4 outline-none w-1/4 rounded-none' 
              value={dataItem.categoryId} 
              onChange={(e) => setDataItem((prevState) => ({...prevState, categoryId: e.target.value}))} 
              required
            >
              <option value="">Selecione uma Categoria</option>
              {
                categories.map((uniqueCategory) => (
                  <option value={uniqueCategory._id} key={uniqueCategory._id}>{uniqueCategory.name}</option>
                ))
              }
            </select>
            <button type='submit' className='bg-purple-700 flex justify-center items-center h-14 w-14'>
              <GrSend size={20}/>
            </button>
          </form>
          <h4 className='font-bold text-lg mt-6 mb-3'>Todos os Itens Cadastrados</h4>

          { loadingItem && <Loading /> }
          { itens && (
            <ul>
                {itens.map((item: any) => (
                  <ItemLine key={item._id} data={item} />
                ))}
              </ul>
          )}

          {errorItem && <p>Erro: {errorItem}</p>}
      </BodyContent>
    </Container>
  )
}

export default addItem