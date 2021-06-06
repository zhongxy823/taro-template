import Taro from "@tarojs/taro";
import CodeMsg from "../assets/data/code.json";
import { DEFAULT_TIP_MESSAGE } from "./request";

/**
 * 错误处理
 * @param {Object} data 请求返回的信息
 */
export function handleError(data) {
  const message = CodeMsg[data.code] || data.msg || DEFAULT_TIP_MESSAGE;
  Taro.atMessage({
    message,
    type: "error",
  });
}
