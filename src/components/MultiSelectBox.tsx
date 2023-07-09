import { Select, Space } from "antd";

interface selectItem {
  label: string;
  value: string;
}

interface MultiSelectBoxProps {
  title: string;
  items: selectItem[];
  onChange: (value: string[]) => void;
}
function MultiSelectBox({ title, items, onChange }: MultiSelectBoxProps) {
  return (
    <>
      <Space direction="vertical">
        <Select
          mode="multiple"
          placeholder={title}
          onChange={onChange}
          options={items}
          style={{ width: "400px" }}
        />
      </Space>
    </>
  );
}

export default MultiSelectBox;
