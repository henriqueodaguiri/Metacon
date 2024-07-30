import { Container, InputElement } from "./styles";

export function Input({icon: Icon, ...rest}) {
  return (
    <Container>
      {
        Icon && <Icon size={30}/>
      }
      <InputElement {...rest}/>
    </Container>
  );
}