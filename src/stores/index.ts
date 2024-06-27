import { atom } from "recoil";

export const IsEnteredAtom = atom({
  key: "IsEnteredAtom", // 각 atom은 고유한 키를 가져야 합니다.
  default: false, // 초기값
});
