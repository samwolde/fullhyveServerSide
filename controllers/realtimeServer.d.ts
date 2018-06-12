/// <reference types="node" />
import { Server } from 'http';
export declare class RealtimeServer {
    private io;
    private socket;
    constructor(server: Server);
    private initiateSockets(server);
    private static d;
    private listen();
    static notifyConnected(): void;
}
