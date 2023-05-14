import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { CodeBlockModule, INITIAL_STATE } from "../interfaces/State.interface"
import { AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'


// 1. set socketService
// 2. register user to socket and connect
// 3. send to the back array of connected user
// 4. dispatch update store and emit socket event (codeUpdated)
// 5. on the back - onCodeUpdate => broadcast socket event (codeUpdated)
// 6. on the CodeBlockCMP - listen to socket event (codeUpdated) and dispatch updateSocket

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import { useEffect, useRef, useState } from "react";
import { updateCodeBlock } from "../store/actions/codeBlock.action"
import socketService from "../services/socket.service"

export const CodeBlock: React.FC = () => {
  const params = useParams() // Getting the right codeBlock according to params id that point on user's selected codeBlock
  const codeBlock = useSelector((state: CodeBlockModule) => state.codeBlockModule.codeBlocks.find(c => c._id === params.id))
  const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

  const [code, setCode] = useState('')
  const [myPermission, setMyPermission] = useState<boolean | null>(null)
  const [highlightedCode, setHighlightedCode] = useState('')
  const [componentRendered, setComponentRendered] = useState(false)

  const myPermissionRef = useRef<null | boolean>(null); // Create a ref with the initial value of count

  useEffect(() => {
    myPermissionRef.current = myPermission; // Update the ref whenever count changes
  }, [myPermission])

  useEffect(() => {
    socketService.init('initial-permission', (isAllowedEditing: boolean) => setMyPermission(isAllowedEditing))

    socketService.init('update-permission', (isAllowedEditing: boolean) => {
      console.log(`isAllowE:`, isAllowedEditing)
      setMyPermission(isAllowedEditing)
    })

    if (!codeBlock || !codeBlock?._id) return
    console.log(`1:`,)
    return () => {
      if (codeBlock._id) socketService.emitLeaveCodeBlockRoom(codeBlock._id, myPermissionRef.current)
    }
  }, [])



  const codeRef = useRef<HTMLElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const isAlreadySignedToRoom = useRef<boolean>(false);

  useEffect(() => {
    // Don't enter till codeBlock is loaded from store
    if (!codeBlock) return
    setCode(codeBlock.code)
    // Initial highlight the code and Resize text area
    // if (!code) return
    const styledCode = hljs.highlight(codeBlock.code, { language: 'javascript', ignoreIllegals: true }).value;
    setHighlightedCode(styledCode)


    // When the user enters a CodeBlock room
    if (!isAlreadySignedToRoom.current) {
      console.log(`isAlreadySignedToRoom.current:`, isAlreadySignedToRoom.current)
      isAlreadySignedToRoom.current = true
      if (codeBlock._id) socketService.emitJoinCodeBlockRoom(codeBlock._id)
    }

  }, [codeBlock])




  useEffect(() => {
    // Skip running the effect if the component hasn't rendered yet
    // Added componentRendered so the ref won't be null and this use effect will run only once
    if (!componentRendered || !textAreaRef.current) return
    resizeTextarea()

  }, [componentRendered])

  useEffect(() => {
    if (!highlightedCode && !componentRendered) return
    setComponentRendered(true)
  }, [highlightedCode])


  const onCodeChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {

    // Check if user has permission to edit
    if (!myPermission) return;


    const editedCode = ev.target.value

    setCode(editedCode)
    if (!codeRef.current) return

    // Re-highlight the code whenever it is edited
    const styledCode = hljs.highlight(editedCode, { language: 'javascript', ignoreIllegals: true }).value;
    setHighlightedCode(styledCode)
    // Resize text area to cover code element whenever it is edited
    resizeTextarea()

    const codeBlockToUpdate = structuredClone(codeBlock)
    if (codeBlockToUpdate) {
      codeBlockToUpdate.code = editedCode
      dispatch(updateCodeBlock(codeBlockToUpdate))
      socketService.emitUpdateCode(codeBlockToUpdate)
    }
  }

  const resizeTextarea = () => {
    if (!textAreaRef.current) return
    // Set the height of the textarea to auto (max parent size) first, then set it to its scrollHeight
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
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          ref={codeRef}
        >
        </code>
        <textarea className="code-text-area" spellCheck={false} ref={textAreaRef} onChange={onCodeChange} value={code} rows={1} />
      </pre>
    </section>
  )
}
