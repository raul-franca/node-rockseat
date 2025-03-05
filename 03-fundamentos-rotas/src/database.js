import fs from 'node:fs/promises';


const dbPath = new URL('../db.json', import.meta.url);

 export class Database {
    // # is a private field
    #database = {};

    constructor() {
        fs.readFile(dbPath, 'utf8')
            .then( data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            });
    }


    #persist() {
        fs.writeFile(dbPath, JSON.stringify(this.#database));
    }

     select(table) {
         return this.#database[table] || [];
     }

    insert(table, data) {
        if (!this.#database[table]) {
            this.#database[table] = [];
        }

        this.#database[table].push(data);

        this.#persist();

        return data;
    }

 }