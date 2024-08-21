import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import BlogTitle from './BlogTitle'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

describe.skip('<BlogTitle />', () => {
  const blog = {
    title: 'Managing User Focus with :focus-visible',
    author: 'Chris DeMars',
    url: 'https://css-tricks.com/managing-user-focus-with-focus-visible/',
    likes: 12,
  }
  // passing these mock function prevent prop type warning
  let mockHandleBlogUpdate
  let mockhandleBlogRemoval
  let container

  beforeEach(() => {
    mockHandleBlogUpdate = vi.fn()
    mockhandleBlogRemoval = vi.fn()
    container = render(
      <BlogTitle
        blog={blog}
        onBlogUpdate={mockHandleBlogUpdate}
        onBlogRemoval={mockhandleBlogRemoval}
      />,
    )
  })

  afterEach(async () => {
    vi.restoreAllMocks()
  })

  test('renders only the blog\'s title and author', () => {
    const element = screen.getByText(
      'Managing User Focus with :focus-visible Chris DeMars',
    )
    expect(element).toBeDefined()
  })

  test('renders blog\'s url and number of likes also when \'view\' button is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const blogCardElement = screen.getByTestId('blog-card')

    screen.debug()
    expect(blogCardElement).toHaveTextContent(
      'https://css-tricks.com/managing-user-focus-with-focus-visible/',
    )
    expect(blogCardElement).toHaveTextContent('likes ')
  })

  test('calls onBlogUpdate twice if \'like\' button is called twice', async () => {
    vi.spyOn(axios, 'put')
      .mockResolvedValueOnce({ data: { ...blog, likes: blog.likes + 1 } })
      .mockResolvedValueOnce({ data: { ...blog, likes: blog.likes + 2 } })

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleBlogUpdate.mock.calls).toHaveLength(2)
  })
})
