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

function App() {
  const [loadings, setLoadings] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<PostDataProps>({
    startDate: "",
    endDate: "",
    timeUnit: "",
    category: "",
    keyword: "",
    device: "",
    gender: "",
    ages: [],
  });

  const state = useSelector((state: RootState) => state.searchAsync.status);
  const async = useSelector((state: RootState) => state.searchAsync.value);

  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";

  // Redux Status Handling
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
    console.log(async);
  }, [state]);

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
              dayjs("2017-08-01", dateFormat),
              dayjs("2017-09-30", dateFormat),
            ]}
            onChange={handleDateChange}
          />
          <Input
            placeholder="카테고리"
            onChange={(e) => handleDataChange("category")(e.target.value)}
          />
          <Input
            placeholder="키워드"
            onChange={(e) => handleDataChange("keyword")(e.target.value)}
          />
          <SelectBox
            title="timeUnit"
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
        <br />
      </header>
    </div>
  );
}

export default App;
