import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { CodeBlockModule } from "../interfaces/State.interface"
import hljs from "highlight.js";
import { useEffect } from "react";


export const CodeBlock: React.FC = () => {
  const params = useParams()
  const codeBlock = useSelector((state: CodeBlockModule) => state.codeBlockModule.codeBlocks.find(c => c._id === params.id))

  // const highlightedCode = hljs.highlight(`<span>${codeBlock?.code}</span>`, { language: 'js' }).value

  useEffect(() => {
    hljs.highlightAll();
  });


  if (!codeBlock) return <div>Loading...</div>
  return (
    <section className="code-block-page">
      <h1>Code Block Page</h1>
      <pre>
        <code className="language-javascript">{codeBlock.code}</code>
      </pre>
    </section>
  )
}
