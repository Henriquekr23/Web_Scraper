import sql from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";

dotenv.config();

// função de conexão com o banco
export async function conectar() {
    open({
        filename: process.env.DB_PATH,
        driver: sql.Database
    });
};