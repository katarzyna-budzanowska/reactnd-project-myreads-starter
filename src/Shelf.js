import React from 'react'
import Book from './Book'

class Shelf extends React.Component{
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              { this.props.books.map( book => (
                <li key={book.id} >
                  <Book
                    book={book}
                    shelf={book.shelf}
                    change={this.props.change}
                  />
                </li>
                ) )
              }
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
