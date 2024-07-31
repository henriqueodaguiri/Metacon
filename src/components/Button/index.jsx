"use client";
import { Container } from "./styles";

export function Button({icon: Icon, title, width, bgColor, padding, ...rest}) {
  return (
    <Container 
      type="button"
      $width={width}
      $bgColor={bgColor}
      $padding={padding}
      {...rest}
    >
      {
        Icon && <Icon size={40}/>
      }
      {
        title
      }
    </Container>
  );
}