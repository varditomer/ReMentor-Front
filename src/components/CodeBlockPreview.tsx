// Interfaces
import { CodeBlock } from "../interfaces/CodeBlock.interface"
// External libraries
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

type Props = {
    codeBlock: CodeBlock,
    onNavigate: Function
    onRemoveCodeBlock: Function
}

export const CodeBlockPreview: React.FC<Props> = ({ codeBlock, onNavigate, onRemoveCodeBlock }) => {


    const highlightedCode = hljs.highlight(codeBlock.code, { language: 'javascript', ignoreIllegals: true }).value;

    const RemoveCodeBlock = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.stopPropagation() // stopping the propagation of the click event causing the click not to propagate to CB card and navigate the user to the CB page
        onRemoveCodeBlock(codeBlock._id)
    }

    return (
        <article className="code-block-card" onClick={() => onNavigate(codeBlock._id)}>
            <div className="code-block-card-header">
                <h3>{codeBlock.title}</h3>
                <img src="src\assets\svgs\x-symbol-svgrepo-com.svg" className="remove-btn" onClick={RemoveCodeBlock}></img>
            </div>

            <pre>
                <code className="language-javascript hljs" dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
            </pre>

        </article>
    )
}
