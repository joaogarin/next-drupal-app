const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('/recipe/:slug', (req, res) => {
            // I coulde have a generic get for :slug and check via graphql here 
            // the entity associated and map to the component, however for consistency its good to rely on 
            // specific paths for some content types like jobs / recipes etc and landing pages allow more control over routing..
            const actualPage = '/recipe'
            const queryParams = { slug: req.params.slug }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })