"use client";
import { Container, InputElement } from "./styles";

export function Input({icon: Icon, borderColor, margin, bgColor, width, ...rest}) {
  return (
    <Container
      $bgColor={bgColor}
      $margin={margin}
      $borderColor={borderColor}
    >
      {
        Icon && <Icon size={30}/>
      }
      <InputElement 
        $width={width}
        {...rest}
      />
    </Container>
  );
}