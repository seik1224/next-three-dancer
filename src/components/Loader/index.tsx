import { IsEnteredAtom } from "@/stores";
import { Html, useProgress } from "@react-three/drei";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";

interface Props {
  isCompleted?: boolean;
}

export const Loader = ({ isCompleted }: Props) => {
  /*
  useRecoilValue : isEntered값만 필요할때
  useRecoilState : 값을 변경해주고 싶을때
  */
  const [isEntered, setIsEntered] = useRecoilState(IsEnteredAtom);
  const progress = useProgress();
  console.log("progress", progress);
  if (isEntered) return null;
  /*
    캔버스 하위에는 캔버스 요소만 들어와야 하지만
    drei에서 제공해주는 <Html>컴포넌트를 사용하면 캔버스 요소가 아니더라도 children으로 넣어줄 수 있다.
  */
  return (
    <>
      <Html center>
        <BlurredBackground />
        <Container>
          <ProgressBar>{isCompleted ? 100 : progress.progress}%</ProgressBar>
          {progress.progress === 100 && (
            <EnterBtn
              onClick={() => {
                setIsEntered(true);
              }}
            >
              Enter
            </EnterBtn>
          )}
        </Container>
      </Html>
    </>
  );
};

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlurredBackground = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 50%;
  filter: blur(300px);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const ProgressBar = styled.div`
  font-size: 24px;
  color: #ccc;
`;

const EnterBtn = styled.button`
  animation: ${blink} 1.5s infinite;
  transition-duration: 0.4s;
  font-size: 16px;
  outline: none;
  border: 0.5px solid #999;
  padding: 8px 18px;
  background-color: transparent;
  color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #dc4f00;
  }
`;
