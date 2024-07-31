"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.COLORS.BLUE};
  border-radius: 20px;
  padding: 1.6rem;
`;

export const InputElement = styled.input`
  background-color: transparent;
  border: none;
  padding-left: 0.8rem;
`;