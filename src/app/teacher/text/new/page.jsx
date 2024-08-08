"use client";
import { useState } from "react";
import { Container, CameraContainer, ContentContainer, TextContainer, CoverContainer, FieldsContainer, QuestionsContainer } from "./styles";
import bookPlaceholder from "@/assets/book-placeholder.png"; 
import Image from "next/image";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Questions } from "@/components/Questions";
import { TextArea } from "@/components/TextArea";
import { LoadingPage } from "@/components/LoadingPage";
import { Button } from "@/components/Button";
import { SelectInput } from "@/components/SelectInput";
import { FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "@/lib/api";

const TextDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [difficulties, setDifficulties] = useState([
    { id: 0, name: "SELECIONE A DIFICULDADE" },
    { id: "VERY_EASY", name: "MUITO FÁCIL" },
    { id: "EASY", name: "FÁCIL" },
    { id: "REGULAR", name: "MÉDIO" },
    { id: "HARD", name: "DIFÍCIL" },
    { id: "VERY_HARD", name: "MUITO DIFÍCIL" }
  ]);
  const [newCover, setNewCover] = useState("");
  const [coverUrl, setCoverUrl] = useState(bookPlaceholder);
  const [questions, setQuestions] = useState([]);

  function handleAvatarChange(event) {
    const file = event.target.files[0];
    setNewCover(file);

    const newCover = URL.createObjectURL(file);
    setCoverUrl(newCover);
  }

  async function uploadCover(id) {
    const fileUploadForm = new FormData();
    fileUploadForm.append("cover", newCover);
    const response = await api.patch(`/texts/cover/${id}`, fileUploadForm);
    return response.data.cover;
  }

  async function handleSave() {
    if (!title || !difficulty|| !content) {
      toast.error("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/texts", {
        name: title,
        difficulty,
        content
      });

      const id = response.data.id;
      if(newCover) {
        await uploadCover(id);
      }
      
      toast.success("Texto criado com sucesso!");
      router.back();
    } catch(error) {
      console.log(error);
      const errorMessage = error.response?.data?.message;
      if(errorMessage){
        toast.error(errorMessage);
      } else {
        toast.error("Não foi possível atualizar");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      {
        loading && (
          <LoadingPage/>
        )
      }
      <>
        <Header/>
        <ContentContainer>
          <CoverContainer>
            <Image
              src={coverUrl} 
              alt="Capa do livro" 
              fill 
              quality={100}
              priority
            />
            <CameraContainer htmlFor="avatar">
              <input type="file" id="avatar" onChange={handleAvatarChange}/>
              <FaCamera size={30}/>
            </CameraContainer>
          </CoverContainer>
          <FieldsContainer>
            <Input 
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <SelectInput
              items={difficulties}
              selectedOption={difficulty}
              setSelectedOption={setDifficulty}
            />
            <TextArea 
              placeholder="Conteúdo"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FieldsContainer>
        </ContentContainer>

        <ContentContainer>
          <FieldsContainer>
            <Questions
              questions={questions}
              setQuestions={setQuestions}
            />
          </FieldsContainer>
        </ContentContainer>
        <Button
          title={"Salvar"}
          width={"100%"}
          maxWidth={"800px"}
          onClick={handleSave}
        />
      </>
    </Container>
  );
};

export default TextDashboard;