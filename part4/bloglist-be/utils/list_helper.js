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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}