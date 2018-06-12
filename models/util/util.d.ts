import { User, Team, FastSearchResult, Project, MinTeam, MinUser, NotificationType, Identity } from '../models/serviceValues';
export declare class UtilMethods {
    static getTeamProjectAttr(values: any): FastSearchResult[];
    static getFastUserAttr(users: any): FastSearchResult[];
    static getUserAttr(users: any): User[];
    static getMinUserAttr(users: any): MinUser[];
    static getUserProfileAttr(users: any): Identity[];
    static getMemberCount(members: any): any;
    static getTeamAttr(teams: any): Team[];
    static getMinTeamAttr(teams: any): MinTeam[];
    static getContributorCount(project: any): number;
    static getProjectAttr(projects: any): Project[];
    static getAnnouncementAttr(announcements: any, userId: any, lastSeenAnnouncementId: any, showReply?: boolean): any;
    static getTasksetAttr(sets: any): any;
    static getTaskAttr(tasks: any): Promise<any>;
    static getUnseenTasksAttr(projects: any): any;
    static getUnseenMessagesAttr(messages: any): any;
    static getMessagesAttr(messages: any): any;
    static getOptions(notificationType: NotificationType, id: any): {
        navigate: boolean;
        type: NotificationType;
        name: string;
        id: any;
    }[];
    static getFriendRequestAttr(senders: any, friendsId: any): any;
    static getTeamJoinRequestAttr(senders: any, friendsId: any): any;
    static sliceCustom(values: any, order: string[], offset: number, limit: number): any;
}
export declare class DateMethods {
    static DaysInMonth: any;
    static getTodayDate(): string;
    static getLastMonthDate(): string;
    static getMonthDate(monthBack: number): string;
    static getWeekDate(week: number, startDate?: any): string;
    static getInterval(startDate: any, finalDate: any): number;
}
