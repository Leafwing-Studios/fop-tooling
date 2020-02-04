const onlyUnique = (value, index, self) => (self.indexOf(value) === index);

const stringContains = (s1, s2) => s1.toLowerCase().includes(s2.toLowerCase())

export {
  onlyUnique,
  stringContains
}
