import {useEffect, useState} from "react";
import {Subject} from "../type.ts";

export const useExpenseAddForm = () => {
    const [subjects, setSubjects] = useState<Subject[]>();
    useEffect(() => {
        setSubjects([{name: "회식", createAt: new Date()}])
    }, [])
    return {
        subjects
    }
}