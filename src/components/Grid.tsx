import { Layer, Line, Rect, Stage } from "react-konva";
import { useRef, useEffect, useState } from "react";
import Konva from "konva";
const stepSize = 32;
import { toolSlice, canvasSlice, gridSlice, useSelector, useDispatch, selectToolName, selectCanvasDimensions, selectCanvasScale, selectGridCells } from "@/lib/redux";

export function Grid() {
	const gridLayerRef = useRef<Konva.Layer>(null);
	const stageRef = useRef<Konva.Stage>(null); //
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const dispatch = useDispatch(); //
	const toolName = useSelector(selectToolName); //
	const canvasDimensions = useSelector(selectCanvasDimensions); //
	const canvasScale = useSelector(selectCanvasScale); //
	const [isMousePressed, setIsMousePressed] = useState(false); //
	const gridCells = useSelector(selectGridCells); //

	const handleGridClick = () => {
		let x = gridLayerRef?.current?.getRelativePointerPosition()?.x;
		let y = gridLayerRef?.current?.getRelativePointerPosition()?.y;
		let squareOriginX = Math.floor(x / stepSize) * stepSize;
		let squareOriginY = Math.floor(y / stepSize) * stepSize;

		const newCell = {
			id: `${squareOriginX}-${squareOriginY}`,
			x: squareOriginX,
			y: squareOriginY,
			width: stepSize,
			height: stepSize,
		};

		if (toolName === "edit" && isMousePressed) {
			dispatch(gridSlice.actions.addCell(newCell));
		}

		if (toolName === "eraser" && isMousePressed) {
			dispatch(gridSlice.actions.removeCell(newCell));
		}
	};
	useEffect(() => {
		if (gridLayerRef.current) {
			gridLayerRef.current.batchDraw();
		}
	}, [canvasDimensions, gridCells]);

	return (
		<>
			<div className='flex flex-row align-center justify-center items-center'>
				<div className='flex flex-col'>
					{/* TODO change mode to redux state */}
					{/* TODO change setMode to redux state */}
					<button className={`rounded-lg text-white p-4 ${toolName === "edit" ? "bg-blue-700" : "bg-blue-300"}`} onClick={() => dispatch(toolSlice.actions.setEdit())}>
						Edit Mode
					</button>
					<button onClick={() => dispatch(toolSlice.actions.setEraser())}>Erase Mode</button>
				</div>
				<Stage ref={stageRef} width={canvasDimensions.width} height={canvasDimensions.height} scaleX={canvasScale.x} scaleY={canvasScale.y} onMouseDown={() => setIsMousePressed(true)} onMouseUp={() => setIsMousePressed(false)} onClick={handleGridClick} onMouseMove={handleGridClick}>
					<Layer ref={gridLayerRef} x={position.x} y={position.y}>
						{Array.from({ length: 1024 / stepSize }).map((_, i) => (
							<Line key={`vertical-${i}`} x={i * stepSize} points={[0, 0, 0, canvasDimensions.height]} stroke='rgba(0,0,0,0.2)' strokeWidth={1} />
						))}
						{Array.from({ length: 768 / stepSize }).map((_, i) => (
							<Line key={`horizontal-${i}`} y={i * stepSize} points={[0, 0, canvasDimensions.width, 0]} stroke='rgba(0,0,0,0.2)' strokeWidth={1} />
						))}

						{/* Red Squares */}
						{gridCells && gridCells.map(cell => <Rect key={cell.id} x={cell.x} y={cell.y} width={cell.width} height={cell.height} fill='red' />)}
					</Layer>
				</Stage>
			</div>
		</>
	);
}
