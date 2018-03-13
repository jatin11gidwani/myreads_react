import React, {Component} from 'react'
import Book from './Book'
import * as BooksAPI from './../BooksAPI'

class SearchedItems extends Component {
    state = {
       
        books_list: []
      }
   
    
    fetchbooks = (query) => {
        // console.log('called fetch')
        if (query === '') {
            console.log('query is empty')
            return (
              <div>
                <strong>
                Please enter a query to search.
                {/* {query} */}
                </strong>
              </div>
            )
          } 
           
        else {
            // return (query)
            // let i = " hello"
            let temp_books = "hello"
        
             BooksAPI.search(query,20).then(books => {
                if (!books || books.hasOwnProperty('error')) {
                  // 
                  // this.setState({books_list : []})
                  return (
                    <div>
                      <strong>
                        Please enter a valid search query.
                      </strong>
                    </div>
                  )
                
                }
                else {
                   temp_books = books.map((book)=> {
                    // console.log(book)
                    book.shelf = "none"
                    for(let i =0 ; i < this.props.temp_list.length ; i++) {
                      if(book.id === this.props.temp_list[i].id) {
                        book.shelf = this.props.temp_list[i].shelf
                        // console.log(book.shelf)
                        break;
                      }
                    }
                    return book
                  })
                
                this.setState({books_list : temp_books})
                  // console.log(temp_books)
                  // this.setState({books_list: temp_books})
                }
              }).catch(err => console.log(err,'error occured'))
        

if(this.state.books_list.length === 0) {
    return (
        <div>
          <strong>
            Please enter a valid search query.
          </strong>
        </div>
      )
} else {
    return (
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
}  }

    
}

      render () {
          
    const {query} = this.props
    const { books_list } = this.state
    console.log(query, books_list)

    if ( query.length === 0) {
    
      return (
        <div>
          <strong>
          Please enter a query to search.
          </strong>
        </div>
      )
    }
    else if( books_list.length !== 0 ){ 
      return (
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
    } else {
      this.fetchbooks(query)
    }
    // BooksAPI.search(query,20).then(books => {
    //     if (!books || books.hasOwnProperty('error')) {
    //       this.setState({books_list: []})
    //     }
    //     else {
    //       let temp_books = books.map((book)=> {
    //         // console.log(book)
    //         book.shelf = "none"
    //         for(let i =0 ; i < this.props.temp_list.length ; i++) {
    //           if(book.id === this.props.temp_list[i].id) {
    //             book.shelf = this.props.temp_list[i].shelf
    //             // console.log(book.shelf)
    //             break;
    //           }
    //         }
    //         return book
    //       })
    //       // console.log(temp_books)
    //       this.setState({books_list: temp_books})
    //     }
    //   }).catch(err => console.log(err,'error occured'))
          return ( this.fetchbooks(query))
      }
}

export default SearchedItems