import { useAuth } from '@redwoodjs/auth'
import { Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { CREATE_HERO_MUTATION } from 'src/components/Hero/NewHero'
import { UPDATE_HERO_NEW_QUEST_MUTATION } from 'src/components/Quest/NewQuest'
import QuestCell from 'src/components/Quest/QuestCell'
import { jsonPretty } from 'src/utils/json'

const AddHeroToQuestPage = ({ id }) => {
  const [createHero, { loading: loadingHero, error: errorHero }] = useMutation(
    CREATE_HERO_MUTATION,
    {
      onCompleted: () => {
        toast.success('Hero created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [
    updateHeroNewQuest,
    { loading: loadingHeroNewQuest, error: errorHeroNewQuest },
  ] = useMutation(UPDATE_HERO_NEW_QUEST_MUTATION, {
    onCompleted: () => {
      toast.success('Hero Connection Updated')
      navigate(routes.quest({ id: id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { currentUser } = useAuth()

  const onSubmit = async (input) => {
    const castInputHero = {
      name: input.name,
      questId: id,
      twitter: input.twitter,
    }
    const hero = await createHero({ variables: { input: castInputHero } })
    const castInputUpdateHero = {
      questId: id,
    }
    await updateHeroNewQuest({
      variables: { id: hero.data.createHero.id, input: castInputUpdateHero },
    })
  }

  if (loadingHero || loadingHeroNewQuest) {
    return <p>Loading ...</p>
  }

  if (errorHero || errorHeroNewQuest) {
    return (
      <>
        <pre>{JSON.stringify(errorHero, null, 2)}</pre>
        <pre>{JSON.stringify(errorHeroNewQuest, null, 2)}</pre>
      </>
    )
  }

  return (
    <>
      <MetaTags title="AddHeroToQuest" description="AddHeroToQuest page" />

      <h1>AddHeroToQuestPage</h1>
      {jsonPretty(currentUser)}
      <QuestCell create={true} id={id} />
      <Form onSubmit={onSubmit}>
        <Label name="name">Name</Label>
        <TextField name="name" />
        <Label name="twitter">Twitter</Label>
        <TextField name="twitter" />
        <Submit>Add Hero to Quest</Submit>
      </Form>
    </>
  )
}

export default AddHeroToQuestPage
