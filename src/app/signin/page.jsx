"use client";
import { useState } from "react";
import Image from "next/image";
import { Container, WallpaperContainer, LoginContainer } from "./styles";
import { useAuth } from "@/context/auth";
import hero from "@/assets/hero.png";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function handleLogin() {
    const user = await login(email, password);
    if (user) {
      router.push("/");
    }
  }

  return (
    <Container>
      <WallpaperContainer>
      <Image
          src={hero}
          alt="Hero Image"
          fill
          quality={100}
          priority
        />
      </WallpaperContainer>
      <LoginContainer>
        <h1>Faça Login</h1>
        <Input 
          icon={MdEmail}
          placeholder="E-mail"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          icon={RiLockPasswordFill}
          placeholder="Senha"
          type="password" 
          onChange={e => setPassword(e.target.value)}
        />
        
        <Button
          title={"Entrar"}
          onClick={handleLogin}
          width={"100%"}
        />

        <Link href="/signup">
          Criar uma conta
        </Link>
      </LoginContainer>
    </Container>
  );
};

export default SignIn;
