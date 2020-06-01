const asx = require('./dist/index')

const demo = async () => {
  let n = 1

  let companies = await asx.getListedCompanies()
  console.log(companies[n])

  let companyInfo = await asx.getCompanyInfo(companies[n].ticker)
  console.log(companyInfo)
  console.log(companyInfo.primaryShare.securityInfo)

  let announcements = await asx.getCompanyAnnouncements(companies[n].ticker)
  console.log(announcements)

  let securities = await asx.getListedSecurities()
  console.log(securities)
  
  let SecurityInfo = await asx.getSecurityInfo(companies[n].ticker)
  console.log(SecurityInfo)
}

demo();