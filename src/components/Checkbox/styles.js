"use client";
import styled from "styled-components";

export const Container = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckbox = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  transition: all 150ms;
  border: 2px solid ${({ theme }) => theme.COLORS.PURPLE};
  display: flex;
  align-items: flex-start;
  justify-content: center;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.COLORS.VIOLET};
  }
`;

export const IconWrapper = styled.div`
  font-size: 1.6rem;

  > svg {
    color: ${({ theme }) => theme.COLORS.PURPLE};
  }
`;
