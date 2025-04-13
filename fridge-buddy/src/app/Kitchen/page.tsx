'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Kitchen() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids')?.split(',') || [];
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (ids.length === 0) return;

    fetch(`http://127.0.0.1:5000/get-recipes?ids=${ids.join(',')}`)
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error("Failed to fetch recipes", err));
  }, [ids]);

  return (
    <div>
      <h1>Recipes 🍴</h1>
      {recipes.map((r, i) => (
        <div key={i}>
          <h2>{r.recipe_name}</h2>
          <p>{r.ingredients.join(', ')}</p>
          <p>{r.instructions.join(' → ')}</p>
        </div>
      ))}
    </div>
  );
}
