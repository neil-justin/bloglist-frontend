import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  // passing these mock function prevent prop type warning
  const mockHandleBlogUpdate = vi.fn()
  const mockhandleBlogRemoval = vi.fn()
  const blog = {
    title: 'Managing User Focus with :focus-visible',
    author: 'Chris DeMars',
    url: 'https://css-tricks.com/managing-user-focus-with-focus-visible/',
    likes: 12
  }
  let container

  beforeEach(() => {
    container = render(<Blog
      blog={blog}
      onBlogUpdate={mockHandleBlogUpdate}
      onBlogRemoval={mockhandleBlogRemoval}
    />)
  })

  test('renders only the blog\'s title and author', () => {
    const element = screen.getByText('Managing User Focus with :focus-visible Chris DeMars')
    expect(element).toBeDefined()
  })

  test('renders blog\'s url and number of likes also when \'view\' button is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const blogCardElement = screen.getByTestId('blog-card')

    screen.debug()
    expect(blogCardElement).toHaveTextContent('https://css-tricks.com/managing-user-focus-with-focus-visible/')
    expect(blogCardElement).toHaveTextContent('likes ')
  })
})