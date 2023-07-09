import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { searchAsync } from "./features/redux/searchAsyncSlice";
import { AppDispatch } from "./app/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: any) => {
    return state.searchAsync.value;
  });

  console.log(count);

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
        <img src={logo} className="App-logo" alt="logo" />
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
