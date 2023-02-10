import Head from 'next/head'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Map from '../components/Map'

export default function Home({ nearbyData, liveAnywhereData }) {
  return (
    <div className=''>
      <Head>
        <title>Airbnb Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header placeholder={undefined} />
      {/* <Banner /> */}

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {nearbyData?.map(({ img, location, distance }, i) => (
              <SmallCard
                key={i}
                img={img}
                location={location}
                distance={distance}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {liveAnywhereData?.map(({ img, title }, i) => (
              <MediumCard key={i} img={img} title={title} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const nearbyData = await fetch(
    'https://63445381242c1f347f840116.mockapi.io/placesNearby'
  ).then((res) => res.json())

  const liveAnywhereData = await fetch(
    'https://63445381242c1f347f840116.mockapi.io/liveAnywhere'
  ).then((res) => res.json())

  return {
    props: {
      nearbyData,
      liveAnywhereData,
    },
  }
}
