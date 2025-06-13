"use client"

import Image from "next/image";
import styles from "./page.module.css";
import src from "../assets/start_icon.png";
import { useState } from "react";

const Home = () => {
	const [start, setStart] = useState(false);

	return (
		<div className={`${styles.welcomeWrapper} ${start ? styles.hidden : ""}`}>
			<Image
				alt="welcome icon"
				src={src}
				width={200}
				height={200}
			/>
			<h1 className={styles.typewriter}>Faro</h1>
			<h1>Weather App</h1>
			<button onClick={() => setStart(true)}>Get Info</button>
		</div>
	);
};

export default Home;
