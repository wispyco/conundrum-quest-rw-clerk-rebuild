import { render } from '@redwoodjs/testing/web'

import AddHeroToQuestPage from './AddHeroToQuestPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AddHeroToQuestPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddHeroToQuestPage />)
    }).not.toThrow()
  })
})
