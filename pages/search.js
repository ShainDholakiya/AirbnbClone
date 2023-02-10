import React from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import Header from '../components/Header'
import InfoCard from '../components/InfoCard'
import Map from '../components/Map'

const Search = ({ searchResults }) => {
  const router = useRouter()
  const { location, startDate, endDate, noOfGuests } = router.query
  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy')
  const range = `${formattedStartDate} - ${formattedEndDate}`

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ Stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stays in {location}
          </h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of Place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More Filters</p>
          </div>

          <div className='flex flex-col'>
            {searchResults?.map(
              (
                { img, location, title, description, star, price, total },
                i
              ) => (
                <InfoCard
                  key={i}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className='hiddem xl:inline-flex xl:min-w-[600px] cursor-grab'>
          <Map searchResults={searchResults} />
        </section>
      </main>
    </div>
  )
}

export default Search

export const getServerSideProps = async () => {
  const searchResults = await fetch(
    'https://63445381242c1f347f840116.mockapi.io/listings'
  ).then((res) => res.json())

  return {
    props: {
      searchResults,
    },
  }
}
