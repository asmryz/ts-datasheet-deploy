import { useEffect, useState } from "react";
import { api } from "../api";
import { SemesterProps } from "../types";

export default function Semester({ getSemNo }: SemesterProps) {
	const [sems, setSems] = useState<number[]>([]);
	useEffect(() => {
		api.get("/api/semesters").then((res) => {
			setSems(res.data);
		});
	}, []);
	return (
		<>
			<div className="block">
				<label>Semester : </label>

				<select onChange={(e) => getSemNo(parseInt(e.currentTarget.value))}>
					<option value={0}></option>
					{sems.map((sem) => (
						<option key={sem} value={sem}>
							{sem}
						</option>
					))}
				</select>
			</div>
		</>
	);
}
