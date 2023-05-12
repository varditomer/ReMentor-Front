import { CodeBlock } from "../interfaces/CodeBlock.Interface"

type Props = {
    codeBlock: CodeBlock,
    onNavigate: Function
}


export const CodeBlockPreview: React.FC<Props> = ({ codeBlock, onNavigate }) => {

    return (
        <article className="code-block-card" onClick={() => onNavigate(codeBlock._id)}>
            <h3>{codeBlock.title}</h3>
            <pre>{codeBlock.code}</pre>
        </article>
    )
}
