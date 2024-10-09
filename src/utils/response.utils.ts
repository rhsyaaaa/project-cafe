/* eslint-disable prettier/prettier */
import { responsePagination, responseSuccess } from "src/interface"

/* eslint-disable prettier/prettier */
export class BaseResponse {
    _success(message: string, data?: any): responseSuccess {
        return {
            status: "Success",
            message: message,
            data: data
        }
    }

    _pagination(message: string, data: any, total: number, page: number, pageSize: number): responsePagination {
        return {
            status: "Success",
            message: message,
            data: data,
            pagination: {
                total: total,
                page: page,
                pageSize: pageSize,
                totalPage: Math.ceil(total / pageSize)
            }
        }
    }
}