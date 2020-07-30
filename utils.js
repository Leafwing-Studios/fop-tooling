const titleCase = (str) => str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

module.exports = {
	titleCase,
}
