import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogTitle = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
  )
}

BlogTitle.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogTitle
