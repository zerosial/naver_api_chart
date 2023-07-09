import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { searchAsync } from "./features/redux/searchAsyncSlice";
import { AppDispatch, RootState } from "./app/store";
import { Space, DatePicker, Input, message, Button } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import type { RangePickerProps } from "antd/es/date-picker";
import SelectBox from "./components/SelectBox";
import {
  ageItems,
  deviceItems,
  genderItems,
  timeUnitItems,
} from "./constants/itemList";
import { PostDataProps } from "./features/types/Api";
import MultiSelectBox from "./components/MultiSelectBox";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [loadings, setLoadings] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<PostDataProps>({
    startDate: "2017-08-01",
    endDate: "2017-09-30",
    timeUnit: "month",
    category: "50000000",
    keyword: "정장",
    device: "",
    gender: "",
    ages: ["10", "20"],
  });

  const state = useSelector((state: RootState) => {
    return state.searchAsync.status;
  });

  useEffect(() => {
    switch (state) {
      case "idle":
      case "failed":
        setLoadings(false);
        break;
      case "loading":
        setLoadings(true);
        break;
      default:
        break;
    }
  }, [state]);

  const async = useSelector((state: RootState) => {
    return state.searchAsync.value;
  });

  console.log(async, state);

  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";

  const handleDateChange = (
    value: RangePickerProps["value"],
    dateString: [string, string]
  ) => {
    const startDate = dateString[0];
    const endDate = dateString[1];
    setSearchData({ ...searchData, startDate, endDate });
  };

  const handleAgeChange = (value: string[]) => {
    setSearchData({ ...searchData, ages: value });
  };

  const handleTimeUnitChange = (value: string) => {
    setSearchData({ ...searchData, timeUnit: value });
  };

  const handleGenderChange = (value: string) => {
    setSearchData({ ...searchData, gender: value });
  };

  const handleDeviceChange = (value: string) => {
    setSearchData({ ...searchData, device: value });
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
        <MultiSelectBox
          title="age"
          items={ageItems}
          onChange={handleAgeChange}
        />
        <Space direction="horizontal">
          <SelectBox
            title="timeUnit"
            items={timeUnitItems}
            onChange={handleTimeUnitChange}
          />
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
          <Button
            type="primary"
            loading={loadings}
            onClick={() => {
              dispatch(searchAsync(searchData));
            }}
          >
            조회하기
          </Button>
        </Space>
        <br />
      </header>
    </div>
  );
}

export default App;
