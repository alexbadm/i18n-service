const fastify = require('fastify')()
const { Client } = require('pg')
const client = new Client()
const origin = process.env.ALLOW_ORIGIN
const languages = process.env.LANGUAGES.split(' ')

fastify.use(require('cors')())

async function dbConnect () {
  try {
    await client.connect()
    return true
  } catch (e) {
    console.log('db connection error:', e.message)
    return false
  }
}

const api = {}

api.addModule = async (request, reply) => {
  console.log('request body', request.body)
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

// const opts = {
//   schema: {
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           hello: { type: 'string' }
//         }
//       }
//     }
//   }
// }

// fastify.get('/', opts, async (request, reply) => {
//   // reply.type('application/json').code(200)
//   return { hello: 'world' }
// })

fastify.post('/addModule', api.addModule)
fastify.post('/addWord', api.addWord)
fastify.get('/loadAllDictionaries', api.loadAllDictionaries)
fastify.get('/loadDictionary', api.loadDictionary)
fastify.get('/fetchMessages', api.fetchMessages)
fastify.get('/fetchTranslations', api.fetchTranslations)

fastify.post('/', async (request, reply) => {
  console.log('unknown request', request)
  reply.type('application/json').code(200)
  return request.body
})

dbConnect() && fastify.listen(3000, function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
