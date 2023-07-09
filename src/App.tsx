/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { searchAsync } from "./features/redux/searchAsyncSlice";
import { AppDispatch, RootState } from "./app/store";
import { Space, DatePicker, Input, Button } from "antd";
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
import checkValidData from "./utils/checkValidData";
import LineChart from "./components/LineChart";
import { DUMMY_DATA } from "./constants/dummyData";

function App() {
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

  const state = useSelector((state: RootState) => state.searchAsync.status);
  const value = useSelector((state: RootState) => state.searchAsync.value);

  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";

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
    setSearchData({ ...searchData, ...value });
  }, [state, value]);

  const dispatch = useDispatch<AppDispatch>();

  const handleDataChange =
    (key: keyof PostDataProps) => (value: string | string[]) => {
      setSearchData((prevData) => ({ ...prevData, [key]: value }));
    };

  const handleDateChange = (
    value: RangePickerProps["value"],
    dateString: [string, string]
  ) => {
    setSearchData((prevData) => ({
      ...prevData,
      startDate: dateString[0],
      endDate: dateString[1],
    }));
  };

  const handleSearchButton = () => {
    if (checkValidData(searchData)) {
      dispatch(searchAsync(searchData));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>상단 첫줄은 필수값 입니다.</div>
        <Space direction="horizontal">
          <RangePicker
            defaultValue={[
              dayjs(value.startDate, dateFormat),
              dayjs(value.endDate, dateFormat),
            ]}
            onChange={handleDateChange}
          />
          <Input
            placeholder="카테고리"
            defaultValue={50000000}
            onChange={(e) => handleDataChange("category")(e.target.value)}
          />
          <Input
            placeholder="키워드"
            defaultValue={value.results ? value.results[0].title : "정장"}
            onChange={(e) => handleDataChange("keyword")(e.target.value)}
          />
          <SelectBox
            title="timeUnit"
            defaultValue={value.timeUnit}
            items={timeUnitItems}
            onChange={handleDataChange("timeUnit")}
          />
        </Space>
        <Space direction="horizontal">
          <MultiSelectBox
            title="age"
            items={ageItems}
            onChange={handleDataChange("ages")}
          />
          <SelectBox
            title="gender"
            items={genderItems}
            onChange={handleDataChange("gender")}
          />
          <SelectBox
            title="device"
            items={deviceItems}
            onChange={handleDataChange("device")}
          />
          <Button
            type="primary"
            loading={loadings}
            onClick={handleSearchButton}
          >
            조회하기
          </Button>
        </Space>
        <Space style={{ paddingTop: "32px" }}>
          {value.results && (
            <LineChart
              data={value.results[0].data || DUMMY_DATA}
              width={800}
              height={400}
            />
          )}
        </Space>
      </header>
    </div>
  );
}

export default App;
