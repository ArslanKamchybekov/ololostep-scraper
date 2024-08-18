"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyClerkSession = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const clerk = (0, clerk_sdk_node_1.createClerkClient)({ secretKey: process.env.CLERK_API_KEY });
const verifyClerkSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // const session = await clerk.sessions.verifySession(token);
        // if (!session || !session.userId) {
        //   return res.status(401).json({ error: 'Invalid session' });
        // }
        // req.userId = session.userId as string;
        next();
    }
    catch (error) {
        console.error('Error verifying session:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
});
exports.verifyClerkSession = verifyClerkSession;
