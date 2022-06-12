import { render } from '@redwoodjs/testing/web'

import SignupAdminPage from './SignupAdminPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SignupAdminPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignupAdminPage />)
    }).not.toThrow()
  })
})
