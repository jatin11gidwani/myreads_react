import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './../BooksAPI'
import InputBoxDoneTyping from 'react-input-box-done-typing'

// import TextSearch from './TextSearch'

class SearchPage extends Component {

  state = {
    query : '',
    books_list: []
  }

  showSearch = () => {
    // setTimeout(console.log('waited'), 100)
const {query , books_list} = this.state
  //  console.log(this.state.query)
    if (query === '') {

      console.log('query is empty')
      return (
        <div>
          <strong>
          Please enter a query to search.
          </strong>
        </div>
      )
    } 

    
    // while(books_list == null )
    else if (!books_list.length) {
      // BooksAPI.search(this.state.query).then(books => {
        // if (books.error) {

        //   console.log('empty')
          return (
            <div>
              <strong>
                Please enter a valid search query.
              </strong>
            </div>
          )
        // } else {
          // this.setState({books_list: books}, 
          //   console.log(this.state.books_list))
        // }
      } 
      // )
    // }

    else  {

      // console.log(this.state.books_list)
      return (
        books_list.map((book, i) => (
          //  console.log(book)
          <li key={i}>
            <Book
              book={book}
              moveBook={this.props.moveBook}
            />
          </li>
        ))
      )
      // console.log('worked')
    }
    
  }
  



fetchbooks = (query) => {
if(query) {
  BooksAPI.search(query,20).then(books => {
    if (!books || books.hasOwnProperty('error')) {
      this.setState({books_list: []})
    }
    else {
      let temp_books = books.map((book)=> {
        console.log(book)
        // this.checkAuthor(book)
        // this.checkThumbnail(book)
        book.shelf = "none"
        for(let i =0 ; i < this.props.temp_list.length ; i++) {
          if(book.id === this.props.temp_list[i].id) {
            book.shelf = this.props.temp_list[i].shelf
            console.log(book.shelf)
            break;
          }
        }
        return book
      }
    
    )

      console.log(temp_books)
      this.setState({books_list: temp_books})
    }

  }).catch(err => console.log(err,'error occured'))
}
}
updateQuery = (query) => {
  this.setState({query: query})
  console.log(this.state.query , query)
if(query !== "" )
  setTimeout(this.fetchbooks(query), 1)
  
}
checkAuthor = (book) => {
  if (book.authors == null) {
    book.authors = ["N/A"]
  }
  else {
    return book.authors[0]
  }
}

checkThumbnail = (book) => {
 if (!book.hasOwnProperty('imageLinks')) {
   console.log('empty image')      
   book.imageLinks = {thumbnail : "https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"}
 }
 else {
   // console.log(book.imageLinks)
   return book.imageLinks.thumbnail
 }
}

  render () {
    
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'>
            Close
          </Link>
          {/* onSubmit={(e) => { e.preventDefault();this.updateQuery()}} */}
          <div  className="search-books-input-wrapper">
            {/* <input id='query' type="text" placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event => this.updateQuery(event.target.value))}
            /> */}

            <InputBoxDoneTyping
                id="input-box-done-typing"
                className="form-control"
                placeholder="Start typing ..."
                
                autoComplete="off"
                // onChange={(value) => { console.log('onChange:', value); } }
                doneTyping={(value) => { this.updateQuery(value) } }
                doneTypingInterval={350}
                />
            {/* <input type="submit" value="" id='search-button'/> */}
          </div>
          
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* { { 
              this.state.books_list.length !== 0 && (
                this.state.books_list.map((book, i) => (
                  //  console.log(book)
                  <li key={i}>
                    <Book
                      book={book}
                      moveBook={this.props.moveBook}
                    />
                  </li>
                ))
              ) }  }*/
              // this.showSearch()
              this.showSearch()
            }
      
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage