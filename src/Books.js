import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

const shelfs = [ 'currentlyReading', 'wantToRead', 'read' ];
const shelfsNames = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
}

class Books extends React.Component{

  getBooksByShelf = (shelf) => {
    return this.props.books.filter(book => book.shelf === shelf);
  }

  render() {
    return (
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
                change={this.props.change}
              />
            ) ) }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a Book</Link>
        </div>
      </div>
    );
  }
}

export default Books;
