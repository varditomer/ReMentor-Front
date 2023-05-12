// Interfaces
import { CodeBlock } from "./CodeBlock.Interface"
// Reducers


export interface CodeBlockState {
    codeBlocks: CodeBlock[]
}

export interface CodeBlockModule {
    codeBlockModule: CodeBlockState
}

// export interface UserState {
//     userModule: USER_STATE
// }

export interface INITIAL_STATE {
    codeBlocks?: CodeBlock[],
    // users?: User[],
    // loggedinUser?: User
}