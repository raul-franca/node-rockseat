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

     // javascript
     select(table, search) {
         let data = this.#database[table] ?? []

         if (search) {
             data = data.filter(row => {
                 console.log("row", row);
                 return Object.entries(search).some(([key, value]) => {
                     console.log("key", key, "value", value);
                     return row[key].toLowerCase().includes(value.toLowerCase())
                 })
             })
         }

         return data;
     }

    insert(table, data) {
        if (!this.#database[table]) {
            this.#database[table] = [];
        }

        this.#database[table].push(data);

        this.#persist();

        return data;
    }

    update(table, data) {
        const index = this.#database[table].findIndex(item => item.id === data.id);

        if (index === -1) {
            return null;
        }

        this.#database[table][index] = data;

        this.#persist();

        return data;
    }

    delete(table, id) {
        const index = this.#database[table].findIndex(item => item.id === id);

        if (index === -1) {
            return null;
        }

        const deleted = this.#database[table].splice(index, 1);

        this.#persist();

        return deleted;
    }

 }