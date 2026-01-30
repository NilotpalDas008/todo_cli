import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', '..', 'data', 'tasks.json');

//readTask

export const readTasks = async() =>{
    try{
        const data = await fs.readFile(DB_PATH ,'utf-8');
        return JSON.parse(data);
    }
    catch(error){
        return [];
    }
    
}

//saveTask
export const saveTasks = async(task)=>{
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await  fs.writeFile(DB_PATH, JSON.stringify(task, null, 2));
}