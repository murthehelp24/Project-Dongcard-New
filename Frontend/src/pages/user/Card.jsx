import { Filter as FilterIcon } from "lucide-react"
import CardList from "../../components/user/CardList"
import Filter from "../../components/user/Filter"


function Card() {

  return (
    <>
      <div>
        <div className="drawer lg:drawer-open bg-base-200">
          <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

          <main className="drawer-content flex flex-col p-4 md:p-6">
            <header className="flex justify-between items-center mb-4 px-2">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-base-content uppercase">OnePiece Card Game</h1>
              
              {/* Mobile Filter Toggle */}
              <label htmlFor="filter-drawer" className="btn btn-primary btn-sm lg:hidden gap-2 rounded-lg font-bold">
                <FilterIcon size={16} />
                ตัวกรอง
              </label>
            </header>

            <div className='w-full'>
              <CardList />
            </div>
          </main>

          {/* Sidebar Drawer */}
          <div className="drawer-side z-[110]">
            <label htmlFor="filter-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <Filter />
          </div>
        </div>
      </div>

    </>
  )
}

export default Card