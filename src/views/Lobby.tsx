
// React / Redux
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { CodeBlockModule } from '../interfaces/State.interface'
import { CodeBlockList } from '../components/CodeBlockList'
// Interfaces

export const Lobby: React.FC = () => {
  const { codeBlocks } = useSelector((state: CodeBlockModule) => state.codeBlockModule)

  const onAddCodeBlock = () => {
    console.log(`adding CB:`, )
  }

  if (!codeBlocks.length) return <div>Loading...</div>

  return (
    <section className="lobby">
      <h1>Choose code block</h1>
      <button className="add-code-block" onClick={onAddCodeBlock}>Add Code Block +</button>
      <CodeBlockList codeBlocks={codeBlocks} />
    </section>
  )

}
