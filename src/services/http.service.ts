// Dependencies
import Axios from "axios"
import { CodeBlock } from "../interfaces/CodeBlock.Interface"
// Interfaces

const BASE_URL: string = (process.env.NODE_ENV === 'production') ?
    '/api/'
    : '//localhost:3030/api/'

const axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint: string, data = null) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint: string, data: CodeBlock) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint: string, data: CodeBlock) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint: string, data: string) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint: string, method = 'GET', data: CodeBlock | string | null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data

    } catch (err: any) {
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
        }
        throw err
    }
}