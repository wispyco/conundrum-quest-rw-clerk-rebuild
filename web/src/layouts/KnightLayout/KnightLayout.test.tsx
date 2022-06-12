import { render } from '@redwoodjs/testing/web'

import KnightLayout from './KnightLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('KnightLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KnightLayout />)
    }).not.toThrow()
  })
})
