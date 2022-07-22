const express = require('express')
const app = express()
const port = 3000
app.use('/css',express.static(__dirname + '/css'))
app.use('/js',express.static(__dirname + '/js'))
app.use('/images',express.static(__dirname + '/images'))
app.use('/api',express.static(__dirname + '/api'))

app.get('',  (req,res) => {
    res.sendFile(__dirname+'/index.html')
})
app.listen( port, () => {
 console.log(`Server running at http://localhost:${port}/`);
})