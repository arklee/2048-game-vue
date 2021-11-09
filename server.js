const express = require('express')
const fs=require('fs');
const app = express()
const port = 3000

app.use(express.static('dist'))

app.get('/getScore', (req, res) => {
  fs.readFile('./scoreData/a' + req.query.size, function (err, data) {
    if (err) {
        return console.error(err);
    }
    res.send(data.toString())
  })
})

app.get('/setScore', (req) => {
  fs.writeFile('./scoreData/a' + req.query.size, JSON.stringify(req.query.score), function (err) {
    if (err) {
      return console.error(err);
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
