import {Form} from "antd";
import {useEffect, useState} from "react";
import {Group} from "../type.ts";

export const useExpenseAddForm = () => {
    const [form] = Form.useForm();
    const [groups, setGroups] = useState<Group[]>();
    useEffect(() => {
        setGroups([{index: 1, name: "회식", createAt: new Date()}])
    }, [])
    return {
        form,
        groups
    }
}