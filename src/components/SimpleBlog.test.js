import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  
  const blogObject = {
    title: 'titteli',
    author: 'kirjoittaja',
    url: 'urli',
    likes: 30
  }

  const firstComponent = render(
    <SimpleBlog  blog={blogObject}/>
  )

  expect(firstComponent.container).toHaveTextContent(
    'titteli kirjoittajablog has 30 likes'
  )
})

test('clicking like twice calls event handler twice', async () => {
  const blogObject = {
    title: 'titteli',
    author: 'kirjoittaja',
    url: 'urli',
    likes: 30
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blogObject} onClick={mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)  

  expect(mockHandler.mock.calls.length).toBe(2)
})