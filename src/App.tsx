// Settings
import './assets/styles/main.scss'
import { routes } from './router/routes'
// React / Redux
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { Route, Routes } from 'react-router-dom'
// Interfaces
import { INITIAL_STATE } from './interfaces/State.interface'
// Actions
import { loadCodeBlocks } from './store/actions/codeBlock.action'
import { Lobby } from './views/Lobby'
import { CodeBlock } from './views/CodeBlock'
// Components



const App: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

  useEffect(() => {
    dispatch(loadCodeBlocks())
  }, [])

  return (
    <section className="main-app">
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/:id" element={<CodeBlock />} />
      </Routes>
    </section>
  )
}

export default App
