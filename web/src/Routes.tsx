// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'
import HeroesLayout from 'src/layouts/HeroesLayout'
import AmbassadorProfilesLayout from 'src/layouts/AmbassadorProfilesLayout'
import QuestsLayout from 'src/layouts/QuestsLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import { useAuth } from '@redwoodjs/auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/" name="home" page={HomePage} />
      <Set wrap={HeroesLayout}>
        <Route path="/heroes/new" page={HeroNewHeroPage} name="newHero" />
        <Route path="/heroes/{id:Int}/edit" page={HeroEditHeroPage} name="editHero" />
        <Route path="/heroes/{id:Int}" page={HeroHeroPage} name="hero" />
        <Route path="/heroes" page={HeroHeroesPage} name="heroes" />
      </Set>
      <Set wrap={AmbassadorProfilesLayout}>
        <Route path="/ambassador-profiles/new" page={AmbassadorProfileNewAmbassadorProfilePage} name="newAmbassadorProfile" />
        <Route path="/ambassador-profiles/{id:Int}/edit" page={AmbassadorProfileEditAmbassadorProfilePage} name="editAmbassadorProfile" />
        <Route path="/ambassador-profiles/{id:Int}" page={AmbassadorProfileAmbassadorProfilePage} name="ambassadorProfile" />
        <Route path="/ambassador-profiles" page={AmbassadorProfileAmbassadorProfilesPage} name="ambassadorProfiles" />
      </Set>
      <Set wrap={QuestsLayout}>
        <Route path="/quests/new" page={QuestNewQuestPage} name="newQuest" />
        <Route path="/quests/{id:Int}/edit" page={QuestEditQuestPage} name="editQuest" />
        <Route path="/quests/{id:Int}" page={QuestQuestPage} name="quest" />
        <Route path="/quests" page={QuestQuestsPage} name="quests" />
      </Set>
      <Set wrap={UsersLayout}>
        <Private unauthenticated="home" roles="admin">
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        </Private>
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
