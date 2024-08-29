"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Container, 
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
import { Options } from "@/components/Options";
import { TextArea } from "@/components/TextArea";
import { LoadingPage } from "@/components/LoadingPage";
import { Button } from "@/components/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import Modal from "react-modal";

const EditText = () => {
  const { classId, textId } = useParams(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState({}); 
  const [done, setDone] = useState(false); 
  const [coverUrl, setCoverUrl] = useState(bookPlaceholder); 
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#__next");
    
    async function fetchText() {
      try {
        const result = await api.get(`/classText/${classId}/${textId}`);
        const done = result?.data?.classText?.done;
        const text = result?.data?.classText?.text;
        const questions = result?.data?.classText?.questions;

        setDone(done);
        setText(text);
        setCoverUrl(text.coverUrl || bookPlaceholder); 
        setQuestions(questions);
      } catch {
        router.push("/");
      }
    }

    fetchText();
  }, [textId]);

  async function confirmSubmit() {
    // todo...
    // if (!questions || questions.length === 0) {
    //   toast.error("Insira perguntas!");
    //   return;
    // }

    // setLoading(true);
    // try {
    //   let textId = id;
    //   await api.put(`/texts/${textId}`, {
    //     name: title,
    //     difficulty,
    //     content,
    //     questions
    //   });

    //   sessionStorage.setItem("messageStorage", "Atualizado com sucesso!");
    //   router.push("/student/text");
    // } catch (error) {
    //   console.log(error);
    //   const errorMessage = error.response?.data?.message;
    //   if (errorMessage) {
    //     toast.error(errorMessage);
    //   } else {
    //     toast.error("Não foi possível atualizar");
    //   }
    // } finally {
    //   setLoading(false);
    // }
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
            value={text.name || ""}
            disabled
          />
          <TextArea
            placeholder="Conteúdo"
            value={text.content || ""}
            disabled
          />
        </FieldsContainer>
      </ContentContainer>
      {
        questions && questions.length > 0 && (
          <ContentContainer>
            <h2>Perguntas</h2>
            <FieldsContainer>
              <Options
                done={done}
                questions={questions}
                setQuestions={setQuestions}
              />
            </FieldsContainer>
          </ContentContainer>
        )
      }
      {
        !done && (
          <ButtonsContainer>
            <Button
              title={"Enviar"}
              width={"100%"}
              maxWidth={"800px"}
              onClick={() => setIsModalOpen(true)}
            />
          </ButtonsContainer>
        )
      }
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Confirm Submit"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
              borderRadius: "20px", 
            },
          }}
        >
          <ModalContent>
            <h2>Deseja mesmo enviar? Uma vez enviado não há como refazer.</h2>
            <ModalButtonsContent>
              <Button title={"Sim"} width={"100%"} onClick={confirmSubmit} />
              <Button title={"Não"} width={"100%"} onClick={() => setIsModalOpen(false)} />
            </ModalButtonsContent>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default EditText;
