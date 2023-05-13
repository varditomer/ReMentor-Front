import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { CodeBlockModule } from "../interfaces/State.interface"

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import { useEffect, useRef, useState } from "react";

export const CodeBlock: React.FC = () => {
  const params = useParams() // Getting the right codeBlock according to params id that point on user's selected codeBlock
  const codeBlock = useSelector((state: CodeBlockModule) => state.codeBlockModule.codeBlocks.find(c => c._id === params.id))

  const [code, setCode] = useState('')

  const codeRef = useRef<HTMLElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Don't enter till codeBlock is loaded from store
    if (!codeBlock) return
    setCode(codeBlock.code)
  }, [codeBlock])


  useEffect(() => {
    // Initial highlight the code and Resize text area
    if (!codeRef.current) return
    hljs.highlightBlock(codeRef.current)
    resizeTextarea()
  }, [code])


  const onCodeChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(`ev.target.value:`, ev.target.value)
    setCode(ev.target.value)
    if (!codeRef.current) return
    // Re-highlight the code whenever it is edited
    hljs.highlightBlock(codeRef.current)
    // Resize text area to cover code element whenever it is edited
    resizeTextarea()
  }

  const resizeTextarea = () => {
    if (!textAreaRef.current) return
    // Set the height of the textarea to auto (max parent size) first, then set it to its scrollHeight
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }

  if (!code) return <div>Loading...</div>

  return (
    <section className="code-block-page">
      <h1>Code Block Page</h1>
      <pre className="highlighted-code-container">
        <code
          className="highlighted-text-content"
          // dangerouslySetInnerHTML={{ __html: code }}
          ref={codeRef}
        >
          {code}
        </code>
        <textarea className="code-text-area" spellCheck={false} ref={textAreaRef} onChange={onCodeChange} value={code} rows={1} />
      </pre>
    </section>
  )
}
