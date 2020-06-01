const asx = require('./dist/index')

asx.getListedCompanies()
  .then((companies) => {
    console.log(companies[100])
    console.log(companies[101])
  })