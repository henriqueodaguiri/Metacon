"use client";
import { Container, QuestionContainer, QuestionHeader} from "./styles";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { OptionInput } from "@/components/OptionInput";
import { QuestionsTable } from "@/components/QuestionsTable";
import { useState } from "react";
import { toast } from "react-toastify";

export function Questions({ questions, setQuestions }) {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  function handleCheck(option) {
    setSelectedOption(option);
  }

  function clearFields() {
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setSelectedOption("");
  }

  function handleInsertQuestion() {
    if(!question || !optionA || !optionB || !optionC || !optionD) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if(!selectedOption) {
      toast.error("Selecione uma opção para ser a correta!");
      return;
    }

    const questionObj = {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption: selectedOption
    };

    setQuestions([...questions, questionObj]);
    clearFields();
  }

  return (
    <Container>
      <Input 
        placeholder="Pergunta"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      
      <OptionInput 
        label="Opção A"
        value={optionA}
        setValue={setOptionA}
        checked={selectedOption === "A"}
        onCheck={() => handleCheck("A")}
      />
      <OptionInput 
        label="Opção B"
        value={optionB}
        setValue={setOptionB}
        checked={selectedOption === "B"}
        onCheck={() => handleCheck("B")}
      />
      <OptionInput 
        label="Opção C"
        value={optionC}
        setValue={setOptionC}
        checked={selectedOption === "C"}
        onCheck={() => handleCheck("C")}
      />
      <OptionInput 
        label="Opção D"
        value={optionD}
        setValue={setOptionD}
        checked={selectedOption === "D"}
        onCheck={() => handleCheck("D")}
      />

      <Button
        title={"Inserir"}
        onClick={handleInsertQuestion}
      />
      <QuestionsTable
        questions={questions}
        setQuestions={setQuestions}
      />
    </Container>
  );
}