import { Injectable } from '@angular/core';
import { Database } from '@sqlitecloud/drivers';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  private db = new Database('sqlitecloud://cl6ceebnhz.sqlite.cloud:8860/koboli-dev?apikey=ij2m3cJQUSbaqirmiRDCchO6cvDF1sS1NehggY3UqKc');

  addBooks(name: string, author: string, description: (string | null), whyread: (string | null)) {
    console.log(name, author, description, whyread);
    
    const date = new Date().toISOString();
    return this.db.sql`USE DATABASE koboli-dev; INSERT INTO books (name, author, description, whyread, date_created) VALUES (${name}, ${author}, ${description}, ${whyread}, ${date});`;
  }
}
