"use client";
import { useState, useEffect } from "react";
import { 
  HeaderContainer, 
  Header, 
  CoverContainer, 
  CardContainer } from "./styles";
import classPlaceholder from "@/assets/class-placeholder.png";
import addPlaceholder from "@/assets/add.png";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function ClassCard({ data, onClick }) {
  const router = useRouter();
  const [cover, setCover] = useState(classPlaceholder);

  useEffect(() => {
    if (data.id === 0) {
      setCover(addPlaceholder);
      return;
    }
  }, []);

  return (
    <>
      {data && (
        <CardContainer>
          <HeaderContainer $new={data.id === 0}>
            <Header>
              <h1>{data.name}</h1>
              {
                data.id !== 0 && (
                  <FaPencilAlt onClick={() => router.push(`/teacher/class/${data.id}`)} />
                )
              }
            </Header>
          </HeaderContainer>
          <CoverContainer onClick={onClick} $new={data.id === 0}>
            <Image
              src={cover}
              alt={`${data.name}`}
              fill
              quality={100}
              priority
            />
          </CoverContainer>
        </CardContainer>
      )}
    </>
  );
}
