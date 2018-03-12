import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './../BooksAPI'
import InputBoxDoneTyping from 'react-input-box-done-typing'

class SearchPage extends Component {

  state = {
    query : '',
    books_list: []
  }

  showSearch = () => {
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
    else if (!books_list.length) {
      return (
        <div>
          <strong>
            Please enter a valid search query.
          </strong>
        </div>
      )
    } 
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
          book.shelf = "none"
          for(let i =0 ; i < this.props.temp_list.length ; i++) {
            if(book.id === this.props.temp_list[i].id) {
              book.shelf = this.props.temp_list[i].shelf
              console.log(book.shelf)
              break;
            }
          }
          return book
        })
        console.log(temp_books)
        this.setState({books_list: temp_books})
      }
    }).catch(err => console.log(err,'error occured'))
  }}

  updateQuery = (query) => {
    this.setState({query: query})
    console.log(this.state.query , query)
    if(query !== "" )
      this.fetchbooks(query)
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
          <div  className="search-books-input-wrapper">
            <InputBoxDoneTyping
                id="input-box-done-typing"
                className="form-control"
                placeholder="Start typing ..."
                autoComplete="off"
                doneTyping={(value) => { this.updateQuery(value) } }
                doneTypingInterval={350}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
             this.showSearch()
            }  
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage