"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const TextContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center; 
  gap: 2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.COLORS.WHITE };
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
`;

export const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  position: relative;
  border-radius: 20px;
  border: 4px solid ${({ theme }) => theme.COLORS.VIOLET};

  > img {
    width: 100%;
    border-radius: 20px;
  }
`;

export const CameraContainer = styled.label`
  cursor: pointer;
  border-radius: 50%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.COLORS.VIOLET };
  position: absolute;
  bottom: -16px;
  right: -16px;

  input {
    display: none;
  }

  svg {
    cursor: pointer;
  }
`;

export const FieldsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > button {
    align-self: flex-end;
  }

  > textarea {
    height: 50vh;
  }
`;

export const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;