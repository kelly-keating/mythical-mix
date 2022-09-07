const students = 'Amy Ash MattT Paris Tony Brendan Jeff Kris Pei Yani Chloe Jordan MattE Ryan Tomas Eamonn Kat Ming River Tyrone Zin'

let names = students.split(' ')

const arr = []

while (names.length) {
  const idx = Math.floor(Math.random() * names.length)
  const n = names.splice(idx, 1)[0]
  arr.push(n)
}

const teamNames = 'hufflepuff ravenclaw gryffindor slytherin'.split(' ')
const teams = {}

teamNames.forEach(name => {
  teams[name] = []
})

arr.forEach((name, i) => {
  const teamName = teamNames[i % teamNames.length]
  teams[teamName].push(name)
})

console.log(JSON.stringify(teams, null, 2))
