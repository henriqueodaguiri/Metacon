"use client";
import { 
  Container, 
  AvatarContainer, 
  ToggleButton, 
  StudentContainer, 
  ContentContainer, 
  PerformanceContainer, 
  Performance,
  ModalContent,
  ModalButtonsContent
} from "./styles";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaTrashAlt } from "react-icons/fa";
import studentPlaceholder from "@/assets/user.png";
import { Button } from "../Button";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";

export function Student({ index, student, setClassroom, classroom }) {
  const [showPerformance, setShowPerformance] = useState(false);
  const studentAvatarUrl = student?.avatarUrl ? `${student.avatarUrl}` : studentPlaceholder;
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function confirmDelete() {
    const studentIdToRemove = student.id; 

    const updatedClassroom = {
      ...classroom,
      students: classroom.students.filter(student => student.id !== studentIdToRemove)
    };

    try {
      await api.delete(`/classes/${classroom.id}/student/${studentIdToRemove}`);
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
      <StudentContainer>
        <ContentContainer>
          <AvatarContainer>
            <Image
            src={studentAvatarUrl} 
            alt={`Foto de ${student.name}`}
            fill 
            quality={100}
            priority
            />
          </AvatarContainer>
          <p>{student.name}</p>
        </ContentContainer>
        <ContentContainer>
        <ToggleButton onClick={() => setShowPerformance(!showPerformance)}>
            {showPerformance ? <FaEyeSlash /> : <FaEye />}
          </ToggleButton>
          <FaTrashAlt onClick={handleDelete}/> 
        </ContentContainer>
      </StudentContainer>
      {
          showPerformance && 
          student.performances && 
          student.performances.length > 0 && (
            <PerformanceContainer $index={index}>
              {
                student.performances.map((p, i) => 
                  (
                    <Performance
                      key={i}
                      $index={index}
                    >
                      <p>{p.text.name}</p>
                      <p>{p.grade}</p>
                    </Performance>
                  )
                )
              }
              <Performance
                $index={index}
              >
                <p>Média: </p>
                <p>{student.grade}</p>
              </Performance>
            </PerformanceContainer>
          )
      }
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

