"use client";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: none;
`;

export const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; 
`;
