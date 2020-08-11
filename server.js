const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({message: "Hello from me"})
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))