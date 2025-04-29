export type Student = {
    regno: string,
    studentname: string,
    fathername: string
}

export type Grade = {
	gradeid: number,
	start: number,
	end: number,
	grade: string,
	gpa: number    
}

export type StudentProps = {
    getStudent: (args: {
        student: Student, 
        regs: Reg[],
        grades: Grade[]
    }) => void
    student: Student
}

export type SemesterProps = {
    getSemNo: (semNo: number) => void
}

export type Course = {
  courseid: number,
  code: string,
  title: string,
  crhr: number,
  semester: number
}

export type SemetserCoursesProps = {
    semno: number, 
    getCourseIds: (args: {
        name: string;
        value: number;
        crsIds: number[];
    }) => void,
    cids: number[],
    addRegs: () => void, 
    regs?: Reg[]
}

export type Reg = {
    _id: string,
    course: Course,
    regno: string,
    courseid: number, 
    gradeid?: number, 
    grade?: Grade,
}

export type RegCourseProps = {
    regs: Reg[], 
    grades: Grade[], 
    updateReg: (reg: Reg) => void
}

// export type cidArgs = {
//     name: string,
//     value: number,
//     crsIds: number[]
// }