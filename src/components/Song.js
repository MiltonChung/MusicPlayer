import Wave from "@foobar404/wave";
import { useState, useRef, useEffect } from "react";

const Song = ({ currentSong, isPlaying }) => {
	let [wave] = useState(new Wave());
	const options = { type: "bars", colors: ["blue", "red", "green"] };
	wave.fromElement("audioID", "visualizer", options);

	const canvasEl = useRef(null);
	useEffect(() => {
		function handleResize() {
			if (isPlaying) {
				fixDPI(canvasEl);
			}
		}
		window.addEventListener("resize", handleResize);
	});

	return (
		<div className="song-container">
			<div className="songInfo">
				<h2>{currentSong.name}</h2>
				<h3>{currentSong.artist}</h3>
				<canvas id="visualizer" ref={canvasEl}></canvas>
			</div>
			<img alt={currentSong.name} src={currentSong.cover}></img>
		</div>
	);
};

function fixDPI(canvasEl) {
	// let dpi = window.devicePixelRatio;

	let style_height = +getComputedStyle(canvasEl.current).getPropertyValue("height").slice(0, -2);
	// //get CSS width
	let style_width = +getComputedStyle(canvasEl.current).getPropertyValue("width").slice(0, -2);
	// //scale the canvas
	canvasEl.current.setAttribute("height", style_height);
	canvasEl.current.setAttribute("width", style_width);
}

export default Song;
