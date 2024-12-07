import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { DatabaseService } from './service/database.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private databaseService = inject(DatabaseService);

  title = 'koboli';
  addBookError = false;
  books =[{id:'',name:'',author:'',description:'',whyread:'',date_created:''}];

  private bookBuilder = inject(FormBuilder);

  ngOnInit() {
    this.getBooks();
  }

  bookForm = this.bookBuilder.group({
    bookName: ['', [Validators.required, Validators.pattern('(?!^ +$)^.+$'), Validators.maxLength(100)]],
    authorName: ['', [Validators.required, Validators.pattern('(?!^ +$)^.+$'), Validators.maxLength(100)]],
    description: ['', Validators.maxLength(1000)],
    whyRead: ['', Validators.maxLength(1000)]
  });

  addBook() {
    this.addBookError = false;

    if (this.bookForm.valid) {
      // @ts-expect-error
      const bookName = this.bookForm.value.bookName.trim();
      // @ts-expect-error
      const authorName = this.bookForm.value.authorName.trim();
      // @ts-expect-error
      this.databaseService.addBooks(bookName, authorName, this.bookForm.value.description, this.bookForm.value.whyRead).then((result) => {
        if(result.rowsAffected === 1) {
          // success
          this.bookForm.reset();
        }
      }).catch((err) => {
        this.addBookError = true;
      });
    } else {
      alert('Invalid form');
    }
  }

  getBooks() {
    this.databaseService.getBooks().then((result) => {
      console.log(result);
      if(result.rows.length > 0) {
        // @ts-expect-errorß
        this.books = result.rows;
      }
      console.log(this.books);
    });

  }

}

