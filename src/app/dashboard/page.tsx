'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BodyContent } from '@/components/BodyContent'
import { Container } from '@/components/Container'
import { HeadContent } from '@/components/HeadContent'
import { Header } from '@/components/Header'
import { ListCard } from '@/components/ListCard'
import Loading from '@/components/Loading'

import { fetchListsThunk } from '@/lib/slices/listSlice'
import { AppDispatch, RootState } from '@/lib/store'

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {lists, loading} = useSelector((state:RootState) => state.list)
    
    useEffect(() => {
        dispatch(fetchListsThunk());
    }, [dispatch])

    return (
        <Container>
            <Header/>
            <HeadContent title='Dashboard' show={null} />
            <BodyContent show={true}>
                <input className='bg-zinc-950 p-4 mb-3 outline-none' placeholder='Pesquisar por uma Lista'/>

                <div className='grid grid-cols-3 gap-3 w-full'>
                    {loading && <Loading />}
                    {lists && lists.map((item) => (
                        <ListCard key={item._id} data={item} />
                    ))} 
                </div>
            </BodyContent>
        </Container>
    )
}

export default Dashboard