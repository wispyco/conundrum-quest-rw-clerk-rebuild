// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import AmbassadorProfilesLayout from 'src/layouts/AmbassadorProfilesLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import QuestsLayout from 'src/layouts/QuestsLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={AmbassadorProfilesLayout}>
        <Route path="/ambassador-profiles/new" page={AmbassadorProfileNewAmbassadorProfilePage} name="newAmbassadorProfile" />
        <Route path="/ambassador-profiles/{id:Int}/edit" page={AmbassadorProfileEditAmbassadorProfilePage} name="editAmbassadorProfile" />
        <Route path="/ambassador-profiles/{id:Int}" page={AmbassadorProfileAmbassadorProfilePage} name="ambassadorProfile" />
        <Route path="/ambassador-profiles" page={AmbassadorProfileAmbassadorProfilesPage} name="ambassadorProfiles" />
      </Set>
      <Set wrap={UsersLayout}>
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={QuestsLayout}>
        <Route path="/quests/new" page={QuestNewQuestPage} name="newQuest" />
        <Route path="/quests/{id:Int}/edit" page={QuestEditQuestPage} name="editQuest" />
        <Route path="/quests/{id:Int}" page={QuestQuestPage} name="quest" />
        <Route path="/quests" page={QuestQuestsPage} name="quests" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
