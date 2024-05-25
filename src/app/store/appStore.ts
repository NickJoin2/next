import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {registerSlice} from "@/features/userAuthorization/slice/registerSlice";
import {specializations} from "@/features/specializations/slice/specialization";
import {employees} from "@/features/employees/slice/employees";
import {disciplines} from "@/features/disciplines/slice/disciplines";
import {stages} from "@/features/stages/slice/stages";
import {stagesAnswer} from "@/features/stagesAnswer/slice/stagesAnswer";
import {projectsStagesGrades} from "@/features/projectStagesGrade/slice/projectStagesGrades";
import {student} from "@/features/students/slice/students";
import {group} from "@/features/group/slice/group";

const rootReducer = combineReducers({
    register: registerSlice.reducer,
    student: student.reducer,
    group: group.reducer,
    specialization: specializations.reducer,
    employees: employees.reducer,
    disciplines: disciplines.reducer,
    stages: stages.reducer,
    stagesAnswer: stagesAnswer.reducer,
    projectStagesGrades:projectsStagesGrades.reducer
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
