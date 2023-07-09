import { PostDataProps } from "../types/Api";
import { naverApi } from "./instance";

export default async function postData(data: PostDataProps) {
  try {
    const response = await naverApi.post("/age", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
