import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
    background-color:white;
    border-radius: 10px;
    padding: 10px;
    width: 500px;
    position: relative
`

export type RecipeCardProps = {
    concept: string;
    recipeName: string;
    ingredients: [];
    instructions: [];
}

export function RecipeCard({concept, recipeName, ingredients, instructions}:RecipeCardProps) {
    return(
        <StyledDiv>
            <div style={{position:'absolute', textAlign: "center", width: '100%', backgroundColor: '#0B5563', top: '0', left:'0', borderTopLeftRadius:'10px', borderTopRightRadius:'10px', color: 'white'}}>
                <h1>{recipeName}</h1>
                <p> "{concept}"</p>
            </div>
            
            <div style={{display:'flex', marginTop: '150px', padding: "0.5rem"}}>
                <ul><strong>Ingredients:</strong>
                    {ingredients.map((ingredient, key) => (
                        <li key={key}>{ingredient}</li>
                    ))}
                </ul>
                <ol><strong>Instructions:</strong>
                    {instructions.map((step, key) => (
                        <li key={key}>{step}</li>
                    ))}
                </ol>
            </div>
        </StyledDiv>

    );
}