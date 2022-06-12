import { AuthenticationError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'

/**
 * getCurrentUser returns the user information from the decoded JWT
 *
 * @param decoded - The decoded access token containing user info and JWT claims like `sub`. Note could be null.
 * @param { token, SupportedAuthTypes type } - The access token itself as well as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An object which contains information from the invoker
 * such as headers and cookies, and the context information about the invocation such as IP Address
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the return object only once you've decided they are safe to be seen
 * if someone were to open the Web Inspector in their browser.
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const getCurrentUser = async (
  decoded,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  { token, type },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  { event, context }
) => {
  console.log('decoded', decoded)
  console.log('context', context)

  const userRoles = await db.userRole.findMany({
    where: { user: { uuid: decoded.claim.sub } },
    select: { name: true },
  })

  const roles = userRoles.map((role) => {
    return role.name
  })

  return context.currentUser || { roles: roles, uuid: decoded.claim.sub }
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * and raise an error if they're not.
 *
 * @returns - If the currentUser is authenticated
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
  // Custom implementation of RBAC is required for magicLink
}
