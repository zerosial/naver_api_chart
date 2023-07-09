import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { searchAsync } from "./features/redux/searchAsyncSlice";
import { AppDispatch } from "./app/store";
import { Space, DatePicker, Input, MenuProps, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import type { RangePickerProps } from "antd/es/date-picker";
import SelectBox from "./components/SelectBox";
import {
  ageItems,
  deviceItems,
  genderItems,
  timeUnitItems,
} from "./constants/itemList";
import { PostDataProps } from "./features/types/Api";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const async = useSelector((state: any) => {
    return state.searchAsync.value;
  });

  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";

  const [dates, setDates] = useState<[string, string]>();
  const [searchDate, setSearchDates] = useState<PostDataProps>({
    startDate: "2017-08-01",
    endDate: "2017-09-30",
    timeUnit: "month",
    category: "50000000",
    keyword: "정장",
    device: "",
    gender: "",
    ages: ["10", "20"],
  });

  const handleDateChange = (
    value: RangePickerProps["value"],
    dateString: [string, string]
  ) => {
    console.log(dateString);
    setDates(dateString);
  };

  const handleAgeChange = (value: string) => {
    console.log(value);
    message.info(`Click on item ${value}`);
  };

  const handleTimeUnitChange = (value: string) => {
    console.log(value);
    message.info(`Click on item ${value}`);
  };

  const handleGenderChange = (value: string) => {
    console.log(value);
    message.info(`Click on item ${value}`);
  };

  const handleDeviceChange = (value: string) => {
    console.log(value);
    message.info(`Click on item ${value}`);
  };

  const dummy_data = {
    startDate: "2020-08-01",
    endDate: "2020-09-30",
    timeUnit: "month",
    category: "50000000",
    keyword: "정장",
    device: "",
    gender: "",
    ages: ["10", "20"],
  };

  return (
    <div className="App">
      <header className="App-header">
        <Space direction="horizontal">
          <RangePicker
            defaultValue={[
              dayjs("2017-08-01", dateFormat),
              dayjs("2017-09-30", dateFormat),
            ]}
            onChange={handleDateChange}
          />
          <Input placeholder="카테고리" />
          <Input placeholder="키워드" />
        </Space>
        <Space direction="horizontal">
          <SelectBox
            title="timeUnit"
            items={timeUnitItems}
            onChange={handleTimeUnitChange}
          />
          <SelectBox title="age" items={ageItems} onChange={handleAgeChange} />
          <SelectBox
            title="gender"
            items={genderItems}
            onChange={handleGenderChange}
          />
          <SelectBox
            title="device"
            items={deviceItems}
            onChange={handleDeviceChange}
          />
        </Space>
        <button
          onClick={() => {
            dispatch(searchAsync(dummy_data));
          }}
        >
          async fetch
        </button>
        <br />
      </header>
    </div>
  );
}

export default App;
