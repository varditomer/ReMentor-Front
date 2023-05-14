// Interfaces
import { CodeBlock } from "./CodeBlock.interface"

export interface CodeBlockState {
    codeBlocks: CodeBlock[]
}

export interface CodeBlockModule {
    codeBlockModule: CodeBlockState
}

export interface INITIAL_STATE {
    codeBlocks?: CodeBlock[],
}