//type AgeRange = "10" | "20" | "30" | "40" | "50";

export interface PostDataProps {
  startDate: string;
  endDate: string;
  timeUnit: string;
  category: string;
  keyword: string;
  device: string;
  gender: string;
  ages: string[];
}
