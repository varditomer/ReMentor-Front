// Interfaces
import { CodeBlockState } from "../../interfaces/State.interface"

const CodeBlockState: CodeBlockState = {
    codeBlocks: [],
}

type Action = {
    type: string,
    payload: any
}

export function codeBlockReducer(state = CodeBlockState, action: Action) {
    switch (action.type) {
        case 'SET_CODE_BLOCKS':
            return {
                ...state,
                codeBlocks: action.payload
            }
        case 'ADD_CODE_BLOCK':
            return {
                ...state,
                codeBlocks: [action.payload, ...state.codeBlocks]
            }
        case 'REMOVE_CODE_BLOCK':
            return {
                ...state,
                codeBlocks: state.codeBlocks.filter(c => c._id !== action.payload)
            }
        case 'UPDATE_CODE_BLOCK':
            return {
                ...state,
                codeBlocks: state.codeBlocks.map(c => (c._id === action.payload._id) ? action.payload : c)
            }
        default:
            return state
    }

}
