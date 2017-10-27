function api (dbClient, languages) {
  // this.dbClient = dbClient

  this.addModule = async (request, reply) => {
    try {
      const { rows } = await dbClient.query('INSERT INTO module_names (name) VALUES ($1) RETURNING *', [request.body.moduleName])
      reply.type('application/json').code(200)
      return rows[0]
    } catch (e) {
      reply.code(500)
      return { error: e.message }
    }
  }

  this.addWordOrReplace = async (request, reply) => {
    // console.log('addWordOrReplace body: ', request.body)

    const { language, moduleName, key, translation } = request.body
    const moduleIdResult = await dbClient.query('SELECT id FROM module_names WHERE name=$1', [moduleName])
    const moduleId = moduleIdResult.rows[0].id
    // console.log('moduleId is ', moduleId)

    const messageIdResult = await dbClient.query(`INSERT INTO messages (module_id, key)
      VALUES ($1, $2)
      ON CONFLICT (module_id, key) DO UPDATE
        SET key = excluded.key
      RETURNING id`, [moduleId, key])
    const messageId = messageIdResult.rows[0].id
    // console.log('messageId is ', messageId)

    const translationResult = await dbClient.query(`INSERT INTO translations (message_id, lang, value)
      VALUES ($1, $2, $3)
      ON CONFLICT (message_id, lang) DO UPDATE
        SET value = excluded.value
      RETURNING *`, [messageId, language, translation])
    const result = translationResult.rows[0]
    // console.log('result ', result)

    reply.type('application/json').code(200)
    return Object.assign({}, result, { lang: result.lang.trim() })
  }

  this.loadAllDictionaries = async (request, reply) => {
    const messages = await dbClient.query({
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

    const translations = await dbClient.query({
      name: 'fetch-all-translations',
      text: `SELECT message_id, lang, value, name AS modulename FROM translations
        LEFT JOIN messages ON message_id = messages.id
        INNER JOIN module_names ON module_id = module_names.id`
    })

    translations.rows.forEach(transl => {
      if (!result[transl.modulename][transl.lang.trim()]) {
        console.log(`[loadAllDictionaries error] database rows has unknown language: "${transl.lang.trim()}". Actual languages: [${languages.join(', ')}]. Skipped some data during the filling of the response`)
        return
      }
      result[transl.modulename][transl.lang.trim()][transl.message_id] = transl.value
    })

    reply.type('application/json').code(200)
    // reply.header('Access-Control-Allow-Origin', origin)
    return result
  }

  this.loadDictionary = async (request, reply) => {
    reply.type('application/json').code(200)
    return { notImplementedMethod: 'loadDictionary' }
  }

  this.fetchMessages = async (request, reply) => {
    reply.type('application/json').code(200)
    return { notImplementedMethod: 'fetchMessages' }
  }

  this.fetchTranslations = async (request, reply) => {
    reply.type('application/json').code(200)
    return { notImplementedMethod: 'fetchTranslations' }
  }

  // loadMessages used for give all messages for given module
  this.loadMessages = async (request, reply) => {
    const { moduleName } = request.params
    const messagesResult = await dbClient.query(`SELECT id, key, value
      FROM messages LEFT JOIN translations ON message_id=id AND lang='en'
      WHERE module_id=(SELECT id FROM module_names WHERE name=$1)`, [moduleName])
    return messagesResult.rows.reduce((result, { id, key, value: defaultMessage }) => {
      result[key] = { id, defaultMessage }
      return result
    }, {})
  }

  // loadMessages used for give all translations for given module and language
  this.loadTranslation = async (request, reply) => {
    const { moduleName, language } = request.params
    const messagesResult = await dbClient.query(`SELECT id, value
      FROM messages LEFT JOIN translations ON message_id=id AND lang=$2
      WHERE module_id=(SELECT id FROM module_names WHERE name=$1)`, [moduleName, language])
    return messagesResult.rows.reduce((result, { id, value }) => {
      result[id] = value
      return result
    }, {})
  }
}

module.exports = api
