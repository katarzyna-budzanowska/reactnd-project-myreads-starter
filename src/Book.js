import React from 'react'
import no_cover from './img/no_cover.png'

class Book extends React.Component{
  changeBookShelf = ( event ) => {
    const updatedBook = this.props.book;
    updatedBook.shelf = event.target.value;
    this.props.change(updatedBook);
  }

  getImageLink = () => {
    if(this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail) {
      return 'url("' + this.props.book.imageLinks.smallThumbnail + '")';
    } else {
      return 'url("' + no_cover + '")';
    }
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.getImageLink()}}></div>
          <div className="book-shelf-changer">
            <select
              value={this.props.book.shelf ? this.props.book.shelf : 'none'}
              onChange={this.changeBookShelf}
            >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{"" + this.props.book.authors}</div>
      </div>
    );
  }
}

export default Book;
