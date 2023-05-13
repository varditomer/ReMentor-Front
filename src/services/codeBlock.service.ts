import { CodeBlock } from "../interfaces/CodeBlock.interface"
import { httpService } from "./http.service"

const STORAGE_KEY = 'codeBlock'

async function query(): Promise<CodeBlock[]> {
    return await httpService.get(`${STORAGE_KEY}`)
}

async function add(newCodeBlock: CodeBlock): Promise<CodeBlock> {
    return await httpService.post(`${STORAGE_KEY}`, newCodeBlock)
}

async function update(codeBlockToUpdate: CodeBlock) {
    return await httpService.put(`${STORAGE_KEY}`,codeBlockToUpdate)
}

async function remove(codeBlockId: string) {
    return await httpService.delete(`${STORAGE_KEY}/${codeBlockId}`)
}

export const codeBlockService = {
    query,
    add,
    update,
    remove
}