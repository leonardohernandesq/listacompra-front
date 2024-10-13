'use client'

import { Container } from '@/components/Container';
import { BodyContent } from '@/components/BodyContent';
import { HeadContent } from '@/components/HeadContent';
import { Header } from '@/components/Header';
import React, { FormEvent, useEffect, useState } from 'react';
import { GrSend } from "react-icons/gr";
import { ListLine } from '@/components/ListLine';
import { IList } from '@/interfaces/IList';
import Loading from '@/components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { addListThunk, fetchListsThunk } from '../../lib/slices/listSlice'

const addList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {lists, error, loading} = useSelector((state: RootState) => state.list)
  const [show, setShow] = useState(true);
  const [list, setList] = useState('');

  useEffect(() => {
    dispatch(fetchListsThunk())  
  }, [dispatch]);
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(addListThunk({"name": list}))

    setList('')
  }

  return (
    <Container>
      <Header />
      <HeadContent title="Adicionar Listagem" show={() => setShow(!show)}/>
      <BodyContent show={show}>
          <form onSubmit={handleSubmit}  className='flex flex-wrap justify-center items-center'>
            <input className='bg-zinc-950 flex-1 p-4 outline-none' placeholder='Insira o nome da sua nova lista.' value={list} onChange={(e) => setList(e.target.value)} required/>
            <button type='submit' className='bg-purple-700 flex justify-center items-center h-14 w-14'>
              <GrSend size={20}/>
            </button>
          </form>
          <h4 className='font-bold text-lg mt-6 mb-3'>Todas as Listas Cadastradas</h4>

          { loading && <Loading /> }
          { lists && (
              <ul>
                {lists.map((item: IList) => (
                  <ListLine key={item._id} data={item} />
                ))}
              </ul>
          )}

          {error && <p>Erro: {error}</p>}
      </BodyContent>
    </Container>
  )
}

export default addList