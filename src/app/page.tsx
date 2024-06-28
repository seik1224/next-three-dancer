"use client";
import { MainCanvas } from "@/components/MainCanvas";
import { FixedDom } from "@/components/dom/FixedDom";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <main className="w-dvw h-dvh overflow-hidden">
        <MainCanvas />
        <FixedDom />
      </main>
    </RecoilRoot>
  );
}
