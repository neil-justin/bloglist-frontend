import { describe, expect, test, vi } from 'vitest'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('<NewBlogForm />', () => {
  test('calls onCreateBlog when a new blog is created', async () => {
    const user = userEvent.setup()
    const mockhandleCreateBlog = vi.fn()

    render(
      <Togglable buttonLabel='new blog'>
        <NewBlogForm
          onCreateBlog={mockhandleCreateBlog}
        />
      </Togglable>
    )

    const blogForm = screen.getByTestId('new-blogform')
    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')

    await user.type(titleInput, 'CSS Stuff I’m Excited After the Last CSSWG Meeting')
    await user.type(authorInput, 'Juan Diego Rodríguez')
    await user.type(urlInput, 'https://css-tricks.com/css-stuff-im-excited-after-the-last-csswg-meeting/')
    fireEvent.submit(blogForm)

    expect(mockhandleCreateBlog).toHaveBeenCalled()
  })
})