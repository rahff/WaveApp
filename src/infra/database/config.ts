import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
    name: "appData",
    version: 1,
    objectStoresMeta: [
        {
            store: "user",
            storeConfig: {keyPath: "id", autoIncrement: false},
            storeSchema: [
                {name: "email", keypath: "email", options: {unique: false}},
            ]
        },
        {
            store: "contact",
            storeConfig: {keyPath: "id", autoIncrement: false},
            storeSchema: [
                {name: "email", keypath: "email", options: {unique: false}},
                {name: "tel", keypath: "tel", options: {unique: true}}
            ]
        },
        {
            store: "calendar",
            storeConfig: {keyPath: "id", autoIncrement: false},
            storeSchema: [
                {name: "title", keypath: "title", options: {unique: false}}
            ]
        },
        {
            store: "todo",
            storeConfig: {keyPath: "id", autoIncrement: false},
            storeSchema: [
                {name: "description", keypath: "description", options: {unique: false}}
            ]
        }
    ]
}