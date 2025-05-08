
'use client';
import { Card, CardContent } from './ui/card';

import { exampleFoods } from './data/exampleFoods';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Δημοφιλείς Ξηρές Τροφές</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exampleFoods.map((food, index) => (
          <Card key={index}>
            <CardContent>
              <h3 className="text-lg font-semibold mb-1">{food.name}</h3>
              <p className="text-sm text-muted-foreground">
                {food.brand} • {food.level}
              </p>
              <p className="text-sm text-muted-foreground">
                Μέγεθος: {food.μέγεθος} • Ηλικία: {food.ηλικία}
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
