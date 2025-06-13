"use client";

import Link from "next/link";
import styles from "./data.module.css";
import Card from "../components/card.jsx";
import { useState, useEffect } from "react";
import { format } from 'date-fns'

const Data = () => {
	const [text, setText] = useState("");
	const [cityId, setCityId] = useState(1080500);
	const [cityName, setCityName] = useState("Faro");
	const [description, setDescription] = useState("");
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleInputChange = (e) => {
		setText(e.target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const removeAccents = (str) =>
			str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

		try {
			const fetchedData = await fetch(
				"https://api.ipma.pt/open-data/distrits-islands.json"
			);
			const json = await fetchedData.json();
			setCityName(
				json.data.filter(
					(obj) =>
						removeAccents(obj.local.toLowerCase()) ===
						removeAccents(text.toLowerCase())
				)[0].local
			);
			setCityId(
				json.data.filter(
					(obj) =>
						removeAccents(obj.local.toLowerCase()) ===
						removeAccents(text.toLowerCase())
				)[0].globalIdLocal
			);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	// Get initial data for the city of Faro
	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const faroData = await fetch(
					`https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${cityId}.json`
				);
				if (faroData.response >= 400) {
					setError(
						"There has been an error while getting the requested data. Status: ",
						faroData.response
					);
				}
				const json = await faroData.json();
				setData(json.data);
			} catch (err) {
				setError("Unexpected error. Status: ", err);
			} finally {
				setLoading(false);
			}
		};

		fetchInitialData();
	}, [cityId]);

	// Get weather description
	useEffect(() => {
		const fetchDescription = async () => {
			try {
				const fetchData = await fetch(
					"https://api.ipma.pt/open-data/weather-type-classe.json"
				);
				const json = await fetchData.json();
				setDescription(
					json.data.filter(
						(obj) => obj.idWeatherType === data.idWeatherType
					)[0].descWeatherTypePT
				);
			} catch (err) {
				setError(err);
			}
		};

		fetchDescription();
	}, [data]);

	console.log(data);

	return (
		<div className={styles.dataWrapper}>
			<div className={styles.topInfo}>
				<Link href="/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#FFFFFF"
					>
						<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
					</svg>
				</Link>
				<form
					className={styles.weatherForm}
					onSubmit={handleFormSubmit}
				>
					<div className={styles.formRow}>
						<input
							id="city"
							placeholder="Cidade"
							type="text"
							value={text}
							onChange={handleInputChange}
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
				<div className={styles.leftData}>
					<h1>{cityName}, Portugal</h1>
					<p>Sexta, 13 de junho</p>
					<h1 className={styles.weatherDescription}>{description}</h1>
				</div>
				<div className={styles.rightData}>
					<div className={styles.square}>
						<p>
							<span className={styles.minTemp}>MÍN</span>
							{data.filtertMin}
							<span
								className={`${styles.measurement} ${styles.degrees}`}
							>
								°
							</span>
						</p>
					</div>
					<div className={styles.square}>
						<p>
							<span className={styles.maxTemp}>MÁX</span>
							{data.tMax}
							<span
								className={`${styles.measurement} ${styles.degrees}`}
							>
								°
							</span>
						</p>
					</div>
					<div className={styles.square}></div>
					<div className={styles.square}>
						<p>
							<span>CHUVA</span>
							{data.precipitaProb}
							<span className={styles.measurement}>%</span>
						</p>
					</div>
				</div>
			</div>
			<div className={styles.bottomData}>
				<div className={styles.cards}>
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		</div>
	);
};

export default Data;
