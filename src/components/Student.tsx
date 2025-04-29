import React from "react";
import { api } from "../api";
import { StudentProps } from "../types";

export default function Student({ getStudent, student }: StudentProps) {
	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			// Check if the Enter key is pressed
			console.log(`Enter key pressed with value: ${e.currentTarget.value}`); // Log the value of the input field

			const {student, regs, grades} = await (await api.get(`/api/students/${e.currentTarget.value}`)).data;
			console.log({student, regs, grades});
			getStudent({student, regs, grades});
		}
	};

	return (
		<>
			<div className="block">
				<label>Reg # : </label>
				<input type="text" name="regno" onKeyDown={handleKeyDown} />
			</div>
			{Object.keys(student).length > 0 && (
                <>
				<div className="block">
					<label>Student Name : </label>
					<span>{student.studentname}</span>
				</div>
				<div className="block">
					<label>Father Name : </label>
					<span>{student.fathername}</span>
				</div>
                </>
			)}
		</>
	);
}
