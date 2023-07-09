import { Select } from "antd";

interface selectItem {
  label: string;
  value: string;
}

interface SelectBoxProps {
  title: string;
  items: selectItem[];
  onChange: (value: string) => void;
}

function SelectBox({ title, items, onChange }: SelectBoxProps) {
  return <Select placeholder={title} options={items} onChange={onChange} />;
}

export default SelectBox;
