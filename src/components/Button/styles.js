import styled from "styled-components";

export const Container = styled.button`
  text-transform: uppercase;
  padding: 2rem;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.BLUE};
  width: 100%;
`;
