import { CodeBlock } from "../interfaces/CodeBlock.Interface"

const codeBlocks: CodeBlock[] = [
    {
        _id: 'c101',
        title: 'Async case',
        code: `
            const ans = await getYesNoAns()
            console.log(ans)

            function getYesNoAns() {
                const YES_NO_API_URL = 'https://yesno.wtf/api'
                return fetch(YES_NO_API_URL)
                    .then(res => res.json())
            }
        `
    }
]

function queryCodeBlocks(): CodeBlock[] {
    return codeBlocks
}

export const codeBlockService = {
    queryCodeBlocks,

}