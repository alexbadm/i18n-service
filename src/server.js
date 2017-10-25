const fs = require('fs')
const path = require('path')
const { Client } = require('pg')
const fastify = require('fastify')()
const fastifyStatic = require('fastify-static')
fastify.use(require('cors')())

const client = new Client()
const origin = process.env.ALLOW_ORIGIN
const languages = process.env.LANGUAGES.split(' ')

client.connect().catch(e => {
  console.log('unable to start server:', e.message)
  process.exit(1)
})

const api = {}

api.addModule = async (request, reply) => {
  try {
    const { rows } = await client.query('INSERT INTO module_names (name) VALUES ($1) RETURNING *', [request.body.moduleName])
    reply.type('application/json').code(200)
    return rows[0]
  } catch (e) {
    reply.code(500)
    return { error: e.message }
  }
}

api.addWord = async (request, reply) => {
  // INSERT INTO translations (message_id, lang, value) VALUES (1, 'ru', 'Otmena'), (1, 'en', 'Cancel'), (3, 'en', 'Welcome'), (3, 'ru', 'Dobro pozhalovat'), (5, 'en', 'Login'), (4, 'ru', 'Poka!')
  reply.type('application/json').code(200)
  return { hello: 'addWord' }
}

api.loadAllDictionaries = async (request, reply) => {
  const messages = await client.query({
    name: 'fetch-module-names',
    text: 'SELECT key, name AS modulename, messages.id FROM messages RIGHT JOIN module_names ON module_names.id = module_id'
  })

  const result = messages.rows.reduce((result, message) => {
    if (!result[message.modulename]) {
      result[message.modulename] = { messages: [] }
      languages.forEach(lang => { result[message.modulename][lang] = {} })
    }
    if (message.id && message.key) result[message.modulename].messages.push({ id: message.id, key: message.key })
    return result
  }, {})

  const translations = await client.query({
    name: 'fetch-all-translations',
    text: `SELECT message_id, lang, value, name AS modulename FROM translations
      LEFT JOIN messages ON message_id = messages.id
      LEFT JOIN module_names ON module_id = module_names.id`
  })

  translations.rows.forEach(transl => {
    if (!result[transl.modulename][transl.lang.trim()]) {
      console.log(`[loadAllDictionaries error] database rows has unknown language: "${transl.lang.trim()}". Actual languages: [${languages.join(', ')}]. Skipped some data during the filling of the response`)
      return
    }
    result[transl.modulename][transl.lang.trim()][transl.message_id] = transl.value
  })

  reply.type('application/json').code(200)
  reply.header('Access-Control-Allow-Origin', origin)
  return result
}

api.loadDictionary = async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'loadDictionary' }
}

api.fetchMessages = async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'fetchMessages' }
}

api.fetchTranslations = async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'fetchTranslations' }
}

fastify.post('/api/addModule', api.addModule)
fastify.post('/api/addWord', api.addWord)

fastify.post('/', async (request, reply) => {
  console.log('unknown request:\nheaders', request.headers, '\nbody: ', request.body)
  reply.type('application/json').code(200)
  return request.body
})

fastify.get('/api/loadAllDictionaries', api.loadAllDictionaries)
fastify.get('/api/loadDictionary', api.loadDictionary)
fastify.get('/api/fetchMessages', api.fetchMessages)
fastify.get('/api/fetchTranslations', api.fetchTranslations)

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
