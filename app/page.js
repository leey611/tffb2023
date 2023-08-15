import './globals.css'
import './style.scss'
import HomeView from '../components/HomeView'

export default async function Page() {
  return (
    <>
      <HomeView language={'en'} />
    </>
  )
}
