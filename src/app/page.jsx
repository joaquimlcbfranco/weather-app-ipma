"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import src from "../assets/start_icon.png";
import { useState } from "react";

const Home = () => {
	const [start, setStart] = useState(false);

	return (
		<div
			className={`${styles.welcomeWrapper} ${start ? styles.hidden : ""}`}
		>
			<Image alt="welcome icon" src={src} width={200} height={200} />
			<h1 className={styles.typewriter}>Portugal</h1>
			<h1>Weather</h1>
			<Link href="/data" onClick={() => setStart(true)}>
				Entrar
			</Link>
		</div>
	);
};

export default Home;
