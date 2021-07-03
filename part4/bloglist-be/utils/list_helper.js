const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0)
    return 0

  let total = blogs.reduce((accumulator, currentValue) => {return accumulator + currentValue.likes}, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return null

  if (blogs.length === 1)
    return blogs[0]

  let favorite = blogs.reduce((max, current) => {
   return max.likes > current.likes ? max : current
  }, blogs[0])

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return null
    
  if (blogs.length === 1)
    return { author: blogs[0].author, blogs: 1 }

  let authors = []
  let blogsCount = []
  let mostBlogsIndex = 0
  let mostBlogsCount = 0
  blogs.forEach(blog => {
    if (authors.includes(blog.author)) {
      const curAuthor = authors.indexOf(blog.author)
      blogsCount[curAuthor] += 1
      
      if (blogsCount[curAuthor] > mostBlogsCount) {
        mostBlogsCount = blogsCount[curAuthor]
        mostBlogsIndex = curAuthor
      }
    }
    else {
      authors = authors.concat(blog.author)
      blogsCount = blogsCount.concat(1)
    }
  })

  return { author: authors[mostBlogsIndex], blogs: mostBlogsCount }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return null
    
  if (blogs.length === 1)
    return { author: blogs[0].author, likes: blogs[0].likes }

  let authors = []
  let likesCount = []
  let mostLikesIndex = 0
  let mostLikesCount = 0
  blogs.forEach(blog => {
    if (authors.includes(blog.author)) {
      const curAuthor = authors.indexOf(blog.author)
      likesCount[curAuthor] += blog.likes
      
      if (likesCount[curAuthor] > mostLikesCount) {
        mostLikesCount = likesCount[curAuthor]
        mostLikesIndex = curAuthor
      }
    }
    else {
      authors = authors.concat(blog.author)
      likesCount = likesCount.concat(blog.likes)
    }
  })

  return { author: authors[mostLikesIndex], likes: mostLikesCount }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}