const express = require('express')
const app = express()

const PORT = process.env.PORT || 80

app.listen(PORT, () => {
    console.log('ok')
})

app.get('*', (req, res) => {
    res.send('101')
})