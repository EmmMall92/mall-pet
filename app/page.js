'use client';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { exampleFoods } from './data/exampleFoods';

const getUnique = (array, key) => [...new Set(array.map(item => item[key]).filter(Boolean))];
const getUniqueTags = foods => [...new Set(foods.flatMap(food => food.tags))];

const brands = getUnique(exampleFoods, 'brand');
const sizes = getUnique(exampleFoods, 'μέγεθος');
const ages = getUnique(exampleFoods, 'ηλικία');
const tags = getUniqueTags(exampleFoods);

export default function Page() {
  // Υπολογιστής τροφής
  const [animalType, setAnimalType] = useState('Σκύλος');
  const [weight, setWeight] = useState('');
  const [lifeStage, setLifeStage] = useState('Ενήλικος');
  const [activity, setActivity] = useState('Κανονική');
  const [result, setResult] = useState(null);

  const calculateFood = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      setResult('Παρακαλώ δώσε έγκυρο βάρος.');
      return;
    }

    const RER = 70 * Math.pow(w, 0.75);
    let factor = 1.6;

    if (animalType === 'Σκύλος') {
      if (lifeStage === 'Κουτάβι') factor = 2.5;
      if (lifeStage === 'Ηλικιωμένος') factor = 1.3;
    } else {
      if (lifeStage === 'Κουτάβι') factor = 2.0;
      if (lifeStage === 'Ηλικιωμένος') factor = 1.2;
    }

    if (activity === 'Υψηλή') factor *= 1.3;
    if (activity === 'Χαμηλή') factor *= 0.8;

    const DER = RER * factor;
    const kcalPerGram = 3.8;
    const grams = Math.round(DER / kcalPerGram);
    setResult(`Προτεινόμενη ποσότητα: περίπου ${grams}g/ημέρα`);
  };

  // Φίλτρα
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
    <main className="min-h-screen bg-gray-50 p-4 space-y-6">
      {/* Υπολογιστής Ποσότητας */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Υπολογιστής Ποσότητας Τροφής</h2>
        <div className="flex flex-wrap gap-4">
          <select value={animalType} onChange={e => setAnimalType(e.target.value)} className="border rounded p-2">
            <option>Σκύλος</option>
            <option>Γάτα</option>
          </select>
          <input
            type="number"
            placeholder="Βάρος (kg)"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="border rounded p-2 w-32"
          />
          <select value={lifeStage} onChange={e => setLifeStage(e.target.value)} className="border rounded p-2">
            <option>Κουτάβι</option>
            <option>Ενήλικος</option>
            <option>Ηλικιωμένος</option>
          </select>
          <select value={activity} onChange={e => setActivity(e.target.value)} className="border rounded p-2">
            <option>Χαμηλή</option>
            <option>Κανονική</option>
            <option>Υψηλή</option>
          </select>
          <button onClick={calculateFood} className="bg-blue-600 text-white px-4 py-2 rounded">
            Υπολόγισε
          </button>
        </div>
        {result && <p className="text-sm text-green-700">{result}</p>}
      </div>

      {/* Φίλτρα */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Κάρτες */}
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
