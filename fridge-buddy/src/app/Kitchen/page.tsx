'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';
import { RecipeCard, RecipeCardProps } from './RecipeCard';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import Link from 'next/link';

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

  return (
    <button style={{margin: "auto", marginTop: '50px', display:'block', borderRadius: "20px", padding: "0.9rem 1.5rem", fontSize: "1rem", backgroundColor:"#99D8D3", borderWidth:"0px", fontWeight:"bold"}} onClick={handleBack}>Back to the Fridge</button>
  )
}

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
      <h1 style={{margin:"35px", backgroundColor:'#CACC90', padding:'20px', borderRadius: '40px', width: '180px'}}>Recipes 🍴</h1>
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
      <BackButton />
      {/* <button onClick={() => router.back()}>Back to the Fridge</button> */}
      {/* <Link href="../page.tsx"><button style={{marginTop: '80px', display:'block', margin:'auto'}}>To the Fridge</button></Link> */}
    </div> 
  );
}
