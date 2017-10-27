const Api = require('./serverApi')
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')
const fastify = require('fastify')()
const fastifyStatic = require('fastify-static')
fastify.use(require('cors')())

const client = new Client()
// const origin = process.env.ALLOW_ORIGIN

client.connect().then(() => console.log('pg database connected')).catch(e => {
  console.log('unable to start server:', e.message)
  process.exit(1)
})

const api = new Api(client, process.env.LANGUAGES.split(' '))
fastify.post('/api/addModule', api.addModule)
fastify.post('/api/addWordOrReplace', api.addWordOrReplace)
fastify.post('/', unknownPost)

fastify.get('/api/loadAllDictionaries', api.loadAllDictionaries)
fastify.get('/api/loadDictionary', api.loadDictionary)
fastify.get('/api/fetchMessages', api.fetchMessages)
fastify.get('/api/fetchTranslations', api.fetchTranslations)
fastify.get('/api/:moduleName', api.loadMessages)
fastify.get('/api/:moduleName/:language', api.loadTranslation)

const buildPath = path.resolve(__dirname, '..', 'build')
const indexFilePath = path.join(buildPath, 'index.html')
fs.existsSync(buildPath) && fastify.register(fastifyStatic, {
  root: buildPath,
  page404Path: indexFilePath
})

fastify.listen(process.env.PORT || 3000, function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})

async function unknownPost (request, reply) {
  console.log('unknown request:\nheaders', request.headers, '\nbody: ', request.body)
  reply.type('application/json').code(200)
  return request.body
}
