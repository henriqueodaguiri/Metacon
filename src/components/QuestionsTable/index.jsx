"use client";
import { useState } from "react";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { Container, Table, TableRow, TableHeader, TableCell, ToggleButton, OptionsRow } from "./styles";

export function QuestionsTable({ questions, setQuestions }) {
  const [expandedRows, setExpandedRows] = useState([]);

  function handleToggleOptions(index) {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  }

  function handleRemove(index) {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  }

  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Pergunta</TableHeader>
            <TableHeader>Ações</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {questions.map((question, i) => (
            <>
              <TableRow key={i}>
                <TableCell>{`${i + 1} - ${question.question}`}</TableCell>
                <TableCell>
                  <ToggleButton onClick={() => handleToggleOptions(i)}>
                    {expandedRows.includes(i) ? <FaMinus /> : <FaPlus />}
                  </ToggleButton>
                  <FaTrashAlt onClick={() => handleRemove(i)}/>
                </TableCell>
              </TableRow>
              {expandedRows.includes(i) && (
                <OptionsRow>
                  <td colSpan="2">
                    <ul>
                      <li className={question.correctOption === "A" ? "correct" : "incorrect"}>
                        {question.optionA}
                      </li>
                      <li className={question.correctOption === "B" ? "correct" : "incorrect"}>
                        {question.optionB}
                      </li>
                      <li className={question.correctOption === "C" ? "correct" : "incorrect"}>
                        {question.optionC}
                      </li>
                      <li className={question.correctOption === "D" ? "correct" : "incorrect"}>
                        {question.optionD}
                      </li>
                    </ul>
                  </td>
                </OptionsRow>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}