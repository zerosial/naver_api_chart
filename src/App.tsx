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

const DUMMY_DATA = [
  {
    period: "2017-07-31",
    ratio: 5.48362,
    group: "10",
  },
  {
    period: "2017-07-31",
    ratio: 19.42117,
    group: "20",
  },
  {
    period: "2017-07-31",
    ratio: 25.20944,
    group: "30",
  },
  {
    period: "2017-07-31",
    ratio: 6.47372,
    group: "40",
  },
  {
    period: "2017-07-31",
    ratio: 2.05635,
    group: "50",
  },
  {
    period: "2017-08-07",
    ratio: 4.3412,
    group: "10",
  },
  {
    period: "2017-08-07",
    ratio: 25.51408,
    group: "20",
  },
  {
    period: "2017-08-07",
    ratio: 34.80578,
    group: "30",
  },
  {
    period: "2017-08-07",
    ratio: 10.6626,
    group: "40",
  },
  {
    period: "2017-08-07",
    ratio: 1.21858,
    group: "50",
  },
  {
    period: "2017-08-07",
    ratio: 0.15232,
    group: "60",
  },
  {
    period: "2017-08-14",
    ratio: 4.56968,
    group: "10",
  },
  {
    period: "2017-08-14",
    ratio: 44.40213,
    group: "20",
  },
  {
    period: "2017-08-14",
    ratio: 47.37242,
    group: "30",
  },
  {
    period: "2017-08-14",
    ratio: 15.76542,
    group: "40",
  },
  {
    period: "2017-08-14",
    ratio: 3.96039,
    group: "50",
  },
  {
    period: "2017-08-14",
    ratio: 0.68545,
    group: "60",
  },
  {
    period: "2017-08-21",
    ratio: 7.38766,
    group: "10",
  },
  {
    period: "2017-08-21",
    ratio: 40.21325,
    group: "20",
  },
  {
    period: "2017-08-21",
    ratio: 55.75019,
    group: "30",
  },
  {
    period: "2017-08-21",
    ratio: 16.75552,
    group: "40",
  },
  {
    period: "2017-08-21",
    ratio: 2.361,
    group: "50",
  },
  {
    period: "2017-08-21",
    ratio: 1.21858,
    group: "60",
  },
  {
    period: "2017-08-28",
    ratio: 19.42117,
    group: "10",
  },
  {
    period: "2017-08-28",
    ratio: 55.90251,
    group: "20",
  },
  {
    period: "2017-08-28",
    ratio: 73.80045,
    group: "30",
  },
  {
    period: "2017-08-28",
    ratio: 18.73571,
    group: "40",
  },
  {
    period: "2017-08-28",
    ratio: 2.13252,
    group: "50",
  },
  {
    period: "2017-08-28",
    ratio: 0.22848,
    group: "60",
  },
  {
    period: "2017-09-04",
    ratio: 5.86443,
    group: "10",
  },
  {
    period: "2017-09-04",
    ratio: 80.4265,
    group: "20",
  },
  {
    period: "2017-09-04",
    ratio: 79.28408,
    group: "30",
  },
  {
    period: "2017-09-04",
    ratio: 20.03046,
    group: "40",
  },
  {
    period: "2017-09-04",
    ratio: 3.65575,
    group: "50",
  },
  {
    period: "2017-09-04",
    ratio: 0.60929,
    group: "60",
  },
  {
    period: "2017-09-11",
    ratio: 6.54988,
    group: "10",
  },
  {
    period: "2017-09-11",
    ratio: 55.59786,
    group: "20",
  },
  {
    period: "2017-09-11",
    ratio: 95.20182,
    group: "30",
  },
  {
    period: "2017-09-11",
    ratio: 24.75247,
    group: "40",
  },
  {
    period: "2017-09-11",
    ratio: 4.26504,
    group: "50",
  },
  {
    period: "2017-09-11",
    ratio: 0.07616,
    group: "60",
  },
  {
    period: "2017-09-18",
    ratio: 5.25514,
    group: "10",
  },
  {
    period: "2017-09-18",
    ratio: 60.62452,
    group: "20",
  },
  {
    period: "2017-09-18",
    ratio: 100,
    group: "30",
  },
  {
    period: "2017-09-18",
    ratio: 18.05026,
    group: "40",
  },
  {
    period: "2017-09-18",
    ratio: 1.90403,
    group: "50",
  },
  {
    period: "2017-09-18",
    ratio: 0.76161,
    group: "60",
  },
  {
    period: "2017-09-25",
    ratio: 7.3115,
    group: "10",
  },
  {
    period: "2017-09-25",
    ratio: 66.33663,
    group: "20",
  },
  {
    period: "2017-09-25",
    ratio: 68.46915,
    group: "30",
  },
  {
    period: "2017-09-25",
    ratio: 17.21249,
    group: "40",
  },
  {
    period: "2017-09-25",
    ratio: 5.25514,
    group: "50",
  },
  {
    period: "2017-09-25",
    ratio: 0.45696,
    group: "60",
  },
];

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
