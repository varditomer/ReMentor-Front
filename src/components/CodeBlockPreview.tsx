import { useEffect } from "react";
import { CodeBlock } from "../interfaces/CodeBlock.Interface"
import hljs from "highlight.js";

type Props = {
    codeBlock: CodeBlock,
    onNavigate: Function
}


export const CodeBlockPreview: React.FC<Props> = ({ codeBlock, onNavigate }) => {


    useEffect(() => {
        hljs.highlightAll();
    });

    return (
        <article className="code-block-card" onClick={() => onNavigate(codeBlock._id)}>
            <h3>{codeBlock.title}</h3>
            <pre>
                <code>{codeBlock.code}</code>
            </pre>
            {/* <pre></pre> */}
        </article>
    )
}
