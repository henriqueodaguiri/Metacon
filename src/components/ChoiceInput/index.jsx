"use client";
import { InputWrapper} from "./styles";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { useTheme } from "styled-components";

export function ChoiceInput({ label, value, setValue, checked, onCheck, done, disable = false }) {
  const theme = useTheme();
  
  return (
    <InputWrapper>
      <Input 
        placeholder={label}
        borderColor={checked ? theme.COLORS.BLUE : theme.COLORS.PURPLE}
        value={value}
        onChange={e => setValue(e.target.value)}
        {...(disable && { disabled: true })}
      />
      <Checkbox checked={checked} onChange={onCheck} disabled={done}/>
    </InputWrapper>
  );
}