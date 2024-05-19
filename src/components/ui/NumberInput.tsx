"use client";

import { NumberInput as NI, NumberInputHandlers } from "@mantine/core";
import s from "@/scss/components/ui/NumberInput.module.scss";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DownChevron } from "../icons/downChevron";

interface NumberInputProps {
  label?: string;
  placeholder?: string;
  onChange: (value: string | number) => void,
  value?: string | null
}

export const NumberInput = ({ label, placeholder, onChange, value }: NumberInputProps) => {
  const handlersRef = useRef<NumberInputHandlers>(null);
  const [numberInputValue, setNumberInputValue] = useState<string | number | undefined>(value || undefined)
  
  useEffect(() => {
    if(value === null){
      setNumberInputValue(undefined)
    }
  }, [value === null])

  const numberInputOnChange = (val: string | number) => {
    setNumberInputValue(val)
    onChange(val)
  }
  return (
    <div className={s.wrapper}>
      <NI
        value={(value === null && numberInputValue === undefined) ? "" : numberInputValue}
        onChange={numberInputOnChange}
        min={0}
        max={10}
        handlersRef={handlersRef}
        classNames={{ label: s.label, input: s.input }}
        size="md"
        radius="md"
        label={label}
        placeholder={placeholder}
        hideControls
      />
      <div className={s.controls}>
        <button onClick={() => handlersRef.current?.increment()}>
          <DownChevron className={s.up} />
        </button>
        <button onClick={() => handlersRef.current?.decrement()}>
          <DownChevron className={s.down} />
        </button>
      </div>
    </div>
  );
};
