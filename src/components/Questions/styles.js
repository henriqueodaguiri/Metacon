"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  > button {
    width: 20rem;
    align-self: flex-end;
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const QuestionContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.COLORS.PURPLE};
  border-radius: 20px;
  padding: 2rem;

  > ul {
    padding-left: 2rem;
  }
`;