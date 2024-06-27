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
