import { naverApi } from "./instance";

type AgeRange = "10" | "20" | "30" | "40" | "50";

interface PostDataProps {
  startDate: string;
  endDate: string;
  timeUnit: string;
  category: string;
  keyword: string;
  device: string;
  gender: string;
  ages: AgeRange[];
}
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
