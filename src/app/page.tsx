"use client";
import dynamic from "next/dynamic";
import { Counter } from "../components/Counter/Counter";

const Canvas = dynamic(() => import("../components/Canvas"), {
	ssr: false,
});

export default function Page() {
	return <Canvas />;
	// return <Counter />;
}
