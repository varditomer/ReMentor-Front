import { CodeBlock } from "../interfaces/CodeBlock.interface"
import { CodeBlockPreview } from "./CodeBlockPreview"

type Props = {
    codeBlocks: CodeBlock[]
    onNavigate: Function
    onRemoveCodeBlock: Function
}


export const CodeBlockList: React.FC<Props> = ({ codeBlocks, onNavigate, onRemoveCodeBlock }) => {
    

    return (
        <section className="code-block-list">
            {codeBlocks?.map(codeBlock => <CodeBlockPreview
                key={codeBlock._id}
                codeBlock={codeBlock}
                onNavigate={onNavigate}
                onRemoveCodeBlock={onRemoveCodeBlock}
            />
            )}
        </section>
    )
}
