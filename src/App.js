import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books'
import Search from './Search'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({ books });
    })
  }

  change = ( updatedBook ) => {
    this.updateBook( updatedBook );
  }

  updateBook = ( book ) => {
    const books = [...this.state.books];
    const bookIndex = books.findIndex( _book => _book.id === book.id );
    if( bookIndex !== -1 ) {
      books[bookIndex] = book;
      this.setState( { books } );
      BooksAPI.update( book, book.shelf );
    }
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => <Books books={this.state.books} change={this.change}/> }/>
            <Route exact path="/search" component={Search}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
