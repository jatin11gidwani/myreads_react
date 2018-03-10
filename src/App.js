import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import * as BooksAPI from './BooksAPI'
import Shelf from './components/Shelves'

class BooksApp extends React.Component {

  state = {
      books_list : []
  }  

componentDidMount () {
  BooksAPI.getAll().then((books) => {
    this.setState({books_list: books})
      //  console.log(this.state.books_list)
  })
  console.log(this.state.books_list)
}

moveBook = (newBook, newShelf) => {
  console.log(newShelf)
  BooksAPI.update(newBook, newShelf).then(response =>{
    BooksAPI.getAll().then((books) => {
      this.setState({books_list: books})
       //  console.log(this.state.books_list)
    })
  })
}

render() {
console.log(this.state.books_list)
let wantToRead =[]
var read = []
let currentlyReading = []
this.state.books_list.map((book) => {
  if( book.shelf === 'wantToRead') {
    wantToRead.push(book)
       // console.log(book)
  } else if ( book.shelf === 'read') {
      read.push(book)
      // console.log(book.imageLinks.thumbnail)
  } else if ( book.shelf === 'currentlyReading'){
      currentlyReading.push(book)   
 }
 return true
})

  return (   
      <div className="app">

        <Route exact path='/' render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div> 
                <Shelf shelfName="Want to Read" book_list={wantToRead} moveBook={this.moveBook}/>
                <Shelf shelfName="Read" book_list={read} moveBook={this.moveBook}/>
                <Shelf shelfName="Currently Reading" book_list={currentlyReading} moveBook={this.moveBook}/>
              </div>
            </div>
            <div className='open-search'>
              <Link
                to='/search'>
                Search BooksAPI
              </Link>
            </div>
          </div>
        )}/>
         
        <Route path='/search' render={ () => (
          <SearchPage
            moveBook={this.moveBook}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
