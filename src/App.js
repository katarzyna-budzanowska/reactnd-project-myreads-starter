import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books'
import Search from './Search'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({ books });
    })
  }

  change = (updatedBook) => {
    this.updateBook(updatedBook);
  }

  updateBook = (book) => {
    const books = [...this.state.books];
    const bookIndex = books.findIndex(_book => _book.id === book.id);
    if(bookIndex === -1) {
      books.push( book );
    }
    else {
      books[bookIndex] = book;
    }
    this.setState({ books });
    BooksAPI.update(book, book.shelf);
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => <Books books={this.state.books} change={this.change}/> }/>
            <Route exact path="/search" render={ () => <Search books={this.state.books} change={this.change}/> }/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
