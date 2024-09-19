import { Response } from "express";
import dotenv from 'dotenv';
dotenv.config()


export default function succesResponse(res: Response, message: string, status: number, data?: object) {
    return res.json({
        success: true,
        author: "MUHAMMAD DAVA FAHREZA",
        application: "circle",
        version: process.env.version,
        message: message,
        date: new Date(),
        status: status,
        data: data,
    }).status(status)
}