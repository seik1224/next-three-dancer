## 필요 라이브러리 설치

npx create-next-app@latest ./
npm i three @react-three/drei @react-three/fiber recoil styled-components

---

## 초기 세팅

MainCanvas.tsx

```bash
"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Dancer } from "../Dancer";

export const MainCanvas = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;

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
        <Dancer />
        <OrbitControls />
      </Canvas>
    </>
  );
};
```

Modeling.tsx

```bash
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Dancer = () => {
  const dancerRef = useRef<THREE.Object3D>(null);

  const { scene, animations } = useGLTF("/models/dancer.glb"); // useGLTF Hook으로 모델링 로드
  console.log(scene, animations);

  const { actions } = useAnimations(animations, dancerRef); // useAnimations Hook으로 애니메이션 로드
  console.log("actions", actions);

  useEffect(() => {
    actions["wave"]?.play();
  }, [actions]);
  return (
    <>
      <primitive ref={dancerRef} object={scene} scale={0.05} />
      <ambientLight intensity={2} />
    </>
  );
};

```

---

## Drei 스크롤 컨트롤

MainCanvas.tsx

```bash
{/* 페이지 8장, 댐핑 : 스무스하게 이동 */}
<ScrollControls pages={8} damping={0.25}>
    <Dancer />
</ScrollControls>
```

Modeling.tsx

```bash
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Dancer = () => {
  const dancerRef = useRef<THREE.Object3D>(null);

  const { scene, animations } = useGLTF("/models/dancer.glb"); // useGLTF Hook으로 모델링 로드
  console.log(scene, animations);

  const { actions } = useAnimations(animations, dancerRef); // useAnimations Hook으로 애니메이션 로드
  console.log("actions", actions);

  const scroll = useScroll(); // ScrollControls 하위에 있는 컴포넌트가 사용 가능한 hook
  console.log("scroll", scroll);

  useFrame(() => {
    console.log("scroll offset", scroll.offset); // 현재 스크롤한 값
  });
  useEffect(() => {
    actions["wave"]?.play();
  }, [actions]);
  return (
    <>
      <primitive ref={dancerRef} object={scene} scale={0.05} />
      <ambientLight intensity={2} />
    </>
  );
};

```

---

## 리코일

클라이언트서버에서 동작함

1. 리코일로 감싸기

```bash
"use client";
import { MainCanvas } from "@/components/MainCanvas";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <main className="w-dvw h-dvh overflow-hidden">
        <MainCanvas />
      </main>
    </RecoilRoot>
  );
}

```

2. 리코일의 아톰을 하나 만들어줌
   stores/index.ts

```bash
import { atom } from "recoil";

export const IsEnteredAtom = atom({
  key: "IsEnteredAtom",
  default: false,
});

```

3. 사용할 곳에서 가져다 쓰기

```bash
const isEntered = useRecoilValue(IsEnteredAtom);
```

---

## 페이지 만들기

MovingDom.tsx
따로 컴포넌트를 만들어서 제어한다.
페이지의 개수만큼 ref를 만들고 스크롤 시 제어
Scroll이라는 drei에서 제공해주는 컴포넌트 이용

```bash
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

```

---

##

MainCanvas.tsx

```bash

```

Modeling.tsx

```bash

```

---

##

MainCanvas.tsx

```bash

```

Modeling.tsx

```bash

```
