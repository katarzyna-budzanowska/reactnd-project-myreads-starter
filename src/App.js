import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'

const shelfs = [ 'currentlyReading', 'wantToRead', 'read' ];
const shelfsNames = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
}

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

  getBooksByShelf = ( shelf ) => {
    return this.state.books.filter( book => book.shelf === shelf );
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { shelfs.map( shelf => (
                  <Shelf
                    key={shelf}
                    shelf={shelf}
                    shelfTitle={shelfsNames[shelf]}
                    books={this.getBooksByShelf(shelf)}
                    change={this.change}
                  />
                ) ) }
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
