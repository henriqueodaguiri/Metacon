"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Container, 
  CameraContainer, 
  ContentContainer, 
  BackButtonContainer,
  CoverContainer, 
  FieldsContainer, 
  ButtonsContainer,
  ModalContent, 
  ModalButtonsContent
} from "./styles";
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
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import Modal from "react-modal";
import { useTheme } from "styled-components";

const EditText = () => {
  const theme = useTheme();
  const { id } = useParams(); 
  const router = useRouter();
  const [isNew, setIsNew] = useState(false);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#__next");
    
    async function fetchText() {
      try {
        const result = await api.get(`/texts/${id}`);
        const text = result?.data?.text.text;
        const questions = result?.data?.text.questions;

        setTitle(text.name); 
        setContent(text.content); 
        setDifficulty(text.difficulty); 
        setQuestions(text.questions); 
        setCoverUrl(text.coverUrl || bookPlaceholder); 
        setQuestions(questions);
        setIsNew(false);
      } catch {
        router.push("/teacher/text");
      }
    }

    fetchText();
  }, [id]);

  async function handleSave() {
    if (!title || !difficulty || !content) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (!questions || questions.length === 0) {
      toast.error("Insira perguntas!");
      return;
    }

    setLoading(true);
    try {
      let textId = id;
      await api.put(`/texts/${textId}`, {
        name: title,
        difficulty,
        content,
        questions
      });

      sessionStorage.setItem("messageStorage", "Atualizado com sucesso!");
      router.push("/student/text");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
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
      {loading && <LoadingPage />}
      <Header />
      <ContentContainer>
        <h1>Dados da Leitura</h1>
        <BackButtonContainer onClick={() => router.back()}>
          <IoMdArrowRoundBack size={60}/>
        </BackButtonContainer>
        <CoverContainer>
          {coverUrl && ( 
            <Image
              src={coverUrl}
              alt="Capa do livro"
              fill
              quality={100}
              priority
            />
          )}
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
        <h2>Perguntas</h2>
        <FieldsContainer>
          <Questions
            questions={questions}
            setQuestions={setQuestions}
          />
        </FieldsContainer>
      </ContentContainer>
      <ButtonsContainer>
        <Button
          title={"Salvar"}
          width={"100%"}
          maxWidth={"800px"}
          onClick={handleSave}
        />
      </ButtonsContainer>
    </Container>
  );
};

export default EditText;
