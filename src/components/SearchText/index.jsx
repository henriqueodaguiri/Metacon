"use client";
import { 
  Container, 
  ContentContainer, 
  TextContainer,
  CoverContainer
} from "./styles";
import Image from "next/image";
import textPlaceholder from "@/assets/book-placeholder.png";
import { Input } from "../Input";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useTheme } from "styled-components";

export function SearchText({ setClassroom, classroom }) {
  const theme = useTheme();
  const [texts, setTexts] = useState([]);
  const [search, setSearch] = useState("");

  async function handleAddText(text) {
    const texts = [...classroom.texts, text];
    texts.sort((a, b) => a.name.localeCompare(b.name));

    const updatedClassroom = {
      ...classroom,
      texts: texts
    };

    try {
      await api.post(`/classes/${classroom.id}/text/${text.id}`);
      setClassroom(updatedClassroom); 
      toast.success("Incluído com sucesso!");
      setSearch("");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("Não foi possível excluir");
      }
    }
  }

  useEffect(() => {
    async function fetchTexts() {
      const response = await api.get(`/texts?name=${search}`);
      const texts = response?.data?.texts;
      const textsIdInClassroom = classroom.texts.map(t => t.id);
      const filteredTexts = texts.filter(t => !textsIdInClassroom.includes(t.id));

      setTexts(filteredTexts);
    }

    if(search) {
      fetchTexts();
    }
  }, [search]);

  return (
    <Container>
      <Input
        icon={IoIosAddCircleOutline}
        placeholder={"Procure por leituras para adicionar"}
        width={"100%"}
        bgColor={theme.COLORS.WHITE}
        margin={"0 1.6rem"}
        onChange={(e => setSearch(e.target.value))}
        value={search}
      />
      {
        search && texts && (
          <ContentContainer>
            {
              texts.map((t, index) => (
                <TextContainer
                  key={t.id}
                  $index={index}
                  onClick={() => handleAddText(t)}
                >
                  <CoverContainer>
                    <Image
                      src={t.coverUrl ? t.coverUrl : textPlaceholder} 
                      alt={`Foto de ${t.name}`}
                      fill 
                      quality={100}
                      priority
                    />
                  </CoverContainer>
                  <p>{t.name}</p>
                </TextContainer>
              ))
            }
          </ContentContainer>
        )
      }
    </Container>
  );
}

