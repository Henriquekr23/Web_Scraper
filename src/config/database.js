import sqlite3 from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const DB_PATH = process.env.DB_PATH || "noticias.db";

let db = null;

export async function conectar() {
    if (db) return db;

    db = await open({
        filename: path.resolve(DB_PATH),
        driver: sqlite3.Database
    });

    return db;
}

export async function desconectar() {
    if (db) {
        await db.close();
        db = null;
    }
}