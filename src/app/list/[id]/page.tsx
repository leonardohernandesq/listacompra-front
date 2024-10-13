'use client';

import Button from '@/components/Button';
import CardItem from '@/components/CardItem';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { getUniqueListThunk } from '@/lib/slices/listSlice';
import { AppDispatch, RootState } from '@/lib/store';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { BiCartAdd } from 'react-icons/bi';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const List = () => {
  const { id: listId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.list);

  useEffect(() => {
    if (listId) {
      dispatch(getUniqueListThunk(listId as string));
    }
  }, [listId, dispatch]);

  if (!list || !list.items) {
    return <div>Carregando lista...</div>;
  }

  return (
    <>
      <Container>
        <Header />
      </Container>

      <div className='h-52 bg-zinc-800 flex justify-center items-center text-3xl font-bold mb-8'>
        {list.name}
      </div>

      <Container>
        <div className='border-b p-2 border-purple-500 py-2 flex justify-between w-full font-bold text-purple-300 gap-3'>
          <p className='w-10'><BiCartAdd size={25}/></p>
          <p className='flex-1'>QTD: </p>
          <p className='flex-1'>NOME:</p>
          <p className='flex-1'>CATEGORIA:</p>
          <p className='flex-1'>EXCLUIR:</p>
        </div>
        {list.items.map((item: any) => (
          <CardItem key={item._id} itemData={{ ...item, listId }} />
        ))}
        <div className='w-full flex justify-end'>
          <Link href={"/additem"}>
            <Button buttonStyle={'style2'} >
              <FiPlus className='mr-2 mb-[2px]' />
              Adicionar Item na Lista
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default List;
