
// React / Redux
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { CodeBlockModule } from '../interfaces/State.interface'
// Interfaces

export const Lobby: React.FC = () => {
  const { codeBlocks } = useSelector((state: CodeBlockModule) => state.codeBlockModule)
  console.log(`codeBlocks:`, codeBlocks)


  if (!codeBlocks.length) return <div>Loading...</div>

  return (
    <pre>{codeBlocks[0].code}</pre>
  )

}
