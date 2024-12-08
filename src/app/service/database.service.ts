import { Injectable } from '@angular/core';
import { createClient } from "@libsql/client";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }
  private turso = createClient({
    url: environment.TURSO_DB_URL,
    authToken: environment.TURSO_AUTH_TOKEN
  });


  async addBooks(name: string, author: string, description: (string | null), whyread: (string | null)) {
    const date = new Date().toISOString();
    return await this.turso.execute({
      sql: "INSERT INTO books (name, author, description, whyread, date_created, is_deleted) VALUES (?, ?, ?, ?, ?, ?)",
      args: [name, author, description, whyread, date, 0]
    });
  }

  async getBooks() {
    // return await this.turso.execute("SELECT * FROM books WHERE is_deleted = 0 order by date_created desc");
    return  {rows: [
      {
        "id": 9,
        "name": "7",
        "author": "7",
        "description": "d7",
        "whyread": "r7",
        "coverurl": null,
        "date_created": "2024-12-07T22:38:49.764Z",
        "is_deleted": 0,
        "date_deleted": null
      },
      {
        "id": 8,
        "name": "6",
        "author": "6",
        "description": "",
        "whyread": "",
        "coverurl": null,
        "date_created": "2024-12-07T21:54:45.779Z",
        "is_deleted": 0,
        "date_deleted": null
      },
      {
        "id": 7,
        "name": "5",
        "author": "5",
        "description": "",
        "whyread": "",
        "coverurl": null,
        "date_created": "2024-12-07T21:44:46.327Z",
        "is_deleted": 0,
        "date_deleted": null
      },
      {
        "id": 6,
        "name": "4",
        "author": "4",
        "description": "d4",
        "whyread": "d4",
        "coverurl": null,
        "date_created": "2024-12-07T21:31:06.707Z",
        "is_deleted": 0,
        "date_deleted": null
      },
      {
        "id": 5,
        "name": "3",
        "author": "3",
        "description": "",
        "whyread": "",
        "coverurl": null,
        "date_created": "2024-12-07T21:30:23.637Z",
        "is_deleted": 0,
        "date_deleted": null
      },
      {
        "id": 4,
        "name": "hello",
        "author": "shjns",
        "description": "",
        "whyread": "",
        "coverurl": null,
        "date_created": "2024-12-07T21:29:21.354Z",
        "is_deleted": 0,
        "date_deleted": null
      },
      {
        "id": 3,
        "name": "hello",
        "author": "shjns",
        "description": "",
        "whyread": "",
        "coverurl": null,
        "date_created": "2024-12-07T21:26:30.425Z",
        "is_deleted": 0,
        "date_deleted": null
      },
      {
        "id": 2,
        "name": "hello",
        "author": "shjns",
        "description": "",
        "whyread": "",
        "coverurl": null,
        "date_created": "",
        "is_deleted": 0,
        "date_deleted": null
      }
    ]}
  }
}
