import React from "react";
import "./ChannelIcon.css";
export default function ChannelIcon(props) {
	return (
		<div id="main">
			<div
				style={{
					width: "20px",
					height: "20px",
					backgroundImage: `url(${props.url})`,
					backgroundSize: "cover",
				}}></div>
		</div>
	);
}