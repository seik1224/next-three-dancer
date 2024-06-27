"use client";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Dancer } from "../Dancer";
import { Suspense, useEffect, useState } from "react";
import { Loader } from "../Loader";
import { MovingDom } from "../dom/MovingDom";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "@/stores";

export const MainCanvas = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);

  // 에러가 나기 때문에 아래 코드로 바꿈
  // const aspectRatio = window.innerWidth / window.innerHeight;

  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    handleResize(); // 초기 설정
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Canvas
        id="canvas"
        gl={{ antialias: true }}
        shadows="soft"
        camera={{
          fov: 30,
          aspect: aspectRatio,
          near: 0.01,
          far: 1000,
          position: [0, 6, 12],
        }}
        scene={{ background: new THREE.Color(0x000000) }}
      >
        {/* 페이지 8장, 댐핑 : 스무스하게 이동 */}
        <ScrollControls pages={isEntered ? 8 : 0} damping={0.25}>
          {/* React에서 비동기 작업을 처리할 때 사용, Suspense 컴포넌트는 React.lazy와 함께 사용되며, 비동기적으로 로드되는 컴포넌트를 감싸서 로딩 상태를 관리 */}
          <Suspense fallback={<Loader />}>
            <MovingDom />
            <Dancer />
          </Suspense>
        </ScrollControls>
      </Canvas>
    </>
  );
};
