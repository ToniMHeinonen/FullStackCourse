import RepositoryItem from './RepositoryItem'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'

const RepositoryPage = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  if (!repository) return null

  return <RepositoryItem item={repository} showButton />
}

export default RepositoryPage
