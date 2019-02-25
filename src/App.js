import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {  
  const [blogs, setBlogs] = useState([])  
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const username = useField('text')
  const password = useField('password')
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

 
  const handleBlogAdd = (blogs) => {    
    setBlogs(blogs)
  }

  const userName = username.value
  const passWord = password.value
  console.log(username)
  console.log(password)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username.value, password.value)
    try {
      var user = await loginService.login({
        username, password,        
      })

      console.log(`haloo ${username}`)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      
      console.log(username)
      console.log(password)
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')    
  }
  
  if (user === null) {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username.value}
          password={password.value}
          handleUsernameChange={username.onChange}
          handlePasswordChange={password.onChange}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }
  return (
    <div> 
      {errorMessage}     
      <h2>blogs</h2>
      <button onClick={handleLogOut}>logout</button>
      <h2>create new</h2>
      <CreateBlog blogs={blogs} handleBlogAdd={handleBlogAdd}/>
      
      <h3>{user.username} logged in</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App