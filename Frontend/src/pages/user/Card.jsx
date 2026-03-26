import CardList from "../../components/user/CardList"
import Filter from "../../components/user/Filter"


function Card() {

  return (
    <>
      <div>
        <div className="drawer lg:drawer-open bg-base-200">
          <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

          <main className="drawer-content flex flex-col p-4 ">
            <header className="flex justify-between items-center ml-2 mt-1">
              <h1 className="text-3xl font-bold">OnePiece Card Game</h1>
            </header>
            <div className='flex gap-2'>

              <CardList />

            </div>
          </main>

          <Filter />
        </div>
      </div>

    </>
  )
}

export default Card