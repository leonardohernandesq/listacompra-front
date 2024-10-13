'use client'

import { BodyContent } from '@/components/BodyContent'
import { CategoryLine } from '@/components/CategoryLine'
import { Container } from '@/components/Container'
import { HeadContent } from '@/components/HeadContent'
import { Header } from '@/components/Header'
import Loading from '@/components/Loading'
import { addCategoryThunk, fetchCategoriesThunk } from '@/lib/slices/categorySlice'
import { AppDispatch, RootState } from '@/lib/store'
import React, { FormEvent, useEffect, useState } from 'react'
import { GrSend } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'

const addCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {category, categories, loading, error} = useSelector((state: RootState) => state.category);
  const [show, setShow] = useState(true);
  const [categoryValue, setCategoryValue] = useState('');

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch])

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(addCategoryThunk({"name": categoryValue}))
    setCategoryValue('');
  }

  return (
    <Container>
      <Header />
      <HeadContent title="Adicionar Categoria" show={() => setShow(!show)}/>
      <BodyContent show={show}>
          <form onSubmit={handleSubmit}  className='flex flex-wrap justify-center items-center'>
            <input className='bg-zinc-950 flex-1 p-4 outline-none' placeholder='Insira o nome da categoria desejada.' value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)}/>
            <button type='submit' className='bg-purple-700 flex justify-center items-center h-14 w-14'>
              <GrSend size={20}/>
            </button>
          </form>

          <h4 className='font-bold text-lg mt-6 mb-3'>Todas as Listas Cadastradas</h4>

          { loading && <Loading /> }
          { categories && (
              <ul>
                {categories.map((item: any) => (
                  <CategoryLine key={item._id} data={item} />
                ))}
              </ul>
          )}

          {error && <p>Erro: {error}</p>}
      </BodyContent>
    </Container>
  )
}

export default addCategory