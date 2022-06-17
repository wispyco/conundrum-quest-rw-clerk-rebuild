import { fetch } from 'cross-undici-fetch'

export const getTwitter = async ({ username }) => {
  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  )

  const json = await response.json()

  return {
    name: json.data.name,
    username: username,
    id: json.data.id,
    profile_image_url: json.data.profile_image_url,
  }
}
