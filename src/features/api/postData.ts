import { naverApi } from "./instance";

export default async function postData() {
  const body = {
    startDate: "2017-08-01",
    endDate: "2017-09-30",
    timeUnit: "month",
    category: "50000000",
    keyword: "정장",
    device: "",
    gender: "",
    ages: ["10", "20"],
  };

  try {
    const response = await naverApi.post("/age", body);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
