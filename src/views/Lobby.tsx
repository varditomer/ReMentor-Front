
// React / Redux
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { CodeBlockModule } from '../interfaces/State.interface'
import { CodeBlockList } from '../components/CodeBlockList'
// Interfaces

export const Lobby: React.FC = () => {
  const { codeBlocks } = useSelector((state: CodeBlockModule) => state.codeBlockModule)

  if (!codeBlocks.length) return <div>Loading...</div>

  return (
    <section className="lobby">
      <h1>Choose code block</h1>
      <CodeBlockList codeBlocks={codeBlocks} />
    </section>
  )

}
