const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, next) => {
    return favorite.likes >= next.likes ? favorite : next
  }

  const favorite = blogs.reduce(reducer, {})

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  // Count how many blogs each author has written
  const blogCountList = blogs.reduce((list, next) => {
    const author = list.find((a) => a.author === next.author)
    author ? author.blogs++ : list.push({ author: next.author, blogs: 1 })
    return list
  }, [])

  return blogCountList.reduce((most, next) => {
    return most.blogs >= next.blogs ? most : next
  }, {})
}

const mostLikes = (blogs) => {
  // Count how many blogs each author has written
  const blogCountList = blogs.reduce((list, next) => {
    const author = list.find((a) => a.author === next.author)
    author
      ? (author.likes += next.likes)
      : list.push({ author: next.author, likes: next.likes })
    return list
  }, [])

  return blogCountList.reduce((most, next) => {
    return most.likes >= next.likes ? most : next
  }, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
