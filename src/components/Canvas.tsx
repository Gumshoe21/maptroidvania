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
	const [redSquares, setRedSquares] = useState([]); // State to store red squares
	const [mode, setMode] = useState("edit");
	const [isMousePressed, setIsMousePressed] = useState(false);

	const handleStageClick = e => {
		let x = stageRef.current.getPointerPosition().x;
		let y = stageRef.current.getPointerPosition().y;
		let squareOriginX = Math.floor(x / stepSize) * stepSize;
		let squareOriginY = Math.floor(y / stepSize) * stepSize;

		// Create a new Rect
		const newRect = {
			id: `${squareOriginX}-${squareOriginY}`, // Unique ID for each red square
			x: squareOriginX,
			y: squareOriginY,
			width: stepSize,
			height: stepSize,
		};

		// Edit Mode: Add new rectangle
		if (mode === "edit" && isMousePressed) {
			if (redSquares.filter(rect => rect.id === newRect.id).length === 0) {
				setRedSquares(prevRedSquares => [...prevRedSquares, newRect]);
			}
		}

		// Erase Mode: Remove existing rectangle
		if (mode === "erase" && isMousePressed) {
			setRedSquares(prevRedSquares => prevRedSquares.filter(rect => rect.id !== newRect.id));
		}
	};
	useEffect(() => {
		// Log the updated state after it has been applied
		console.log(redSquares);
	}, [redSquares]);

	const handleRectClick = id => {
		// Filter out the clicked square from redSquares
		if (mode === "erase") {
			setRedSquares(prevRedSquares => prevRedSquares.filter(rect => rect.id !== id));
		}
	};

	useEffect(() => {
		if (gridLayerRef.current) {
			gridLayerRef.current.batchDraw();
		}
	}, [canvasDimensions, redSquares]);

	return (
		<div className='flex flex-row align-center justify-center items-center'>
			<div className='flex flex-col'>
				<button className={`rounded-lg text-white p-4 ${mode === "edit" ? "bg-blue-700" : "bg-blue-300"}`} onClick={() => setMode("edit")}>
					Edit Mode
				</button>
				<button onClick={() => setMode("erase")}>Erase Mode</button>
			</div>
			<Stage
				ref={stageRef}
				width={canvasDimensions.width}
				height={canvasDimensions.height}
				scaleX={1}
				scaleY={1}
				onClick={handleStageClick}
				onMouseDown={() => setIsMousePressed(true)}
				onMouseUp={() => setIsMousePressed(false)}
				onMouseMove={handleStageClick} // Use handleStageClick for continuous placement
			>
				{/* Grid Layer */}
				<Layer ref={gridLayerRef} x={position.x} y={position.y}>
					{Array.from({ length: 1024 / stepSize }).map((_, i) => (
						<Line key={`vertical-${i}`} x={i * stepSize} points={[0, 0, 0, canvasDimensions.height]} stroke='rgba(0,0,0,0.2)' strokeWidth={1} />
					))}
					{Array.from({ length: 768 / stepSize }).map((_, i) => (
						<Line key={`horizontal-${i}`} y={i * stepSize} points={[0, 0, canvasDimensions.width, 0]} stroke='rgba(0,0,0,0.2)' strokeWidth={1} />
					))}

					{/* Red Squares */}
					{redSquares.map(rect => (
						<Rect key={rect.id} x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill='red' onClick={() => handleRectClick(rect.id)} />
					))}
				</Layer>
			</Stage>
		</div>
	);
}
