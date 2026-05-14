import sqlite3 from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// função de conexão com o banco
export async function conectar() {
    const db = await open({
        filename: process.env.DB_PATH || path.resolve("data/noticias.db"),
        driver: sqlite3.Database
    });

    return db;
};