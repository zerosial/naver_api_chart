import { PostDataProps } from "../features/types/Api";
import { message } from "antd";

function checkValidData(data: PostDataProps) {
  if (!data.startDate) {
    message.error("시작 날짜가 옳바르지 않습니다.");
    return false;
  }
  if (!data.endDate) {
    message.error("종료 날짜가 옳바르지 않습니다.");
    return false;
  }
  if (!data.timeUnit) {
    message.error("timeUnit가 옳바르지 않습니다");
    return false;
  }
  if (!data.category) {
    message.error("category가 옳바르지 않습니다");
    return false;
  }
  if (!data.keyword) {
    message.error("keyword가 옳바르지 않습니다");
    return false;
  }

  return true;
}

export default checkValidData;
