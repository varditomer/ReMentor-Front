// Interfaces

import { CodeBlock } from "../../interfaces/CodeBlock.interface"
import { codeBlockService } from "../../services/codeBlock.service"


// Services
export function loadCodeBlocks() {
    return async (dispatch: any) => {
        try {
            const codeBlocks = await codeBlockService.query()
            dispatch({ type: 'SET_CODE_BLOCKS', payload: codeBlocks })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function addCodeBlock(newCodeBlock: CodeBlock) {
    return async (dispatch: any) => {
        try {
            const codeBlock = await codeBlockService.add(newCodeBlock)
            dispatch({ type: 'ADD_CODE_BLOCK', payload: codeBlock })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function removeCodeBlock(codeBlockId: string) {
    return async (dispatch: any) => {
        try {
            await codeBlockService.remove(codeBlockId)
            // by 1st trying to remove CB from backend if there will be a failure the CB won't remove also from the store.
            // it can be done also with optimistic approach by removing it 1st from the store and saving a backup in case of failure
            dispatch({ type: 'REMOVE_CODE_BLOCK', payload: codeBlockId })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}


// export function updateCodeBlock(tweetToUpdate: CodeBlock, tweetLastState: CodeBlock) {
//     return async (dispatch: any) => {
//         try {
//             // Optimistic update: 1st updating store, if backend update fail - restore to tweet's last state
//             dispatch({ type: 'UPDATE_TWEET', payload: tweetToUpdate })
//             await tweetService.update(tweetToUpdate)
//         } catch (err) {
//             dispatch({ type: 'UPDATE_TWEET', payload: tweetLastState })
//             notifyFail()
//         }
//     }
// }

// export function addRetweet(retweetedCodeBlockId: string) {
//     return async (dispatch: any) => {
//         try {
//             const retweet = await tweetService.retweet(retweetedCodeBlockId)
//             dispatch({ type: 'ADD_TWEET', payload: retweet })
//             notifySuccess('CodeBlock Retweeted')
//             return retweet._id
//         } catch (err) {
//             notifyFail()
//         }
//     }
// }

