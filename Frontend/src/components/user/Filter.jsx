import React from 'react'
import useCardStore from '../../stores/cardStore';

function Filter() {
  const { filters, setFilters } = useCardStore();

  const handleCheckboxChange = (category, value) => {
    const currentCategoryFilters = filters[category];
    let newFilters;

    if (currentCategoryFilters.includes(value)) {
      // ถ้ามีอยู่แล้วให้เอาออก (Uncheck)
      newFilters = currentCategoryFilters.filter(item => item !== value);
    } else {
      // ถ้าไม่มีให้เพิ่มเข้าไป (Check)
      newFilters = [...currentCategoryFilters, value];
    }

    setFilters({ ...filters, [category]: newFilters });
  };

  const resetFilter = () => {
    setFilters({ rarity: [], color: [] });
  };
  return (
    <div className="p-6 bg-base-300 w-60 min-h-screen flex flex-col gap-2">
      <h2 className="text-xl font-black tracking-tight">FILTERS</h2>
      <div className="divider my-0"></div>

      <div>
        <h3 className="font-bold text-lg mb-3 text-primary">Rarity</h3>
        {['C', 'UC', 'R', 'L', 'SR', 'SEC', 'SP CARD'].map(item => (
          <label key={item} className="label cursor-pointer flex gap-3 p-0 mb-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              checked={filters.rarity.includes(item)}
              onChange={() => handleCheckboxChange('rarity', item)}
            />
            <span className="label-text">{item}</span>
          </label>
        ))}
      </div>

      <div className="divider my-0"></div>

      <div>
        <h3 className="font-bold text-lg mb-3 text-primary">Color</h3>
        {['Red', 'Green', 'Blue', 'Purple', 'Black', 'Yellow'].map(item => (
          <label key={item} className="label cursor-pointer flex gap-3 p-0 mb-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              checked={filters.color.includes(item)}
              onChange={() => handleCheckboxChange('color', item)}
            />
            <span className="label-text">{item}</span>
          </label>
        ))}
      </div>

      <button className="btn btn-outline btn-error btn-block mt-4" onClick={resetFilter}>
        Reset Filter
      </button>
    </div>
  )
}

export default Filter