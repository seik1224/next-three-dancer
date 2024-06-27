import { IsEnteredAtom } from "@/stores";
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { Loader } from "../Loader";

export const Dancer = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);

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
    if (!isEntered) return;
    actions["wave"]?.play();
  }, [actions]);

  if (isEntered) {
    return (
      <>
        <primitive ref={dancerRef} object={scene} scale={0.05} />
        <ambientLight intensity={2} />
      </>
    );
  }
  return <Loader isCompleted />;
};
