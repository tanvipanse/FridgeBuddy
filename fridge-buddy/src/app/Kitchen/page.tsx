'use client';
import { useSearchParams } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';
import { RecipeCard, RecipeCardProps } from './RecipeCard';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';

export default function Kitchen() {
  const searchParams = useSearchParams();
  const ids = useMemo(() => {
    return searchParams.get('ids')?.split(',') || [];
  }, [searchParams]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (ids.length === 0) return;

    fetch(`http://127.0.0.1:5000/get-recipes?ids=${ids.join(',')}`)
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error("Failed to fetch recipes", err));

    console.log(recipes);
  }, [ids]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <h1 style={{margin:"35px"}}>Recipes 🍴</h1>
      <Carousel responsive={responsive} infinite>
        {recipes.map((card, key) => (
          <div 
            key={key}
            style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection: "column",
            }}

          >
            <RecipeCard concept={card.concept} recipeName={card.recipe_name} ingredients={card.ingredients} instructions={card.instructions}/>
          </div>
        ))}
      </Carousel>
    </div> 
  );
}
