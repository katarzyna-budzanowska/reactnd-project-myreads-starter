import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class Search extends React.Component{
  state = {
    books: [],
    error: null,
    searching: ''
  }

  findBookInList = ( id, booksList ) => {
    const bookIndex = booksList.findIndex( book => book.id === id );
    if( bookIndex !== -1 ) {
      return booksList[ bookIndex ];
    }

    return null;
  }

  search = ( event ) => {
    console.log( event.target.value );
    //no search
    if( event.target.value === '' ) {
      this.setState({
        books: [],
        error: null,
        searching: ''
       })
       return;
    }
    this.setState({searching: event.target.value});
    const searching = event.target.value;
    //search
    BooksAPI.search( event.target.value ).then( books => {
      if( this.state.searching !== searching ) {
        return;
      }

      if( books.error ) {
        console.log(books)
        this.setState({
          books: [],
          error: books.error
         })
         return;
      }

      console.log(books);
      books = books.map( book => {
        const myBook = this.findBookInList( book.id, this.props.books );
        return myBook ? myBook : book;
      } );
      this.setState({
        books,
        error: null
      });
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searching}
              onChange={this.search}
            />
          </div>
        </div>
        <div className="search-books-results">
            { this.state.books.length > 0 &&
              <Shelf
                key="found"
                shelf="found"
                shelfTitle={ "Results   count: " + this.state.books.length }
                books={this.state.books}
                change={this.props.change}
              />
            }
            { this.state.error === 'empty query' &&
              <div className="bookshelf">
                <h2 className="bookshelf-title">"Nothing Found"</h2>
              </div>
            }
        </div>
      </div>
    );
  }
}

export default Search;
