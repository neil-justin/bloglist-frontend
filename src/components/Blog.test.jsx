import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders only the blog\'s title and author', () => {
    const blog = {
      title: 'Managing User Focus with :focus-visible',
      author: 'Chris DeMars',
      url: 'https://css-tricks.com/managing-user-focus-with-focus-visible/',
      likes: 12
    }

    // passing these mock function prevents prop type warning
    const mockHandleBlogUpdate = vi.fn()
    const mockhandleBlogRemoval = vi.fn()

    render(<Blog
      blog={blog}
      onBlogUpdate={mockHandleBlogUpdate}
      onBlogRemoval={mockhandleBlogRemoval}
    />)

    const element = screen.getByText('Managing User Focus with :focus-visible Chris DeMars')
    expect(element).toBeDefined()
  })
})