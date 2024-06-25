import {registerSlice} from "@/features/userAuthorization/slice/registerSlice";
import {specializationsSlice} from "@/features/specializations/slice/specialization";
import {employees} from "@/features/employees/slice/employees";
import {disciplinesSlice} from "@/features/disciplines/slice/disciplines";
import {stages} from "@/features/stages/slice/stages";
import {stagesAnswer} from "@/features/stagesAnswer/slice/stagesAnswer";
import {projectsStagesGrades} from "@/features/projectStagesGrade/slice/projectStagesGrades";
import {studentSlice} from "@/features/students/slice/students";
import {groupSlice} from "@/features/group/slice/group";
import {combineReducers} from "@reduxjs/toolkit";
import {otherSlice} from "@/features/other/slice/other";
import {studentCursachSlice} from "@/features/student/slice/slice";
import {studentDimpomSlice} from "@/features/studentD/slice/studentD";


const rootReducer = combineReducers({
    employees: employees.reducer, // сделано ------------------
    student: studentSlice.reducer, // сделано ------------------
    other: otherSlice.reducer,
    specialization: specializationsSlice.reducer, // сделано ------------------
    disciplines: disciplinesSlice.reducer, // сделано ------------------
    group: groupSlice.reducer, // сделано ------------------




    studentCursach: studentCursachSlice.reducer, // сделано ------------------
    studentDiplom: studentDimpomSlice.reducer,





    register: registerSlice.reducer,



    stages: stages.reducer,
    stagesAnswer: stagesAnswer.reducer,
    projectStagesGrades:projectsStagesGrades.reducer,

})

export default rootReducer