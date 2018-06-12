import { User, Contact, Message } from '../models/serviceValues';
export declare class ChatS {
    static getContactId(userId: number, friendId: number, request?: string): Promise<any>;
    static getContactIds(userId: number, friendIds: number[], request?: string): Promise<number[]>;
    static getContact(userId: number, friendId: number, request?: string): Promise<any>;
    static getContactIdFromMessageId(messageId: number): Promise<number>;
    static getFriendLastSeenTime(friendId: number): Promise<{}>;
    static getLastOnline(friendId: number): Promise<string>;
    static getMessages(userId: number, contactIds: number[], seen?: boolean, lastMsgId?: number): Promise<Message[]>;
    static getChatMessages(userId: number, friendId: number, offset?: number, limit?: number, seen?: boolean, lastMsgId?: number): Promise<{}>;
    static countUnseenMessages(friendId: number, contactId: number): Promise<number>;
    static getUsersIdList(userId: number, request?: string[]): Promise<number[]>;
    static getFriendsInfo(friends: any, userId: number): Promise<Contact[]>;
    static getFriendsFromDb(friendsList: number[], name?: string): Promise<User[]>;
    static getUsers(userId: number, request?: string[], name?: string): Promise<any[]>;
    static getChatFriends(userId: number, offset?: number, limit?: number): Promise<any>;
    static searchUsers(userId: any, name: string, offset?: number, limit?: number): Promise<{}>;
    static sendMessage(contactIds: number[], senderId: number, content: string): Promise<any>;
    static sendChatMessage(userId: number, friendId: number, message: string): Promise<any>;
    static updateSeen(userId: number, contactId: number, messageId: number): Promise<number>;
    static editMessage(messageId: number, content: string): Promise<number>;
    static deleteMessage(messageId: number): Promise<number>;
    static forwardMessage(userId: number, friendIds: number[], messageId: number): Promise<any>;
    static getUnseenReceivedMessages(userId: any): Promise<{}>;
    static checkFriendship(userId: number, friendId: number): Promise<boolean>;
    static checkMessageSender(userId: number, messageId: number): Promise<boolean>;
    static checkMessageRecSend(contactId: number, messageId: number): Promise<boolean>;
}
