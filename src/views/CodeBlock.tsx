import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { CodeBlockModule } from "../interfaces/State.interface"

export const CodeBlock: React.FC = () => {
  const params = useParams()
  const codeBlock = useSelector((state: CodeBlockModule) => state.codeBlockModule.codeBlocks.find(c => c._id === params.id))

  if (!codeBlock) return <div>Loading...</div>
  return (
    <pre>{codeBlock.code}</pre>
  )
}
