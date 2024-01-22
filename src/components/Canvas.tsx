import { Stage, Layer, Line, Rect } from "react-konva";
import { useRef, useEffect, useState } from "react";
import Konva from "konva";

const stepSize = 32;

export default function Canvas() {
	const stageRef = useRef<Konva.Stage>(null);
	const gridLayerRef = useRef<Konva.Layer>(null);
	const [canvasDimensions, setCanvasDimensions] = useState({
		width: 1024,
		height: 768,
	});

	const [position, setPosition] = useState({ x: 0, y: 0 });

	function handleStageClick(e) {
		let x = stageRef.current.getPointerPosition().x;
		let y = stageRef.current.getPointerPosition().y;
		let squareOriginX = Math.floor(x / stepSize) * stepSize;
		let squareOriginY = Math.floor(y / stepSize) * stepSize;

		// Create a new Rect
		const newRect = new Konva.Rect({
			x: squareOriginX,
			y: squareOriginY,
			fill: "red",
			width: stepSize,
			height: stepSize,
		});

		// Add the Rect to the gridLayer
		gridLayerRef.current.add(newRect);

		// Batch draw to update the stage
		gridLayerRef.current.batchDraw();
	}

	useEffect(() => {
		// Ensure the gridLayerRef is initialized with the correct reference
		if (gridLayerRef.current) {
			gridLayerRef.current.batchDraw();
		}
	}, [canvasDimensions]);

	return (
		<div className='flex flex-col align-center justify-center items-center'>
			<Stage ref={stageRef} width={canvasDimensions.width} height={canvasDimensions.height} scaleX={1} scaleY={1} onClick={handleStageClick}>
				{/* Grid Layer */}
				<Layer ref={gridLayerRef} x={position.x} y={position.y}>
					{Array.from({ length: 1024 / stepSize }).map((_, i) => (
						<Line key={`vertical-${i}`} x={i * stepSize} points={[0, 0, 0, canvasDimensions.height]} stroke='rgba(0,0,0,0.2)' strokeWidth={1} />
					))}
					{Array.from({ length: 768 / stepSize }).map((_, i) => (
						<Line key={`horizontal-${i}`} y={i * stepSize} points={[0, 0, canvasDimensions.width, 0]} stroke='rgba(0,0,0,0.2)' strokeWidth={1} />
					))}
				</Layer>
			</Stage>
		</div>
	);
}
