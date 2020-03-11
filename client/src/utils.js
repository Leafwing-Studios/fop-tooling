const onlyUnique = (value, index, self) => (self.indexOf(value) === index);

const stringContains = (s1, s2) => s1.toLowerCase().includes(s2.toLowerCase())

const titleCase = (str) => str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')

export {
  onlyUnique,
  stringContains,
  titleCase,
}
