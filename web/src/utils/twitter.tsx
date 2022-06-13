import { useEffect, useState } from 'react'

export const useFetchTwitter = (twitterProfile) => {
  const [twitter, setTwitter] = useState(null)

  useEffect(() => {
    fetch(`${window.location.origin}/.redwood/functions/twitter`, {
      method: 'POST',
      body: JSON.stringify({ twitter: twitterProfile }),
    })
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json()
      })
      .then(function (data) {
        setTwitter(data.data.resultAwaited.data)
      })
  }, [twitterProfile])

  return twitter
}
export const useFetchTwitterMultiple = (twitterProfileMany) => {
  const [twitter, setTwitter] = useState(null)

  useEffect(() => {
    twitterProfileMany.forEach((twitterProfile) => {
      console.log('twitterProfile', twitterProfile)
      fetch(`${window.location.origin}/.redwood/functions/twitter`, {
        method: 'POST',
        body: JSON.stringify({ twitter: twitterProfile.twitter }),
      })
        .then(function (response) {
          // The response is a Response instance.
          // You parse the data into a useable format using `.json()`
          return response.json()
        })
        .then(function (data) {
          // setTwitter(data.data.resultAwaited.data)
          console.log('data', data)
          setTwitter((prevState) => {
            return [
              prevState || data.data.resultAwaited.data,
              data.data.resultAwaited.data,
            ]
          })
        })
    })
  }, [twitterProfileMany])

  console.log('twitter', twitter)

  return twitter
}

export const useFetchTwitterMultipleQuests = (twitterProfileManyQuests) => {
  const [twitter, setTwitter] = useState(null)

  useEffect(() => {
    twitterProfileManyQuests.forEach((twitterProfileMany) => {
      twitterProfileMany.heros.forEach((twitterProfile) => {
        fetch(`${window.location.origin}/.redwood/functions/twitter`, {
          method: 'POST',
          body: JSON.stringify({ twitter: twitterProfile.twitter }),
        })
          .then(function (response) {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            return response.json()
          })
          .then(function (data) {
            // setTwitter(data.data.resultAwaited.data)
            setTwitter((prevState) => {
              return [{ ...prevState, ...data.data.resultAwaited.data }]
            })
          })
      })
    })
  }, [twitterProfileManyQuests])

  return twitter
}
