"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Container, WallpaperContainer, LoginContainer } from "./styles";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import hero from "@/assets/hero.png";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();

  useEffect(() => {
    if(user) {
      router.push("/");
    }
  }, [user]);

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
          onClick={() => login(email, password)}
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
