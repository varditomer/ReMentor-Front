// Interfaces

import { codeBlockService } from "../../services/codeBlock.service"


// Services
export function loadCodeBlocks() {
    return async (dispatch: any) => {
        try {
            const codeBlocks = await codeBlockService.queryCodeBlocks()
            dispatch({ type: 'SET_CODE_BLOCKS', payload: codeBlocks })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

// export function removeCodeBlock(tweetId: string) {
//     return async (dispatch: any) => {
//         try {
//             await tweetService.remove(tweetId)
//             dispatch({ type: 'REMOVE_TWEET', payload: tweetId })
//         } catch (err) {
//             notifyFail()
//         }
//     }
// }

// export function addCodeBlock(tweetToAdd: CodeBlock) {
//     return async (dispatch: any) => {
//         try {
//             const tweet = await tweetService.add(tweetToAdd)
//             dispatch({ type: 'ADD_TWEET', payload: tweet })
//             notifySuccess('CodeBlock added')
//         } catch (err) {
//             notifyFail()
//         }
//     }
// }

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

