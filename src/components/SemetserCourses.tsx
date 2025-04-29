import { useEffect, useState } from "react";
import { Course, SemetserCoursesProps } from "../types";

import { api } from "../api";

export default function SemetserCourses({ semno, getCourseIds, cids, addRegs, regs }: SemetserCoursesProps) {
	const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        api.get(`/api/courses/${semno}`).then((res) => {setCourses(res.data)});
    }, [semno]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        let crsIds = checked ? courses.map((course) => course.courseid) : [];
        getCourseIds({ name, value: Number(value), crsIds });

    }

	return (
		<>
			<table>
                <tbody>
                    <tr>
                        <th>
                            <input type="checkbox" name="master" onChange={handleChange}/>
                        </th>
                        <th>Code</th>
                        <th style={{width: '350px'}}>Title</th>
                        <th>Cr</th>
                    </tr>
                    {courses.map((course) => (
                        <tr key={course.courseid}>
                            <td>
                                {regs?.some((reg) => reg.courseid === course.courseid) ? '' : (
                                    <input type="checkbox" 
                                    name="courseid" 
                                    value={course.courseid}
                                    onChange={handleChange}
                                    checked={cids.includes(course.courseid) }
                                    />
                                )}
                            </td>
                            <td>{course.code}</td>
                            <td>{course.title}</td>
                            <td>{course.crhr}</td>
                        </tr>
                    ))} 
                </tbody>
            </table>
            {cids.length !== 0 && (
                <a href="#" onClick={addRegs}>Register</a>
            )}            
            
		</>
	);
}
