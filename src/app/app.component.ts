import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { DatabaseService } from './service/database.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private databaseService = inject(DatabaseService);

  title = 'koboli';
  addBookError = false;
  books =[{id:'',name:'',author:'',description:'',whyread:'',date_created:''}];
  validBookStatus = ['reading', 'paused', 'finished', 'abandoned', 'toread'];

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
      this.books = result;
    });
  }

  setStatus(id: string, status: string) {
    if(this.validBookStatus.includes(status)) {
      this.databaseService.setStatus(id, status).then((result) => {
        // result == 1, success
        console.log(result);
      });
    }

  }

}

