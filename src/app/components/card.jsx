import styles from "./card.module.css";
import { format } from "date-fns";

const Card = ({ data }) => {
	return (
		<div className={styles.card}>
			<h2 className={styles.day}>{format(data.forecastDate, "dd'/'MM")}</h2>
			<div className={styles.temperatures}>
				<p>{data.tMin}</p>
				<p>{data.tMax}</p>
			</div>
		</div>
	);
};

export default Card;
