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
    console.log(JSON.stringify({ name: name, author: author, description: description, whyread: whyread }))
    const request = await fetch("https://kobolidev.leggy6.workers.dev?method=addBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, author: author, description: description, whyread: whyread }),
    });

    const response = await request.json();
    return response;
  }

  async getBooks() {
    // return await this.turso.execute("SELECT * FROM books WHERE is_deleted = 0 order by date_created desc");
    const response = await fetch("https://kobolidev.leggy6.workers.dev?method=getBooks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  }

  async setStatus(id: string, status: string) {
    const request = await fetch("https://kobolidev.leggy6.workers.dev?method=setStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_id: id, status: status }),
    });

    const response = await request.json();
    return response;
  }
}
