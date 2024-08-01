"use client";
import { useState } from "react";
import { Container, CameraContainer, ContentContainer, TextContainer, CoverContainer, FieldsContainer, QuestionsContainer } from "./styles";
import bookPlaceholder from "@/assets/book-placeholder.png"; 
import Image from "next/image";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
import { SelectInput } from "@/components/SelectInput";
import { FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "@/lib/api";

const TextDashboard = () => {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState("REGULAR");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [difficulties, setDifficulties] = useState([
    { id: "VERY_EASY", name: "MUITO FÁCIL" },
    { id: "EASY", name: "FÁCIL" },
    { id: "REGULAR", name: "MÉDIO" },
    { id: "HARD", name: "DIFÍCIL" },
    { id: "VERY_HARD", name: "MUITO DIFÍCIL" }
  ]);
  const [newCover, setNewCover] = useState("");
  const [coverUrl, setCoverUrl] = useState(bookPlaceholder);

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
    if (!title || !content) {
      toast.error("Título e conteúdo são obrigatórios!");
      return false;
    }

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
    }
  }

  return (
    <Container>
      <Header/>
      <ContentContainer>
        <TextContainer>
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
              <FaCamera size={60}/>
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
            <Button
              title={"Salvar"}
              onClick={handleSave}
            />
          </FieldsContainer>
          {/* <QuestionsContainer>
            <input type="text" placeholder="Pergunta" />
            <button>SALVAR</button>
          </QuestionsContainer> */}
        </TextContainer>
      </ContentContainer>
    </Container>
  );
};

export default TextDashboard;