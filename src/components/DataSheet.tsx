import { useState } from "react";
import Student from "./Student";
import { Grade, Reg, Student as StudentType } from "../types";
import Semester from "./Semester";
import SemetserCourses from "./SemetserCourses";
import { api } from "../api";
import RegCourse from "./RegCourse";

export default function DataSheet() {

	const [student, setStudent] = useState<StudentType>({} as StudentType)
    const [SemNo, setSemNo] = useState(0);
    const [courseids, setCourseIds] = useState<number[]>([]);
    const [regs, setRegs] = useState<Reg[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    
    const getStudent= (args: {student: StudentType, regs: Reg[], grades: Grade[]}) => {
        setStudent(args.student); 
        setRegs(args.regs);
        setGrades(args.grades);
    }

    const getSemNo = (semNo: number) => {
        setSemNo(semNo)
    }

    const getCourseIds = ( args : { name: string; value: number; crsIds: number[] }) => {
        if(args.name === "master") {
            //console.log(args.crsIds)
            setCourseIds(args.crsIds)
        }else{
            let index = courseids.indexOf(args.value);
            setCourseIds(index === -1 ? [...courseids, args.value] : courseids.filter(id => id !== args.value))
        }
    }

    const addRegs = () => {
        api.post(`/api/regs/add`,{
            regno: student.regno,
            courseids: JSON.stringify(courseids)
        }).then((res) => {
            console.log(res.data)   
            setRegs([...regs, ...(res.data as Reg[]).filter(a => !regs.some(r => a.courseid === r.courseid))]);
            setCourseIds([]); 
        })
    }

    const updateReg = (reg: Reg) => {
        setRegs(regs.map(r => r._id === reg._id ? {...r, gradeid: reg.gradeid, grade: grades.find(g => g.gradeid === reg.gradeid)} : r));
    }

	return (
		<>
			<div style={{ display: "flex", flexDirection: "row",  }}>
				<div style={{ flexGrow: 2 }}>
					<Student getStudent={getStudent} student={student}/>
                    <div>&nbsp;</div>
                    {Object.keys(student).length > 0 && <Semester getSemNo={getSemNo}/>}
                    <div>&nbsp;</div>
                    {SemNo > 0 && <SemetserCourses 
                                    semno={SemNo}
                                    getCourseIds={getCourseIds}
                                    cids={courseids}
                                    addRegs={addRegs}
                                    regs={regs}
                                />}
				</div>
				<div style={{ flexGrow: 2 }}>
                    {regs.length > 0 && <RegCourse regs={regs} grades={grades} updateReg={updateReg}/>} 
                </div>
                <div style={{flexGrow: 1, overflowY: 'auto', height: '95vh'}}>
                    <pre style={{ alignItems: 'left' }}>{JSON.stringify({ student, SemNo, courseids, regs }, null, 4)}</pre>
                </div>

			</div>
		</>
	);
}
