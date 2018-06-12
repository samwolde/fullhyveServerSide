/// <reference types="express" />
import * as express from "express";
export declare class ValidateM {
    static validateNewUser(req: any, res: express.Response, next: express.NextFunction): void;
    static validateNewTeam(req: any, res: express.Response, next: express.NextFunction): void;
    static validateNewProject(req: any, res: express.Response, next: express.NextFunction): void;
    static validateNewTaskset(req: any, res: express.Response, next: express.NextFunction): void;
    static validateNewTask(req: any, res: express.Response, next: express.NextFunction): void;
}
