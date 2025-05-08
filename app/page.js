'use client';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { exampleFoods } from './data/exampleFoods';

// Αυτόματη εξαγωγή μοναδικών τιμών
const getUnique = (array, key) => [...new Set(array.map(item => item[key]).filter(Boolean))];
const getUniqueTags = foods => [...new Set(foods.flatMap(food => food.tags))];

const brands = getUnique(exampleFoods, 'brand');
const sizes = getUnique(exampleFoods, 'μέγεθος');
const ages = getUnique(exampleFoods, 'ηλικία');
const tags = getUniqueTags(exampleFoods);

export default function Page() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggle = (value, list, setList) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const filteredFoods = exampleFoods.filter(food => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(food.brand);
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(food.μέγεθος);
    const matchesAge = selectedAges.length === 0 || selectedAges.includes(food.ηλικία);
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => food.tags.includes(tag));
    return matchesBrand && matchesSize && matchesAge && matchesTags;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Δημοφιλείς Ξηρές Τροφές</h1>

      {/* ΦΙΛΤΡΑ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[["Brand", brands, selectedBrands, setSelectedBrands],
          ["Μέγεθος", sizes, selectedSizes, setSelectedSizes],
          ["Ηλικία", ages, selectedAges, setSelectedAges],
          ["Tags", tags, selectedTags, setSelectedTags]].map(([title, values, selected, setSelected], i) => (
          <div key={i}>
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto bg-white rounded border p-2">
              {values.map((val, j) => (
                <label key={j} className="text-sm flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(val)}
                    onChange={() => toggle(val, selected, setSelected)}
                  />
                  {val}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ΚΑΡΤΕΣ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map((food, index) => (
          <Card key={index}>
            <CardContent>
              <h3 className="text-lg font-semibold mb-1">{food.name}</h3>
              <p className="text-sm text-muted-foreground">
                {food.brand} • {food.level}
              </p>
              <p className="text-sm text-muted-foreground">
                Μέγεθος: {food.μέγεθος} • Ηλικία: {food.ηλικία || '—'}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {food.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
