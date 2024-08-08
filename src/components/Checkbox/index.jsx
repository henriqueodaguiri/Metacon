"use client";
import { Container, HiddenCheckbox, StyledCheckbox, IconWrapper } from "./styles";
import { FaCheck } from "react-icons/fa";

export function Checkbox({ className, checked, ...props }) {
  return (
    <Container className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        {checked && <IconWrapper><FaCheck /></IconWrapper>}
      </StyledCheckbox>
    </Container>
  );
}
