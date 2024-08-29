"use client";
import { 
  Container, 
  CoverContainer, 
  TextContainer, 
  ModalContent,
  ModalButtonsContent
} from "./styles";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import textPlaceholder from "@/assets/book-placeholder.png";
import { Button } from "../Button";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";

export function Text({ index, text, setClassroom, classroom }) {
  const textCover = text?.coverUrl ? `${text.coverUrl}` : textPlaceholder;
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function confirmDelete() {
    const textIdToRemove = text.id; 

    const updatedClassroom = {
      ...classroom,
      texts: classroom.texts.filter(text => text.id !== textIdToRemove)
    };

    try {
      await api.delete(`/classes/${classroom.id}/text/${textIdToRemove}`);
      setClassroom(updatedClassroom); 
      toast.success("Excluído com sucesso!");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("Não foi possível excluir");
      }
    }
    setIsModalOpen(false);
  }

  async function handleDelete() {
    setIsModalOpen(true);
  }

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <Container $index={index}>
      <TextContainer>
        <CoverContainer>
          <Image
            src={textCover} 
            alt={`Foto de ${text.name}`}
            fill 
            quality={100}
            priority
          />
        </CoverContainer>
        <p>{text.name}</p>
        <FaTrashAlt onClick={handleDelete}/> 
      </TextContainer>
      {
      isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Confirm Deletion"
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
            <h2>Deseja mesmo excluir?</h2>
            <ModalButtonsContent>
              <Button title={"Sim"} width={"100%"} onClick={confirmDelete} />
              <Button title={"Não"} width={"100%"} onClick={() => setIsModalOpen(false)} />
            </ModalButtonsContent>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

