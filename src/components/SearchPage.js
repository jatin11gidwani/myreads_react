import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './../BooksAPI'

class SearchPage extends Component {

  state = {
    query : '',
    books_list: []
  }
  
  updateQuery = (query) => {
    console.log(query)
    this.setState({query: query})
    if(query) {
      BooksAPI.search(query, 20).then(
        response => {
          if (response.error) {
            this.setState({books_list: []});
          } else {
              if (response.length === 0 ) {
                this.setState({books_list: []})
              } else {
                  this.setState({books_list: response})
                } 
            }
          },
        error => {
          console.log("error ocurred");
        }
      )
    } 
  }
  
  render () {
    const { query } = this.state
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(event => this.updateQuery(event.target.value))}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { 
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
              )
            }
      
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage