import React from 'react'

import logo from '../images/logo.png'

import Image from 'next/image'
import Link from 'next/link'
import { FaPowerOff } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout } from '@/lib/slices/authSlice'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async() => {
    dispatch(logout())

    router.push('/')
  }

  return (
    <header className='py-4 flex flex-row justify-between items-center'>
        <Link href={'/'}>
            <Image src={logo} alt='Logo about Best List App' height={50} priority/>
        </Link>

        <nav className='flex gap-10'>
            <Link className='hover:text-purple-700 transition-all' href={'/dashboard'}>Dashboard</Link>
            <Link className='hover:text-purple-700 transition-all' href={'/addlist'}>Criar Lista</Link>
            <Link className='hover:text-purple-700 transition-all' href={'/addcategory'}>Cadastrar Categoria</Link>
            <Link className='hover:text-purple-700 transition-all' href={'/additem'}>Adicionar Produto</Link>
            <button onClick={handleLogout} className='hover:text-purple-700 transition-all'><FaPowerOff /></button>
        </nav>
    </header>
    )
  }
