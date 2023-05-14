import { ChangeEvent, useState } from "react"
import { CodeBlock } from "../interfaces/CodeBlock.interface"

type Props = {
    onCloseModal: () => void
    onAddCodeBlock: Function
}

export const AddCodeBlock: React.FC<Props> = ({ onCloseModal, onAddCodeBlock }) => {
    const [codeBlock, setCodeBlock] = useState<CodeBlock>({
        title: '',
        code: ''
    })

    const closeModal = () => {
        onCloseModal()
    }



    const onChange = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const codeBlockToUpdate = JSON.parse(JSON.stringify(codeBlock))
        if (ev.target.type === 'text') {
            codeBlockToUpdate.title = ev.target.value
            setCodeBlock(codeBlockToUpdate);
        } else {
            codeBlockToUpdate.code = ev.target.value
            setCodeBlock(codeBlockToUpdate);
        }

    }

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        onAddCodeBlock(codeBlock)
        closeModal()
    }

    return (
        <section className="add-code-block-modal">
            <form action="" className="add-code-block" onSubmit={handleSubmit}>
                <div className="add-code-block-header">
                    <h2>Enter title and code to add a new code block</h2>
                    <img src="./src/assets/svgs/x-symbol-svgrepo-com.svg" className="close-btn" onClick={closeModal}></img>
                </div>
                <input type="text" className="code-block-title" placeholder="Enter code block title" onChange={onChange} />
                <textarea name="" id="" cols={30} rows={10} className="code-block-code" placeholder="Enter the code" onChange={onChange}></textarea>
                <button className="submit">Add</button>
            </form>
        </section>
    )
}
