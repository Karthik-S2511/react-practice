import React, { useState, useEffect } from 'react'

function BookList() {
 const [books, setBooks] = useState([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)
 const [newBook, setNewBook] = useState({
  title: '',
  author: '',
  publishedYear: '',
 })

 useEffect(() => {
  // Fetch data from the REST API
  fetch('http://localhost:3001/books')
   .then((response) => response.json())
   .then((data) => {
    setBooks(data)
    setLoading(false)
   })
   .catch((error) => {
    setError(error.message)
    setLoading(false)
   })
 }, [])

 const addBook = () => {
  fetch('http://localhost:3001/books', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify(newBook),
  })
   .then((response) => response.json())
   .then((data) => {
    setBooks([...books, data])
    setNewBook({ title: '', author: '', publishedYear: '' })
   })
   .catch((error) => setError(error.message))
 }

 const updateBook = (id, updatedBook) => {
  fetch(`http://localhost:3001/books/${id}`, {
   method: 'PUT',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify(updatedBook),
  })
   .then((response) => response.json())
   .then((data) => {
    setBooks(books.map((book) => (book.id === id ? data : book)))
   })
   .catch((error) => setError(error.message))
 }

 const deleteBook = (id) => {
  fetch(`http://localhost:3001/books/${id}`, {
   method: 'DELETE',
  })
   .then(() => {
    setBooks(books.filter((book) => book.id !== id))
   })
   .catch((error) => setError(error.message))
 }

 if (loading) return <div>Loading...</div>
 if (error) return <div>Error: {error}</div>

 return (
  <div>
   <h1>Book List</h1>
   <ul>
    {books.map((book) => (
     <li key={book.id}>
      <strong>{book.title}</strong> by {book.author} (Published:{' '}
      {book.publishedYear})
      <button
       onClick={() => updateBook(book.id, { ...book, title: 'Updated Title' })}
      >
       Update
      </button>
      <button onClick={() => deleteBook(book.id)}>Delete</button>
     </li>
    ))}
   </ul>
   <h2>Add a New Book</h2>
   <input
    type='text'
    placeholder='Title'
    value={newBook.title}
    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
   />
   <input
    type='text'
    placeholder='Author'
    value={newBook.author}
    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
   />
   <input
    type='number'
    placeholder='Published Year'
    value={newBook.publishedYear}
    onChange={(e) => setNewBook({ ...newBook, publishedYear: e.target.value })}
   />
   <button onClick={addBook}>Add Book</button>
  </div>
 )
}

export default BookList
