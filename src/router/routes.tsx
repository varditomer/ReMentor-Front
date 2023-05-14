// Views
import { Lobby } from '../views/Lobby'
import { CodeBlock } from '../views/CodeBlock'

export const routes = [
    {
        path: "/",
        component: <Lobby />,
    },
    {
        path: "/:id",
        component: <CodeBlock />,
    }
]