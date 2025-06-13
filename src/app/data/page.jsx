"use client";

import styles from "./data.module.css";

const Data = () => {
	return (
		<div className={styles.dataWrapper}>
			<div className={styles.topInfo}>
				<form className={styles.weatherForm}>
					<div className={styles.formRow}>
						<input
							id="city"
							placeholder="Cidade"
							type="text"
						></input>
						<button type="submit" className={styles.submitForm}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="20px"
								viewBox="0 -960 960 960"
								width="20px"
								fill="rgba(255, 255, 255, 1)"
							>
								<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
							</svg>
						</button>
					</div>
				</form>
			</div>
			<div className={styles.dataSection}>
				<div className={styles.weatherDescription}>
					<h1>Évora, Portugal</h1>
					<h1>Céu parcialmente nublado e chuva</h1>
				</div>
				<div className={styles.rightData}>
					<div className={styles.square}>
						<p>
							<span>MIN</span>21
							<span className={`${styles.measurement} ${styles.degrees}`}>°</span>
						</p>
					</div>
					<div className={styles.square}>
						<p>
							<span>MAX</span>14
							<span className={`${styles.measurement} ${styles.degrees}`}>°</span>
						</p>
					</div>
					<div className={styles.square}>
						<p>
							<span>CHUVA</span>2
							<span className={styles.measurement}>%</span>
						</p>
					</div>
					<div className={styles.square}>
						<p>
							<span>VENTO</span>5
							<span className={styles.measurement}>km/h</span>
						</p>
					</div>
				</div>
			</div>
			<div className={styles.bottomSection}>
				<div className={styles.cards}></div>
			</div>
		</div>
	);
};

export default Data;
