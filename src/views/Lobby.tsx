
// React / Redux
import { useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { CodeBlockList } from '../components/CodeBlockList'
import { useNavigate } from "react-router-dom"
// Interfaces
import { CodeBlockModule, INITIAL_STATE } from '../interfaces/State.interface'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { removeCodeBlock, updateCodeBlockInStore, addCodeBlock } from '../store/actions/codeBlock.action'
import socketService from '../services/socket.service'
import { useEffect, useState } from 'react'
import { CodeBlock } from '../interfaces/CodeBlock.interface'
import { AddCodeBlock } from '../components/AddCodeBlock'

export const Lobby: React.FC = () => {
  const { codeBlocks } = useSelector((state: CodeBlockModule) => state.codeBlockModule)
  const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

  const [openAddCodeBlockModal, setOpenAddCodeBlockModal] = useState(false)

  const navigate = useNavigate()
  const onNavigate = (codeBlockId: string) => navigate(`/${codeBlockId}`)

  const onRemoveCodeBlock = (codeBlockId: string) => dispatch(removeCodeBlock(codeBlockId))
  
  const onAddCodeBlock = (codeBlock: CodeBlock) => dispatch(addCodeBlock(codeBlock))

  const onCloseModal = () => setOpenAddCodeBlockModal(false)

  useEffect(() => {
    socketService.init('codeUpdated', (codeBlock: CodeBlock) => dispatch(updateCodeBlockInStore(codeBlock)))
  }, [])

  if (!codeBlocks.length) return <div>Loading...</div>

  return (
    <section className="lobby">
      {openAddCodeBlockModal && <AddCodeBlock onCloseModal={onCloseModal} onAddCodeBlock={onAddCodeBlock}/>}

      <header className="lobby-header">
        <h1>Select a code block</h1>
        <button className="add-code-block" onClick={() => setOpenAddCodeBlockModal(!openAddCodeBlockModal)}>Add +</button>
      </header>

      <CodeBlockList
        codeBlocks={codeBlocks}
        onNavigate={onNavigate}
        onRemoveCodeBlock={onRemoveCodeBlock}
      />
    </section>
  )

}
