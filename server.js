const express = require('express')
const fs=require('fs');
const app = express()
const port = 3000

app.use(express.static('dist'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/getScore', (req, res) => {
  fs.readFile('./scoreData/a' + req.query.size, function (err, data) {
    if (err) {
        return console.error(err);
    }
    res.send(data.toString())
  })
})

app.post('/setScore', (req) => {
  fs.writeFile('./scoreData/a' + req.body.data.size, JSON.stringify(req.body.data.score), function (err) {
    if (err) {
      return console.error(err);
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
