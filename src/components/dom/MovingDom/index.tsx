import { IsEnteredAtom } from "@/stores";
import { Scroll } from "@react-three/drei";
import { useRef } from "react";
import { useRecoilValue } from "recoil";

export const MovingDom = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const article01Ref = useRef(null);
  const article02Ref = useRef(null);
  const article03Ref = useRef(null);
  const article04Ref = useRef(null);
  const article05Ref = useRef(null);
  const article06Ref = useRef(null);
  const article07Ref = useRef(null);
  const article08Ref = useRef(null);
  if (!isEntered) return null;
  // Scroll이라는 drei에서 제공해주는 컴포넌트 이용, html요소를 넣을것이다
  return (
    <Scroll html>
      <section
        ref={article01Ref}
        className="flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
      <section
        ref={article02Ref}
        className="flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
      <section
        ref={article03Ref}
        className="flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
      <section
        ref={article04Ref}
        className="flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
      <section
        ref={article05Ref}
        className="flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
      <section
        ref={article06Ref}
        className="flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
      <section
        ref={article07Ref}
        className="flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
      <section
        ref={article08Ref}
        className="flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
    </Scroll>
  );
};
