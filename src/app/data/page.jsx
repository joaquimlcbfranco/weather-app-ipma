"use client";

import Link from "next/link";
import styles from "./data.module.css";
import Card from "../components/card.jsx";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

const Data = () => {
	const locale = pt;
	const [text, setText] = useState("");
	const [cityId, setCityId] = useState(1080500);
	const [cityName, setCityName] = useState("Faro");
	const [description, setDescription] = useState("");
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleInputChange = (e) => {
		setText(e.target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const removeAccents = (str) =>
			str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

		try {
			const fetchedData = await fetch(
				"https://api.ipma.pt/open-data/distrits-islands.json"
			);
			if (!fetchedData.ok) {
				throw new Error(
					`Erro ao obter a lista de cidades: ${fetchedData.status}`
				);
			}
			const json = await fetchedData.json();

			const match = json.data.find(
				(obj) =>
					removeAccents(obj.local.toLowerCase()) ===
					removeAccents(text.trim().toLowerCase())
			);

			if (!match) {
				setError("Cidade não encontrada");
				setLoading(false);
				return;
			}

			setCityName(match.local);
			setCityId(match.globalIdLocal);
		} catch (err) {
			setError(`Unexpected network error. Status: ${err}`);
			setLoading(false);
		}

		setText("");
	};

	// Get initial data for the city of Faro
	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const faroData = await fetch(
					`https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${cityId}.json`
				);
				if (!faroData.ok) {
					setError(
						`Erro ao obter dados da cidade: ${faroData.status}`
					);
				}
				const json = await faroData.json();
				setData(json.data);
			} catch (err) {
				setError(`Unexpected network error. Status: ${err}`);
			} finally {
				setLoading(false);
				setError(null);
			}
		};

		fetchInitialData();
	}, [cityId]);

	// Get weather description
	useEffect(() => {
		if (data.length !== 0) {
			const fetchDescription = async () => {
				try {
					const fetchData = await fetch(
						"https://api.ipma.pt/open-data/weather-type-classe.json"
					);
					if (!fetchData.ok) {
						setError(
							`Erro ao obter classificações meteorológicas: ${fetchData.status}`
						);
					}
					const json = await fetchData.json();
					setDescription(
						json.data.filter(
							(obj) => obj.idWeatherType === data[0].idWeatherType
						)[0].descWeatherTypePT
					);
				} catch (err) {
					setError(`Unexpected network error. Status: ${err}`);
				}
			};

			fetchDescription();
		}
	}, [data]);

	// Render a loading spinner inside the data wrapper when loading is true
	if (loading) {
		return (
			<div className={styles.dataWrapper}>
				<span className={styles.loader}></span>
			</div>
		);
	}

	if (error) {
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
				<h1 className={styles.statusMessage}>{error}</h1>
			</div>
		);
	}

	// Double check if data variable got API info
	if (!data || data.length === 0) {
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
				<h1>Não há dados para esta localização</h1>
			</div>
		);
	}

	// Render the data whenever it has finished fetching
	if (loading === false) {
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
						<h1>{cityName}</h1>
						<p>
							{format(new Date(), `eeee, dd 'de' MMMM`, {
								locale,
							})}
						</p>
						<h1 className={styles.weatherDescription}>
							{description}
						</h1>
					</div>
					<div className={styles.rightData}>
						<div className={styles.square}>
							<p>
								<span className={styles.minTemp}>MÍN</span>
								{data[0].tMin}
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
								{data[0].tMax}
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
								{data[0].precipitaProb}
								<span className={styles.measurement}>%</span>
							</p>
						</div>
					</div>
				</div>
				<div className={styles.bottomData}>
					<div className={styles.cards}>
						{data.map((obj, index) => {
							if (index != 0) {
								return <Card key={index} data={data[index]} />;
							}
						})}
					</div>
				</div>
			</div>
		);
	}
};

export default Data;
