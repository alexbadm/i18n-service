const API_URL = process.env.REACT_APP_API_URL
const functionNotImplemented = () => { throw new Error('not implemented') }

const apiInterface = {
  addModule: functionNotImplemented,
  addWord: functionNotImplemented,
  loadAllDictionaries: functionNotImplemented,
  loadDictionary: functionNotImplemented,
  fetchMessages: functionNotImplemented,
  fetchTranslations: functionNotImplemented,
  url: API_URL
}

const api = Object.create(apiInterface)

api.addModule = function (payload) {
  return window.fetch(this.url + '/addModule', {
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'POST',
    mode: 'cors'
  })
}

api.addWord = async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'addWord' }
}

api.loadAllDictionaries = function () {
  return window.fetch(this.url + '/loadAllDictionaries')
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

export default api
