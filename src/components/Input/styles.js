"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ $bgColor, theme }) => $bgColor || theme.COLORS.LIGHT };
  margin: ${({ $margin }) => $margin || 0 };
  border: 2px solid ${({ theme }) => theme.COLORS.VIOLET};
  border-radius: 20px;
  padding: 1.6rem;
`;

export const InputElement = styled.input`
  background-color: transparent;
  border: none;
  padding-left: 0.8rem;
  width: ${({ $width }) => $width || "auto" };
`;