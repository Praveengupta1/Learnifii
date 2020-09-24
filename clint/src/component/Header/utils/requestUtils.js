const defaultHeaders = {
  'content-type': 'application/json',
}

const request = async (url, method, options = {}, body) => {
  const headers = options.headers
    ? { ...options.headers, defaultHeaders }
    : defaultHeaders
  const reqObj = { method, headers }
  if (body) {
    reqObj.body = JSON.stringify(body)
  }
  try {
    const req = await fetch(url, reqObj)
    const response = await req.json()
    return response
  } catch (e) {
    throw new Error(e)
  }
}

export const get = (url, options) => request(url, 'GET', options)

export const post = (url, body, options) => request(url, 'POST', options, body)

export const put = (url, body, options) => request(url, 'PUT', options, body)

export const patch = (url, body, options) =>
  request(url, 'PATCH', options, body)

export const del = (url, options) => request(url, 'DELETE', options)
