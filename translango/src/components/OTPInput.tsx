import { Divider, OutlinedInput, Stack } from "@mui/material";
import { ChangeEventHandler, KeyboardEventHandler, useRef, useState } from "react";

interface Props {
  inputLength: number;
}

function isNumber(value: string | number): boolean {
  return value != null && value !== "" && !isNaN(Number(value.toString()));
}

const DigitInput: React.FC = () => {
  const textref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');
  const inputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    let inputValue = event.currentTarget.value.trim();;
    if (inputValue.length === 0) {
      setValue('');
      return;
    }
    while (inputValue.length > 0) {
      if (isNumber(inputValue[0])) {
          setValue(inputValue[0]);
    }
    return;
    }
  };

  const keyPressHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
    
  };
  return <OutlinedInput sx={{ maxWidth: "60px" }} onKeyDown={keyPressHandler} inputRef={textref} onChange={inputHandler} value={value}/>;
};

const OTPInput: React.FC<Props> = ({ inputLength }) => {
  return (
    <Stack
      justifyContent="center"
      px={4}
      my={2}
      divider={<Divider orientation="vertical" flexItem />}
      direction="row"
      gap={2}
      alignContent="center"
    >
      {[...Array(inputLength)].map((_, i) => (
        <DigitInput key={i} />
      ))}
    </Stack>
  );
};

export default OTPInput;
