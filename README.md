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

## GSAP

npm i gsap
useEffect의 dependency만 잘 확인하자
three.camera.position, three.camera.rotation과 같이 camera가 바뀌는 것도 넣어줘야함

```bash
useEffect(() => {
    if (!isEntered) return;
    actions["wave"]?.play();
  }, [actions, isEntered]);

  // GSAP 시작
  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;
    gsap.fromTo(
      three.camera.position,
      {
        x: -5,
        y: 5,
        z: 5,
      },
      {
        duration: 2.5,
        x: 0,
        y: 6,
        z: 12,
      }
    );
    gsap.fromTo(
      three.camera.rotation,
      {
        z: Math.PI,
      },
      {
        duration: 2.5,
        z: 0,
      }
    );
  }, [isEntered, three.camera.position, three.camera.rotation]);

```

---

## Timeline

1. 변수선언
   const timelineRef = useRef<gsap.core.Timeline | null>(null);

2. useFrame
   seek 함수는 GSAP(GreenSock Animation Platform) 라이브러리에서 제공하는 메서드로, 타임라인의 특정 시점으로 애니메이션을 이동시키는 역할을 합니다.

   timeline.seek(time, suppressEvents);
   time: 타임라인에서 이동하고자 하는 시점. 초 단위 또는 레이블을 사용할 수 있습니다.
   suppressEvents: (선택 사항) true로 설정하면 해당 시점으로 이동할 때 발생하는 이벤트를 억제합니다.

   timeline.seek(scroll.offset \* timeline.duration());현재 스크롤 위치에 따라 타임라인의 애니메이션을 동기화하는 역할

```bash
useFrame(() => {
  // console.log("scroll offset", scroll.offset); // 현재 스크롤한 값
  if (!isEntered || !timelineRef.current) return; // useRef의 current 사용
  timelineRef.current.seek(scroll.offset * timelineRef.current.duration());
});
```

3. useEffect

```bash
useEffect(() => {
  if (!isEntered) return;
  if (!dancerRef.current) return;
  timelineRef.current = gsap.timeline(); // useRef의 current에 할당
  timelineRef.current
    .from(
      dancerRef.current.rotation,
      {
        duration: 4,
        y: -4 * Math.PI,
      },
      0.5
    )
    .from(
      dancerRef.current.position,
      {
        duration: 4,
        x: 3,
      },
      "<"
    )
    .to(
      three.camera.position,
      {
        duration: 10,
        x: 2,
        z: 8,
      },
      "<"
    )
    .to(three.camera.position, {
      duration: 10,
      x: 0,
      z: 6,
    })
    .to(three.camera.position, {
      duration: 10,
      x: 0,
      z: 16,
    });
}, [isEntered, three.camera]);
```

---

## 다른 오브젝트 제어

1. 필요한 조명부터 배치하고 ref를 잘 넣어준다.

```bash
<rectAreaLight
  ref={rectAreaLightRef}
  position={[0, 10, 0]}
  intensity={30}
/>
<pointLight
  position={[0, 5, 0]}
  intensity={45}
  castShadow
  receiveShadow
/>
<hemisphereLight
  ref={hemisphereLightRef}
  position={[0, 5, 0]}
  intensity={0}
  groundColor={"lime"}
  color={"blue"}
/>
```

2. 애니메이션을 state로 관리하기 위하여 state 만들어준다.

```bash
  const [currentAnimation, setCurrentAnimation] = useState("wave");
  const [rotateFinished, setRotateFinished] = useState(false); // 카메라가 마지막에 회전을 마무리 했는지 여부에 따라 useFrame()에서 애니메이션 바꿔주기 위해
```

3. GSAP에서 사용한다.

```bash
.to(hemisphereLightRef.current, {
  duration: 5,
  intensity: 30,
})
```

---

##

MainCanvas.tsx

```bash

```

Modeling.tsx

```bash

```
