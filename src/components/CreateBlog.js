import React, { useState } from 'react'
import blogService from '../services/blogs'

const [ newTitle, setNewTitle ] = useState('')
const [ newAuthor, setNewAuthor ] = useState('')
const [ newUrl, setNewUrl ] = useState('')

const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
}

const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
}

const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
}

const createBlog = async ( event , next) => { 
    event.preventDefault()
    const blogObject = {
      title: event.newTitle,
      author: event.newAuthor,
      url: event.newUrl
    }

    try {
    await blogService.create(blogObject)
  } catch (exception) {
      next(exception)    
  }  
}

const create = () => {
    return (
        <form onSubmit={createBlog}>
        <div>
          title <input value={newTitle} on Change={handleTitleChange}/>
        </div>
        <div>
          author: <input value={newAuthor} onChange={handleAuthorChange}/>
        </div>
        <div>
          url: <input value={newUrl} onChange={handleUrlChange}/>  
        </div>
        <div>
          <button type="submit">create</button>
        </div>
        </form>
      )
}
export default create