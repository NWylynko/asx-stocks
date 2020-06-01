# ASXapi

port pyasx over to node with typescript

[![NPM](https://nodei.co/npm/asx-stocks.png)](https://www.npmjs.com/package/asx-stocks)

```javascript
const asx = require('./dist/index')

asx.getListedCompanies()
  .then((companies) => {
    console.log(companies[100])
    console.log(companies[101])
  })

--- output ---

{
  name: 'ALTERITY THERAPEUTICS LIMITED',
  ticker: 'ATH',
  gicsIndustry: 'Pharmaceuticals, Biotechnology & Life Sciences'
}
{
  name: 'ALTERNATIVE INVESTMENT TRUST',
  ticker: 'AIQ',
  gicsIndustry: 'Not Applic'
}

```