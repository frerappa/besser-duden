import app from './server.js'

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

// axios.get("https://www.duden.de/rechtschreibung/Schummelsoftware").then(console.log).catch(console.error)
