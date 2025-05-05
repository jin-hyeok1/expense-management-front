import {useEffect, useState} from "react";
import {Subject} from "../type.ts";
import {getAllSubject} from "../api/subject.ts";

export const useExpenseAddForm = () => {
    const [subjects, setSubjects] = useState<Subject[]>();
    useEffect(() => {
        initSubject()
    }, [])
    const initSubject = async () => {
        setSubjects(await getAllSubject())
    }
    return {
        subjects
    }
}