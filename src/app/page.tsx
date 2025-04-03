'use client'

import Button from "@/components/Button";
import { Container } from "@/components/Container";
import Input from "@/components/Input";
import { loginUserThunk } from "@/lib/slices/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, error, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email: login, password }));
  };

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <Container>
      <form className="flex flex-col justify-center m-auto h-screen w-full max-w-96">
        <h2 className="w-full font-bold text-2xl text-center mt-5 mb-8">
          Faça o login para prosseguir
        </h2>
        <Input
          name="user"
          titleLabel="User:"
          error={''}
          placeholder="Digite o seu nome de usuário"
          value={login}
          onChange={setLogin}
        />
        <Input
          name="password"
          titleLabel="Password:"
          error={''}
          placeholder="Digite a sua senha"
          value={password}
          onChange={setPassword}
          isPassword={true}
        />
        <Button onClick={handleLogin} buttonStyle="style2" loading={loading}>
          Acessar
        </Button>
        {error && <span className="text-red-600 mt-2">{error}</span>}
        <div className="bg-zinc-300 text-black p-3 rounded-md text-center shadow-lg mt-5 text-sm opacity-75">
          <p className="font-bold">Conta de teste</p>
          <p>leonardo@teste.com</p>
          <p>123123123</p>
        </div>
      </form>
    </Container>
  );
}
