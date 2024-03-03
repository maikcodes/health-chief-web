import Cookies from 'universal-cookie'
const cookies = new Cookies()
const token = cookies.get('token')

export async function get (url) {
  try {
    console.log('fetching data')
    const response = await fetch(url, {
      headers: {
        Authorization: `bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get data.')
    }

    return response.json()
  } catch (error) {
    throw new Error('Error while trying to get data. Please try again later.')
  }
}

export async function post (url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to create a new element.')
    }

    return response.json()
  } catch (error) {
    throw new Error(
      'Error while trying to create a new element. Please try again later.'
    )
  }
}

export async function put (url, data) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to update the element.')
    }

    return response.json()
  } catch (error) {
    throw new Error(
      'Error while trying to update the element. Please try again later.'
    )
  }
}

export async function del (url) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to delete the element.')
    }

    return response.json()
  } catch (error) {
    throw new Error(
      'Error while trying to delete the element. Please try again later.'
    )
  }
}
