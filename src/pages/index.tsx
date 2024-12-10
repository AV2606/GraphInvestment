import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button, Slide, Slider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "@/components/Chart";

const inter = Inter({ subsets: ["latin"] });

const data = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

export default function Home() {
	const [startAmount, setStartAmount] = useState(1000);
	const [interest, setInterest] = useState(10);
	const [years, setYears] = useState(10);
	const [monthlyDeposits, setMonthlyDeposits] = useState(100);
	const [data, setData] = useState<{ name: string; compounded: number; flat: number }[]>([]);

	useEffect(() => {
		setData(calculate(startAmount, monthlyDeposits, interest, years));
	}, []);

	return (
		<>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: 20,
					justifyContent: "flex-start",
					marginTop: 50,
				}}
			>
				<TextField
					label="start amount"
					type="number"
					value={startAmount}
					onChange={(e) => {
						setStartAmount(parseFloat(e.target.value));
					}}
				/>

				<TextField
					label="monthly deposits"
					type="number"
					value={monthlyDeposits}
					onChange={(e) => {
						setMonthlyDeposits(parseFloat(e.target.value));
					}}
				/>

				<TextField
					label="Annual interest rate"
					type="number"
					value={interest}
					slotProps={{
						input: {
							startAdornment: "%",
						},
					}}
					onChange={(e) => {
						setInterest(parseFloat(e.target.value));
					}}
				/>
				<Slider
					aria-label="Years"
					value={years}
					onChange={(_, newValue) => {
						setYears(Array.isArray(newValue) ? newValue[1] : newValue);
					}}
					step={1 / 2}
					marks
					min={0}
					sx={{
						width: 400,
					}}
					max={150}
					valueLabelDisplay="auto"
				/>
				<Button
					variant="contained"
					onClick={() => {
						var newData = calculate(startAmount, monthlyDeposits, interest, years);
						setData(newData);
					}}
				>
					Calculate
				</Button>
			</div>
			<div style={{ height: 700 }}>
				<Chart data={data} />
			</div>
		</>
	);
}

function calculate(
	startAmount: number,
	monthlyDeposits: number,
	interest: number,
	years: number
): { name: string; compounded: number; flat: number }[] {
	const data = [];
	var balance = startAmount;
	var flat = startAmount;
	for (let i = 0; i < years * 12; i++) {
		balance = balance * Math.pow(1 + interest / 100, 1 / 12) + monthlyDeposits;
		flat += monthlyDeposits;
		data.push({
			name: `${(i + 1).toString()}`,
			compounded: parseFloat(balance.toFixed(2)),
			flat,
		});
	}
	return data;
}
