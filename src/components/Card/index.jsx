"use client";
import { Container, HeaderContainer, Header, CoverContainer, CardContainer } from "./styles";
import bookPlaceholder from "@/assets/book-placeholder.png";
import addPlaceholder from "@/assets/add.png";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Card({ data, onClick }){
  const [cover, setCover] = useState(bookPlaceholder);

  useEffect(() => {
    if(data.id === 0) {
      setCover(addPlaceholder);
      return;
    }

    if(data?.coverUrl) {
      setCover(`${data.coverUrl}`);
      return;
    }

    setCover(bookPlaceholder);
  }, []);

  return (
    <Container onClick={onClick}>
      {
        data && (
          <CardContainer>
            <HeaderContainer $newText={data.id === 0}>
              <Header>
                <h1>{data.name}</h1>
              </Header>
            </HeaderContainer>
            <CoverContainer
              $newText={data.id === 0}
            >
              <Image
                src={cover} 
                alt={`Capa do livro ${data.name}`}
                fill 
                quality={100}
                priority
              />
            </CoverContainer>
            {
              data.id !== 0 && <p>Dificuldade: {data.difficulty}</p>
            }
          </CardContainer>
        )
      }
    </Container>
  );
} 
