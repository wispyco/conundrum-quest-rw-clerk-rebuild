import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import QuestForm from 'src/components/Quest/QuestForm'
import { CREATE_HERO_MUTATION } from 'src/components/Hero/NewHero'
import { useAuth } from '@redwoodjs/auth'

const CREATE_QUEST_MUTATION = gql`
  mutation CreateQuestMutation($input: CreateQuestInput!) {
    createQuest(input: $input) {
      id
    }
  }
`

export const UPDATE_HERO_NEW_QUEST_MUTATION = gql`
  mutation UpdateHeroNewQuestMutation($input: UpdateHeroInput!, $id: Int!) {
    updateHero(id: $id, input: $input) {
      id
    }
  }
`

const NewQuest = () => {
  const [createQuest, { loading, error }] = useMutation(CREATE_QUEST_MUTATION, {
    onCompleted: () => {
      toast.success('Quest created')
      navigate(routes.quests())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [createHero, { loading: loadingHero, error: errorHero }] = useMutation(
    CREATE_HERO_MUTATION,
    {
      onCompleted: () => {
        toast.success('Hero created')
        navigate(routes.heroes())
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
      navigate(routes.heroes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { currentUser } = useAuth()

  const onSave = async (input) => {
    const castInput = {
      name: input.name,
      userId: currentUser.user.id,
    }
    const quest = await createQuest({ variables: { input: castInput } })
    const castInputHero = {
      name: input.heroName,
      questId: quest.data.createQuest.id,
      twitter: input.twitter,
    }
    const hero = await createHero({ variables: { input: castInputHero } })
    const castInputUpdateHero = {
      questId: quest.data.createQuest.id,
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
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Quest</h2>
      </header>
      <div className="rw-segment-main">
        <QuestForm onSave={onSave} loading={loading} error={error} />
      </div>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  )
}

export default NewQuest
