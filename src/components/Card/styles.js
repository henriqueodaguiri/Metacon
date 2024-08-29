"use client";
import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1.6rem;
  border-radius: 20px;
  overflow: hidden; 
  background-color: ${({ theme }) => theme.COLORS.WHITE };
  width: 320px;
  height: 320px;

  > p {
    margin: 0.8rem 0;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${({ theme, $newText }) => $newText ? theme.COLORS.PURPLE : theme.COLORS.DARK_BLUE };
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 1.6rem 2.4rem;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.WHITE };

  > h1 {
    color: ${({ theme }) => theme.COLORS.WHITE };
    font-size: 2.4rem;
  }

  > svg {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    color: ${({ theme }) => theme.COLORS.WHITE };

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const CoverContainer = styled.div`
  cursor: pointer;
  width: ${({ $newText }) => $newText ? "10rem" : "18rem" }; 
  height: ${({ $newText }) => $newText ? "10rem" : "20rem" }; 
  position: relative;
  margin: 0.8rem 0;

  > img {
    border-radius: 20px;
    margin-top: ${({ $newText }) => $newText ? "6rem" : "0" }; 
  }
`;
