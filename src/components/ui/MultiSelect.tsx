import { ComboboxData, MultiSelect as MSL } from "@mantine/core";
import s from "@/scss/components/ui/Select.module.scss";
import { DownChevron } from "../icons/downChevron";
import { useState } from "react";
import clsx from "clsx";

interface MultiSelectProps {
  label?: string;
  className?: string;
  placeholder?: string;
  data: ComboboxData;
  onChange: (value: string[] | null) => void;
  defaultValue?: string[];
  value?: string[];
}

export const MultiSelect = ({
  label,
  className,
  placeholder,
  data,
  onChange,
  defaultValue,
  value,
}: MultiSelectProps) => {

  const [opened, setOpened] = useState(false);

  return (
    <MSL
      value={value}
      defaultValue={defaultValue}
      onChange={(value) => onChange(value)}
      placeholder={placeholder}
      comboboxProps={{ dropdownPadding: 4 }}
      className={clsx(className, opened && s.open)}
      rightSection={<DownChevron className={s.chevron} />}
      classNames={{
        label: s.label,
        option: s.option,
        input: s.input,
        wrapper: s.wrapper,
      }}
      onDropdownOpen={() => setOpened(true)}
      onDropdownClose={() => setOpened(false)}
      size="md"
      radius="md"
      label={label}
      data={data}
    />
  );
};
