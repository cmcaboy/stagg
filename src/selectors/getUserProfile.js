export default (id,matches) => {
  return matches.filter(match => match.id === id)[0]
}