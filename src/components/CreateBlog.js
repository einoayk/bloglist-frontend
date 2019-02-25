import React, { useState } from 'react'
import blogService from '../services/blogs'
import App from '../App'

const CreateBlog = (props) => {
  const { blogs, handleBlogAdd } = props

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

  const createBlog = async ( event) => { 
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      await blogService.create(blogObject)
      
      const newBlogs = blogs.concat(blogObject)
      handleBlogAdd(newBlogs)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      
    } catch (exception) {
      App.setErrorMessage('kusee')
    }  
  }
  
  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title <input value={newTitle} onChange={handleTitleChange}/>
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
    </div>      
  )  
}  
export default CreateBlog