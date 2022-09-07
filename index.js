const createHistory = require('./createHistory')
const generateGroups = require('./generateGroups')

const cohort = process.argv[2]
const cmd = process.argv[3]

switch(cmd) {
  case 'make':
    return generateGroups(cohort, process.argv[4])
  case 'generate':
    return createHistory(cohort)
  default:
    console.log('oops')
}