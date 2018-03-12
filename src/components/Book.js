import React, { Component } from 'react'

class Book extends Component {

  checkAuthor = (book) => {
     if (book.authors == null) {
       return "N/A"
     }
     else {
       return book.authors[0]
     }
  }

  checkThumbnail = (book) => {
    if (book.imageLinks == null) {
      // console.log(book);      
      return "https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"
    }
    else {
      // console.log(book.imageLinks)
      return book.imageLinks.thumbnail
    }
  }
    
  render () {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.checkThumbnail(this.props.book)})` }}>
          </div>
          <div className="book-shelf-changer">
            <select   onChange={(event) => this.props.moveBook(this.props.book, event.target.value)} defaultValue={ this.props.book.shelf }>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}
        </div>
        <div className="book-authors">{this.checkAuthor(this.props.book)}
        </div>
      </div>
    )
  }
}

export default Book