"use client";
import { Container, ContentContainer, Logo } from "./styles";
import { Header } from "@/components/Header";

const Student = () => {
  return (
    <Container>
      <Header/>
      <ContentContainer>
        <Logo src="/favicon.png" alt="Logo"/>
        <h1>Aperfeiçoe sua leitura!</h1>
      </ContentContainer>
    </Container>
  );
};

export default Student;
