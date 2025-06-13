import styles from "./card.module.css";

const Card = () => {
	return (
		<div className={styles.card}>
			<h2 className={styles.day}>14/06</h2>
			<div className={styles.temperatures}>
				<p>14°</p>
				<p>23°</p>
			</div>
		</div>
	);
};

export default Card;
