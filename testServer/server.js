const express = require('express')
const fs=require('fs');
const app = express()
const port = 3000

app.get('/getScore', (req, res) => {
  fs.readFile('./score.json', function (err, data) {
    if (err) {
        return console.error(err);
    }
    let score = JSON.parse(data.toString())
    res.send(score['a' + req.query.size])
  })
})

app.get('/setScore', (req) => {
  fs.readFile('./score.json', function (err, data) {
    if (err) {
        return console.error(err);
    }
    let score = JSON.parse(data.toString())
    score['a' + req.query.size] = req.query.score
    fs.writeFile('./score.json', JSON.stringify(score), function (err, data) {
      if (err) {
        return console.error(err);
      }
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})