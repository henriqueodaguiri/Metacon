"use client";
import { useAuth } from "@/context/auth";
import { Container, MainContainer, Logo, AvatarContainer, OptionsContainer, LogoContainer } from "./styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userPlaceholder from "@/assets/user.png";
import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "../Button";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(userPlaceholder);

  function redirectHome() {
    router.push("/");
  }

  function redirectClasses() {
    router.push("/class");
  }

  function redirectTexts() {
    router.push("/text");
  }
  
  function redirectUser() {
    router.push("/user");
  }

  async function handleLogout() {
    await logout();
    router.push("/signin");
  }

  useEffect(() => {
    setAvatarUrl(user?.avatarUrl ? `${user.avatarUrl}` : userPlaceholder);
  }, [user]);
  
  return (
    <Container >
      <MainContainer>
        <LogoContainer>
          <Logo src="/favicon.png" alt="Logo" onClick={redirectHome}/>
          <h1 onClick={redirectHome}>Meta Leitura</h1>
        </LogoContainer>
        <Button
          bgColor={"transparent"}
          onClick={redirectClasses}
          title={"Turmas"}
        />
        <Button
          bgColor={"transparent"}
          onClick={redirectTexts}
          title={"Leituras"}
        />
      </MainContainer>
      <OptionsContainer>
        <AvatarContainer>
          <Image
           src={avatarUrl} 
           alt="Avatar" 
           fill 
           quality={100}
           priority
           onClick={redirectUser}
          />
        </AvatarContainer>
        <Button
          icon={IoLogOutOutline}
          bgColor={"transparent"}
          onClick={handleLogout}
        />
      </OptionsContainer>
    </Container>
  );
}