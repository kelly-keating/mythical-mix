const fs = require('fs')
const path = require('path')

function main(cohort) {
  const folderPath = path.join(__dirname, 'cohorts', cohort)
  const utilFiles = ['students.json', 'history.json'] 
  const students = require(folderPath + '/students.json')

  function positionOf(student) {
    return students.indexOf(student)
  }

  let weeks = fs.readdirSync(folderPath)
  weeks = weeks.filter(f => !utilFiles.includes(f))
  weeks = weeks.map(f => Object.values(require(folderPath + '/' + f)))

  const obj = {}

  students.forEach((student) => {
    obj[student] = new Array(students.length).fill(0)
    obj[student][positionOf(student)] = null

    weeks.forEach((week) => {
      const theirGroup = week.find(group => group.includes(student))

      if(theirGroup) {
        theirGroup.forEach(teamMember => {
          if (teamMember === student) return

          const teamIndex = positionOf(teamMember)
          if (teamIndex !== -1) obj[student][teamIndex]++
        })
      }
    })
  })

  fs.writeFileSync(folderPath + '/history.json', JSON.stringify(obj, null, 2))
}

module.exports = main
