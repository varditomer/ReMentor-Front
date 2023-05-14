// Interfaces

import { CodeBlock } from "../../interfaces/CodeBlock.interface"
import { codeBlockService } from "../../services/codeBlock.service"


// Services
export function loadCodeBlocks() {
    return async (dispatch: any) => {
        try {
            const codeBlocks = await codeBlockService.query()
            dispatch({ type: 'SET_CODE_BLOCKS', payload: codeBlocks })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function addCodeBlock(newCodeBlock: CodeBlock) {
    return async (dispatch: any) => {
        try {
            const codeBlock = await codeBlockService.add(newCodeBlock)
            dispatch({ type: 'ADD_CODE_BLOCK', payload: codeBlock })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function removeCodeBlock(codeBlockId: string) {
    return async (dispatch: any) => {
        try {
            await codeBlockService.remove(codeBlockId)
            // by 1st trying to remove CB from backend if there will be a failure the CB won't remove also from the store.
            // it can be done also with optimistic approach by removing it 1st from the store and saving a backup in case of failure
            dispatch({ type: 'REMOVE_CODE_BLOCK', payload: codeBlockId })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function updateCodeBlock(codeBlockToUpdate: CodeBlock) {
    return async (dispatch: any) => {
        try {
            const updatedCodeBlock = await codeBlockService.update(codeBlockToUpdate)
            console.log(`updated:`, )
            dispatch({ type: 'UPDATE_CODE_BLOCK', payload: updatedCodeBlock })
            // emit the updated code block to the first user
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function updateCodeBlockInStore(codeBlockToUpdate: CodeBlock) {
    return async (dispatch: any) => {
        try {
            console.log(`123:`, )
            dispatch({ type: 'UPDATE_CODE_BLOCK', payload: codeBlockToUpdate })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}