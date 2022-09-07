const path = require('path')

function shuffle(arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value)
}


function getPairs (mixedData, orderedStudents, history) {
  function positionOf(student) {
    return orderedStudents.indexOf(student)
  }

  const students = [...mixedData]
  const pairs = []
  while(students.length){
    const current = students.shift()
    students.forEach(student => {
      const pairing = {
        a: student,
        b: current,
        weight: history[current][positionOf(student)]
      }
      pairs.push(pairing)
    })
  }
  pairs.sort((a, b) => b.weight - a.weight)
  return pairs
}

function main(cohort, num) {
  const folderPath = path.join(__dirname, cohort)
  const students = require(folderPath + '/students.json')
  const mixedStudents = shuffle(students)
  const history = require(folderPath + '/history.json')
  const orderedPairs = getPairs(mixedStudents, students, history)

  console.log(`we're making ${num} groups for cohort ${cohort}`)
  const groups = []
  for(let i = 0; i < num; i++) {
    groups[i] = []
  }
  const avgGroupSize = Math.floor(students.length / num)
  const bigGroups = students.length % num

  // while (students) {
  // shift a pairing, see if those students present
  // if no, find a low weight, remove from 
  // }
  
  const finalObj = {}
  groups.forEach((g, idx) => finalObj[`Group ${idx + 1}`] = g)
  console.log(finalObj, orderedPairs)
}

module.exports = main
