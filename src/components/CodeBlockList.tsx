import { useNavigate } from "react-router-dom"
import { CodeBlock } from "../interfaces/CodeBlock.Interface"
import { CodeBlockPreview } from "./CodeBlockPreview"

type Props = {
    codeBlocks: CodeBlock[]
}


export const CodeBlockList: React.FC<Props> = ({ codeBlocks }) => {
    const navigate = useNavigate()
    const onNavigate = (codeBlockId: string) => navigate(`/${codeBlockId}`)

    return (
        <section className="code-block-list">
            {codeBlocks?.map(codeBlock => <CodeBlockPreview
                key={codeBlock._id}
                codeBlock={codeBlock}
                onNavigate={onNavigate}
            />
            )}
        </section>
    )
}
