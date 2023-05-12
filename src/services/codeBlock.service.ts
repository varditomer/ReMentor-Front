import { CodeBlock } from "../interfaces/CodeBlock.Interface"
import { httpService } from "./http.service"

const STORAGE_KEY = 'codeBlock'

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
    },
    {
        _id: 'c102',
        title: 'Object creation',
        code: `
            let person = {
                name: "John Doe",
                age: 25,
                address: {
                street: "123 Main St",
                city: "Anytown",
                state: "CA"
                }
            };
            console.log(person.street);
        `
    },
    {
        _id: 'c103',
        title: 'Function creation',
        code: `
            function multiplyNumbers(num1, num2) {
                let product = num1 + num2;
                return product;
            }
            console.log(multiplyNumbers(5, 10));
          
        `
    },
]

function queryCodeBlocks(): CodeBlock[] {
    return codeBlocks
}

async function add(newCodeBlock: CodeBlock): Promise<CodeBlock> {
    const addedCodeBlock = await httpService.post(`${STORAGE_KEY}`, newCodeBlock)
    return addedCodeBlock
}

export const codeBlockService = {
    queryCodeBlocks,
    add,

}