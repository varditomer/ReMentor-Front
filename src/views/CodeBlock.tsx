// React / Redux
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useEffect, useRef, useState } from "react";
// Interfaces
import { CodeBlockModule, INITIAL_STATE } from "../interfaces/State.interface"
// External libraries
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
// Actions
import { updateCodeBlock } from "../store/actions/codeBlock.action"
// Services
import socketService from "../services/socket.service"

export const CodeBlock: React.FC = () => {
  const params = useParams() // Getting the right codeBlock according to params id that point on user's selected codeBlock
  const codeBlock = useSelector((state: CodeBlockModule) => state.codeBlockModule.codeBlocks.find(c => c._id === params.id))
  const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

  const [code, setCode] = useState('')
  const [myPermission, setMyPermission] = useState<boolean | null>(null)
  const [highlightedCode, setHighlightedCode] = useState('')
  const [componentRendered, setComponentRendered] = useState(false)

  const codeRef = useRef<HTMLElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const myPermissionRef = useRef<null | boolean>(null); // ref to save users permissions to deliver by sockets to back when component unmount
  const isAlreadySignedToRoom = useRef<boolean>(false); // ref flag to check if user already emit room enter socket event

  useEffect(() => {
    myPermissionRef.current = myPermission; // Update the ref whenever count changes
  }, [myPermission])

  useEffect(() => {
    // socket events listeners
    socketService.init('initial-permission', (isAllowedEditing: boolean) => setMyPermission(isAllowedEditing))
    socketService.init('update-permission', (isAllowedEditing: boolean) => setMyPermission(isAllowedEditing))

    if (!codeBlock || !codeBlock?._id) return
    return () => {
      // Emit user leave room event when cmp unmount to deliver permission to the users who stay in room
      if (codeBlock._id) socketService.emitLeaveCodeBlockRoom(codeBlock._id, myPermissionRef.current)
    }
  }, [])

  useEffect(() => {
    // Don't enter till codeBlock is loaded from store
    if (!codeBlock) return
    setCode(codeBlock.code)

    // Initial highlight the code and Resize text area
    const styledCode = hljs.highlight(codeBlock.code, { language: 'javascript', ignoreIllegals: true }).value;
    setHighlightedCode(styledCode)

    // run only when the user enters a CodeBlock room
    if (!isAlreadySignedToRoom.current) {
      console.log(`isAlreadySignedToRoom.current:`, isAlreadySignedToRoom.current)
      isAlreadySignedToRoom.current = true
      if (codeBlock._id) socketService.emitJoinCodeBlockRoom(codeBlock._id)
    }

  }, [codeBlock])


  useEffect(() => {
    // validate component has been render (after code gets from store and being highlighted) to resize text area only then
    if (!highlightedCode && !componentRendered) return
    setComponentRendered(true)
  }, [highlightedCode])

  useEffect(() => {
    // Skip running the useEffect if the component hasn't rendered yet
    // Added componentRendered so the ref won't be null and this use effect will run only once
    if (!componentRendered || !textAreaRef.current) return
    resizeTextarea()

  }, [componentRendered])

  const onCodeChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {

    // Check if user has permission to edit
    if (!myPermission) return;

    const editedCode = ev.target.value
    setCode(editedCode)

    if (!codeRef.current) return

    // Re-highlight the code whenever it's edited
    const styledCode = hljs.highlight(editedCode, { language: 'javascript', ignoreIllegals: true }).value;
    setHighlightedCode(styledCode)
    // Resize text area to cover code element whenever it is edited
    resizeTextarea()

    // Break codeBlock pointer to secure codeBlock won't changed
    const codeBlockToUpdate = JSON.parse(JSON.stringify(codeBlock))
    if (codeBlockToUpdate) {
      codeBlockToUpdate.code = editedCode
      dispatch(updateCodeBlock(codeBlockToUpdate))
      // Emit code updated socket event
      socketService.emitUpdateCode(codeBlockToUpdate)
    }
  }

  const resizeTextarea = () => {
    if (!textAreaRef.current) return
    // Set the height of the textarea to auto (max parent size) first, then set it to its scrollHeight to cover code area
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }

  if (!highlightedCode) return <div>Loading...</div>

  return (
    <section className="code-block-page">
      <header className="code-block-page-header">
        <h1>Are you a Mentor or a Student?</h1>
        <span>Share the link and watch him developing 👨🏻‍💻</span>
      </header>
      <pre className="highlighted-code-container">
        <code
          className="highlighted-text-content language-javascript hljs"
          dangerouslySetInnerHTML={{ __html: highlightedCode }} // Handle harm code injection
          ref={codeRef}
        />
        <textarea className="code-text-area" spellCheck={false} ref={textAreaRef} onChange={onCodeChange} value={code} rows={1} />
      </pre>
    </section>
  )
}
