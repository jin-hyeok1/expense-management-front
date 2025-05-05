import {PageResponse} from "./type.ts";

export const getPageable = (response: PageResponse<any>) => {
    return {
        totalItems: response.totalElements,
        currentPage: response.pageNumber + 1,
        pageSize: response.pageSize,
    }
}