import {PageResponse, Subject, SubjectCreateRequest} from "../type.ts";
import api from "./config.ts";

export const getSubjects = async (pageNum: number, pageSize: number = 5): Promise<PageResponse<Subject>> => {
    const {data} = await api.get('/v1/subject', {params: {pageNum: pageNum - 1, pageSize}})
    return data
}

export const getAllSubject = async (): Promise<Subject[]> => {
    const {data} = await api.get('/v1/subject/all')
    return data
}

export const addSubject = async (request: SubjectCreateRequest) => {
    await api.post('/admin/subject', request)
}

export const deleteSubject = async (name: string) => {
    await api.delete('/admin/subject', {params: {name}})
}