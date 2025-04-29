import React from "react";
import { RegCourseProps } from "../types";
import { api } from "../api";

export default function RegCourse({ regs, grades, updateReg }: RegCourseProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        api.post(`/api/regs/update`, {
            regid: name, gradeid: value
        }).then((res) => {
            console.log(res.data)
            updateReg(res.data);
        })
    }

	let CGPA = (regs.filter(r => r.gradeid !== null).reduce((sum, r)=>(r.course.crhr * (r.grade?.gpa || 0)) + sum, 0) / 
    regs.filter(r => r.gradeid !== null).reduce((sum, r)=>r.course.crhr+sum, 0)).toFixed(2);    
	return (
		<>
			<table className="table table-bordered table-striped table-hover table-sm">
				<thead>
					<tr>
						<th>Code</th>
						<th>Title</th>
						<th>Cr</th>
						<th>Grade</th>
						<th>GPA</th>
					</tr>
				</thead>
				<tbody>
					{regs.map((reg, index) => (
						<tr key={index}>
							<td>{reg.course.code}</td>
							<td>{reg.course.title}</td>
							<td>{reg.course.crhr}</td>
							<td>
								<select name={reg._id} value={reg.gradeid || ''} onChange={handleChange}>
									<option hidden></option>
									{grades.map((grade) => (
										<option key={grade.gradeid} value={grade.gradeid}>
											{grade.grade}
										</option>
									))}
								</select>
							</td>
							<td>{reg.gradeid !== null ? grades.find((g) => g.gradeid === reg.gradeid)?.gpa : ''}</td>
						</tr>
					))}
				</tbody>
                <tfoot>
                        <tr>
                            <td colSpan={3}></td>
                            <td><b>CGPA</b></td>
							<td>{isNaN(Number(CGPA)) ? 0.00 : CGPA}</td>
                        </tr>
                    </tfoot>
			</table>
		</>
	);
}
