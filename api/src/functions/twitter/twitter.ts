import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
const request = require('request')

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
  const result = await sendToApi(event)

  const resultAwaited = await JSON.parse(result)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      data: { resultAwaited },
    },
  }
}

const sendToApi = function (event) {
  return new Promise((resolve) => {
    logger.info('Invoked twitter function')

    console.log(
      'process.env.TWITTER_BEARER_TOKEN',
      process.env.TWITTER_BEARER_TOKEN
    )

    const { twitter } = JSON.parse(event.body)

    const options = {
      method: 'GET',
      url: `https://api.twitter.com/2/users/by/username/${twitter}?user.fields=profile_image_url`,
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
      contentType: 'application/json',
    }

    request(options, function (error, response) {
      if (error) throw new Error(error)
      console.log('monkeyboogers', response.body)
      resolve(response.body)
    })
  })
}
