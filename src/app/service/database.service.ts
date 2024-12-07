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
    return await this.turso.execute("SELECT * FROM books WHERE is_deleted = 0 order by date_created desc");
  }
}
