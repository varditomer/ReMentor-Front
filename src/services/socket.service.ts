// External libraries
import { io, Socket } from 'socket.io-client';
// Interfaces
import { CodeBlock } from '../interfaces/CodeBlock.interface';


class SocketService {
  private socket: Socket;

  baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'

  constructor() {
    this.socket = io(this.baseUrl);
  }

  // Listening to generic socket events and get evName and callback for each
  public init(eventName: string, cb: (args: any) => void): void {
    this.socket.on(eventName, cb)
  }

  // Socket emit events
  public emitUpdateCode(codeBlock: CodeBlock): void {
    this.socket.emit('update-code', codeBlock);
  }

  public emitJoinCodeBlockRoom(codeBlockId: string): void {
    this.socket.emit('join-room', codeBlockId);
  }
  public emitLeaveCodeBlockRoom(roomId: string, myPermission: boolean | null): void {
    this.socket.emit('leave-room', {roomId, myPermission});
  }
}

export default new SocketService()