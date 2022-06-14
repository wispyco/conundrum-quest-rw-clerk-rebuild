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
  const [twitter, setTwitter] = useState([])

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
            return [...prevState, data.data.resultAwaited.data]
          })
        })
    })
  }, [twitterProfileMany])

  console.log('twitter', twitter)

  return twitter
}

export const useFetchTwitterMultipleQuests2 = (twitterProfileManyQuests) => {
  const [twitter, setTwitter] = useState([])
  const [twitterByQuest, setTwitterByQuest] = useState([])

  useEffect(() => {
    twitterProfileManyQuests.forEach((twitterProfileMany, index1) => {
      // if (index1 > 1) {
      //   return false
      // }

      twitterProfileMany.heros.forEach((twitterProfile, index) => {
        // if (index > twitterProfileMany.heros.length - 1) {
        //   return false
        // }

        // if (index < twitterProfileMany.heros.length) {
        console.log('index', index)
        console.log(
          'twitterProfileMany.heros.length',
          twitterProfileMany.heros.length
        )
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
              return [...prevState, data.data.resultAwaited.data]
            })
          })
        // }

        // return true
      })

      setTwitterByQuest((prevState) => {
        return [...prevState, twitter]
      })
      // return true
    })
  }, [twitterProfileManyQuests])

  return twitterByQuest
}

export const useFetchTwitterMultipleQuests = (twitterProfileManyQuests) => {
  const [twitter, setTwitter] = useState([])

  useEffect(() => {
    twitterProfileManyQuests.forEach(async (twitterProfileMany, i) => {
      const woop = twitterProfileMany.heros.map(async (twitterProfile) => {
        const test = fetch(
          `${window.location.origin}/.redwood/functions/twitter`,
          {
            method: 'POST',
            body: JSON.stringify({ twitter: twitterProfile.twitter }),
          }
        )
          .then(function (response) {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            console.log('test')
            return response.json()
          })
          .then(function (data) {
            return data.data.resultAwaited.data
          })

        const go = await test

        return go
      })

      const june = await Promise.all(woop)

      setTwitter((prevState) => {
        return [...prevState, june]
      })
    })
  }, [twitterProfileManyQuests])

  const reversedTwitter = twitter.reverse()

  return reversedTwitter
}
