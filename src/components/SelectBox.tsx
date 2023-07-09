import { Select } from "antd";

interface selectItem {
  label: string;
  value: string;
}

interface SelectBoxProps {
  title: string;
  items: selectItem[];
  defaultValue?: string;
  onChange: (value: string) => void;
}

function SelectBox({ title, items, defaultValue, onChange }: SelectBoxProps) {
  return (
    <Select
      placeholder={title}
      defaultValue={defaultValue}
      options={items}
      onChange={onChange}
    />
  );
}

export default SelectBox;
