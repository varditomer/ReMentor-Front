
// React / Redux
import { useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { CodeBlockList } from '../components/CodeBlockList'
import { useNavigate } from "react-router-dom"
// Interfaces
import { CodeBlockModule, INITIAL_STATE } from '../interfaces/State.interface'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { removeCodeBlock, updateCodeBlockInStore } from '../store/actions/codeBlock.action'
import socketService from '../services/socket.service'
import { useEffect } from 'react'
import { CodeBlock } from '../interfaces/CodeBlock.interface'

export const Lobby: React.FC = () => {
  const { codeBlocks } = useSelector((state: CodeBlockModule) => state.codeBlockModule)
  const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

  const navigate = useNavigate()
  const onNavigate = (codeBlockId: string) => navigate(`/${codeBlockId}`)

  const onAddCodeBlock = () => console.log(`adding CB:`,)

  const onRemoveCodeBlock = (codeBlockId: string) => {
    dispatch(removeCodeBlock(codeBlockId))
  }

  useEffect(() => {
    socketService.init('codeUpdated', (codeBlock: CodeBlock) => dispatch(updateCodeBlockInStore(codeBlock)))
  }, [])


  if (!codeBlocks.length) return <div>Loading...</div>

  return (
    <section className="lobby">
      <header className="lobby-header">
        <h1>Select a code block</h1>
        <button className="add-code-block" onClick={onAddCodeBlock}>Add +</button>
      </header>

      <CodeBlockList
        codeBlocks={codeBlocks}
        onNavigate={onNavigate}
        onRemoveCodeBlock={onRemoveCodeBlock}
      />
    </section>
  )

}
