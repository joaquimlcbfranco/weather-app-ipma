import Image from "next/image";
import styles from "./page.module.css";
import src from "../assets/start_icon.png"

const Home = () => {
	return (
		<div className={styles.welcomeWrapper}>
      <Image src={src} width={200} height={200} objectFit="cover" />
			<h1>Faro</h1>
			<h1>Weather App</h1>
			<button>Get Started</button>
		</div>
	);
};

export default Home;
