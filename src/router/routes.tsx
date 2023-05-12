// Views:
import { Lobby } from '../views/Lobby'
import { CodeBlock } from '../views/CodeBlock'
// Components:

export const routes = [
    {
        path: "/",
        component: <Lobby />,
    },
    {
        path: "/:id",
        component: <CodeBlock />,
    }
    // {
    //     path: "/loginsignup",
    //     component: <LoginSignup />,
    //     children: [
    //         {
    //             path: "/loginsignup/login",
    //             component: <Login />,
    //         },
    //         {
    //             path: "/loginsignup/signup",
    //             component: <Signup />,
    //         },
    //     ]
    // },
]