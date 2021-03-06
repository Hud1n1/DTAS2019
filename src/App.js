import React from 'react';
import './App.css';
import {NavbarMenu} from './components/NavbarMenu';
import {HomePage} from './components/HomePage';
import {Books} from './components/BooksComponent/Books';
import {BooksAdd} from './components/BooksComponent/BooksAdd';
import {BooksEditList} from './components/BooksComponent/BooksEditList';
import {BooksEdit} from './components/BooksComponent/BooksEdit';
import {Readers} from './components/ReadersComponent/Readers';
import {Search} from './components/Search/Search';



import { Route } from 'react-router';
import { BrowserRouter} from 'react-router-dom';
import {ReadersEdit} from "./components/ReadersComponent/ReadersEdit";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
            <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
                <NavbarMenu/>
                <div className="main-content-container container-fluid px-4">
                    <Route path="/home" component={HomePage} />
                    <Route path="/books" component={Books} />
                    <Route path="/books-add" component={BooksAdd} />
                    <Route path="/books-edit-list" component={BooksEditList} />
                    <Route path="/books-edit/:id" component={BooksEdit} />
                    <Route path="/readers" component={Readers} />
                    <Route path="/readers-edit/:id" component={ReadersEdit} />
                    <Route path="/search" component={Search} />
                </div>
            </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
