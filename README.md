## 필요 라이브러리 설치

npx create-next-app@latest ./
npm i three @react-three/drei @react-three/fiber recoil styled-components

---

## 초기 세팅

MainCanvas파일

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

Modeling파일

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
