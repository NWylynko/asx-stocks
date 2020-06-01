# ASXapi

port pyasx over to node with typescript

```javascript
const asx = require('./dist/index')

asx.getListedCompanies()
  .then((companies) => {
    console.log(companies[100])
    console.log(companies[101])
  })

--- output ---

[
  'ALTERITY THERAPEUTICS LIMITED',
  'ATH',
  'Pharmaceuticals, Biotechnology & Life Sciences'
]
[ 'ALTERNATIVE INVESTMENT TRUST', 'AIQ', 'Not Applic' ]

```