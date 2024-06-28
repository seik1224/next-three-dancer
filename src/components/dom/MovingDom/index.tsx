import { IsEnteredAtom } from "@/stores";
import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import clsx from "clsx";
import { useRef } from "react";
import { useRecoilValue } from "recoil";

export const MovingDom = () => {
  const scroll = useScroll();

  const isEntered = useRecoilValue(IsEnteredAtom);

  const fixed = document.getElementById("fixed");
  const article01Ref = useRef<HTMLDivElement>(null);
  const article02Ref = useRef<HTMLDivElement>(null);
  const article03Ref = useRef<HTMLDivElement>(null);
  const article04Ref = useRef<HTMLDivElement>(null);
  // const article05Ref = useRef(null);
  // const article06Ref = useRef(null);
  // const article07Ref = useRef(null);
  const article08Ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (
      !isEntered ||
      !article01Ref.current ||
      !article02Ref.current ||
      !article03Ref.current ||
      !article04Ref.current ||
      !article08Ref.current
    )
      return;
    /*
    scroll.range(a,b) a 위치에서는 0, b 위치(a에서 b 만큼 움직임)에서는 1을 리턴하는 함수
    scroll.curve(a,b) a, b 위치에서는 0을 리턴, 중간에서 1을 리턴하는 함수
    */
    article01Ref.current.style.opacity = `${1 - scroll.range(0, 1 / 8)}`;
    article02Ref.current.style.opacity = `${1 - scroll.range(1 / 8, 1 / 8)}`;
    article03Ref.current.style.opacity = `${scroll.curve(2 / 8, 1 / 8)}`;
    article04Ref.current.style.opacity = `${scroll.curve(3 / 8, 1 / 8)}`;
    if (scroll.visible(4 / 8, 3 / 8)) {
      fixed!.style.display = "flex";
      fixed!.style.opacity = `${scroll.curve(4 / 8, 3 / 8)}`;
    } else {
      fixed!.style.display = "none";
    }
    article08Ref.current.style.opacity = `${scroll.range(7 / 8, 1 / 8)}`;
  });
  if (!isEntered) return null;
  // Scroll이라는 drei에서 제공해주는 컴포넌트 이용, html요소를 넣을것이다
  return (
    <Scroll html>
      <section
        ref={article01Ref}
        className=" flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      >
        <div className="flex flex-col justify-center items-center self-start min-w-fit h-[400px]">
          <span className="text-3xl">FLEX InteracTive Web Lecture</span>
          <span className="text-4xl">FLEX iNteracTive Web Lecture</span>
          <span className="text-xl">FLEX inTeracTive Web Lecture</span>
          <span className="text-2xl">FLEX iNtEracTive Web Lecture</span>
          <span className="text-3xl">FLEX iNteRacTive Web Lecture</span>
        </div>
      </section>
      <section
        ref={article02Ref}
        className=" flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      >
        <div className="flex flex-col justify-center items-center self-end min-w-fit h-[400px]">
          <span className="text-3xl">FLEX InteracTive Web Lecture</span>
          <span className="text-4xl">FLEX iNteracTive Web Lecture</span>
          <span className="text-xl">FLEX inTeracTive Web Lecture</span>
          <span className="text-2xl">FLEX iNtEracTive Web Lecture</span>
          <span className="text-3xl">FLEX iNteRacTive Web Lecture</span>
        </div>
      </section>
      <section
        ref={article03Ref}
        className=" flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      >
        Threejs R3F Drei Cannon
      </section>
      <section
        ref={article04Ref}
        className="h-[400vh] flex flex-col justify-center items-center opacity-0 w-dvw bg-transparent text-white text-2xl p-10"
      >
        <div className="flex flex-col justify-center items-center self-end min-w-fit h-[400px]">
          <span className="text-3xl">FLEX InteracTive Web Lecture</span>
          <span className="text-4xl">FLEX iNteracTive Web Lecture</span>
          <span className="text-xl">FLEX inTeracTive Web Lecture</span>
          <span className="text-2xl">FLEX iNtEracTive Web Lecture</span>
          <span className="text-3xl">FLEX iNteRacTive Web Lecture</span>
        </div>
      </section>
      {/* <section
        ref={article05Ref}
        className=" flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
      <section
        ref={article06Ref}
        className=" flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section>
      <section
        ref={article07Ref}
        className=" flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      ></section> */}
      <section
        ref={article08Ref}
        className=" flex flex-col justify-center items-center opacity-0 w-dvw h-dvh bg-transparent text-white text-2xl p-10"
      >
        {`You've mastered the basics of R3F.`}
        <footer className="absolute bottom-3 text-sm">
          {`You've mastered the basics of R3F.You've mastered the basics of`}
          {`R3F.You've mastered the basics of R3F.You've mastered the basics of`}
          {`R3F.You've mastered the basics of R3F.You've mastered the basics of`}
          {`R3F.`}
        </footer>
      </section>
    </Scroll>
  );
};
