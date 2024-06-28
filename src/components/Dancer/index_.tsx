import { IsEnteredAtom } from "@/stores";
import {
  Box,
  Circle,
  Points,
  useAnimations,
  useGLTF,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { Loader } from "../Loader";
import gsap from "gsap";

export const Dancer = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null); // useRef로 변경

  const colors = useMemo(
    () => ({
      boxMaterialColor: "#DC4F00",
      // currentAnimation: "wave",
    }),
    []
  );
  const [currentAnimation, setCurrentAnimation] = useState("wave");
  const [rotateFinished, setRotateFinished] = useState(false); // 카메라가 마지막에 회전을 마무리 했는지 여부

  const three = useThree();
  const isEntered = useRecoilValue(IsEnteredAtom);

  const dancerRef = useRef<THREE.Object3D>(null);
  const boxRef =
    useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>>(null);
  const starGroupRef01 = useRef(null);
  const starGroupRef02 = useRef(null);
  const starGroupRef03 = useRef(null);
  const rectAreaLightRef = useRef(null);
  const hemisphereLightRef = useRef(null);

  const { scene, animations } = useGLTF("/models/dancer.glb"); // useGLTF Hook으로 모델링 로드
  console.log(scene, animations);

  const { actions } = useAnimations(animations, dancerRef); // useAnimations Hook으로 애니메이션 로드
  console.log("actions", actions);

  const scroll = useScroll(); // ScrollControls 하위에 있는 컴포넌트가 사용 가능한 hook
  console.log("scroll", scroll);

  // texture
  const texture = useTexture("/textures/5.png");
  const { positions } = useMemo(() => {
    const count = 500; // 별의 개수 500개
    const positions = new Float32Array(count * 3); // 500개를 어레이로 3개씩 나눔

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }
    return { positions };
  }, []);

  useFrame(() => {
    // console.log("scroll offset", scroll.offset); // 현재 스크롤한 값
    if (!isEntered || !timelineRef.current) return; // useRef의 current 사용
    timelineRef.current.seek(scroll.offset * timelineRef.current.duration());

    if (boxRef.current) {
      boxRef.current.material.color = new THREE.Color(colors.boxMaterialColor);
    }

    if (rotateFinished) {
      setCurrentAnimation("breakdancingEnd");
    } else {
      setCurrentAnimation("wave");
    }
  });

  // 초기화
  useEffect(() => {
    if (!isEntered) return;
    three.camera.lookAt(1, 2, 0);
    actions["wave"]?.play();
    three.scene.background = new THREE.Color(colors.boxMaterialColor);
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [
    actions,
    isEntered,
    scene,
    three.camera,
    three.scene,
    colors.boxMaterialColor,
  ]);

  // 애니메이션 컨트롤 : 마지막 애니메이션 제어만 담당
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentAnimation === "wave") {
      actions[currentAnimation]?.reset().fadeIn(0.5).play();
    } else {
      actions[currentAnimation]
        ?.reset()
        .fadeIn(0.5)
        .play()
        .setLoop(THREE.LoopOnce, 1); // 1번만 실행

      timeout = setTimeout(() => {
        if (actions[currentAnimation]) {
          actions[currentAnimation]!.paused = true;
        }
      }, 8000);
    }
    return () => {
      clearTimeout(timeout);
      actions[currentAnimation]?.reset().fadeOut(0.5).stop();
    };
  }, [
    actions,
    isEntered,
    scene,
    three.camera,
    three.scene,
    currentAnimation,
    scroll.offset,
  ]);

  // gsap 초기 카메라 회전 및 배경 별 반짝임 애니메이션
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

    gsap.fromTo(
      colors,
      { boxMaterialColor: "#0C0400" },
      {
        duration: 2.5,
        boxMaterialColor: "#DC4F00",
      }
    );

    gsap.to(starGroupRef01.current, {
      yoyo: true,
      duration: 2,
      repeat: -1, // 무한반복
      ease: "linear",
      size: 0.05,
    });

    gsap.to(starGroupRef02.current, {
      yoyo: true,
      duration: 3,
      repeat: -1,
      // ease: "power1.inOut",

      ease: "linear",
      size: 0.05,
    });

    gsap.to(starGroupRef03.current, {
      yoyo: true,
      duration: 4,
      repeat: -1,
      // ease: "elastic.in",

      ease: "linear",
      size: 0.05,
    });
  }, [isEntered, three.camera.position, three.camera.rotation, colors]);

  // 스크롤 시, 일어날 애니메이션 컨트롤
  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;

    // 카메라를 특정위치 중심으로 회전하고 싶을때(태양 지구)
    // 카메라가 댄서를 중심으로 pivot그룹
    const pivot = new THREE.Group();
    pivot.position.copy(dancerRef.current.position);
    pivot.add(three.camera);
    three.scene.add(pivot);

    timelineRef.current = gsap.timeline(); // useRef의 current에 할당
    timelineRef.current
      .from(
        dancerRef.current.rotation,
        {
          duration: 4,
          y: Math.PI,
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
      .to(
        colors,
        {
          duration: 10,
          boxMaterialColor: "#0C0400",
        },

        "<"
      )
      .to(pivot.rotation, {
        duration: 10,
        y: Math.PI,
      })
      .to(
        three.camera.position,
        {
          duration: 10,
          x: -4,
          z: 12,
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
        // 애니메이션이 실행되는 시점에 호출되는 메서드
        onUpdate: () => {
          setRotateFinished(false);
        },
      })
      .to(hemisphereLightRef.current, {
        duration: 5,
        intensity: 30,
      })
      .to(
        pivot.rotation,
        {
          duration: 15,
          y: Math.PI * 4,
          onUpdate: () => {
            setRotateFinished(true);
          },
        },
        "<"
      )
      .to(
        colors,
        {
          duration: 15,
          boxMaterialColor: "#DC4F00",
        },
        "<"
      );

    return () => {
      three.scene.remove(pivot);
    };
  }, [isEntered, three.camera, three.scene, colors]);

  if (isEntered) {
    return (
      <>
        <primitive ref={dancerRef} object={scene} scale={0.05} />
        <ambientLight intensity={2} />
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

        {/* 모든 공간을 감싸주는 box를 만들어서 빛을 받는 배경으로 활용 */}
        <Box ref={boxRef} position={[0, 0, 0]} args={[100, 100, 100]}>
          <meshStandardMaterial color={"#DC4F00"} side={THREE.DoubleSide} />
        </Box>

        {/* 모델이 서있는 Circle */}
        <Circle
          castShadow
          receiveShadow
          args={[8, 32, 32]}
          rotation-x={-Math.PI / 2}
          position-y={-4.4}
        >
          <meshStandardMaterial color={"#DC4F00"} side={THREE.DoubleSide} />
        </Circle>

        {/* 셰이더 조작해서 반짝이도록 하는 효과 추가 */}
        <Points positions={positions.slice(0, positions.length / 3)}>
          <pointsMaterial
            ref={starGroupRef01}
            size={0.5}
            color={new THREE.Color("#DC4F00")}
            sizeAttenuation // 원근에 따라 크기조절
            depthWrite // 앞에 있는게 뒤에거를 가림
            alphaMap={texture} // 텍스쳐 넣어줌
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points
          positions={positions.slice(
            positions.length / 3,
            (positions.length * 2) / 3
          )}
        >
          <pointsMaterial
            ref={starGroupRef02}
            size={0.5}
            color={new THREE.Color("#DC4F00")}
            sizeAttenuation
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points positions={positions.slice((positions.length * 2) / 3)}>
          <pointsMaterial
            ref={starGroupRef03}
            size={0.5}
            color={new THREE.Color("#DC4F00")}
            sizeAttenuation
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
      </>
    );
  }
  return <Loader isCompleted />;
};
