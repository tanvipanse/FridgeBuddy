import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
    background-color:white;
    border-radius: 10px;
    padding: 10px;
    width: 500px;
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
            <h1 style={{textAlign: "center"}}>{recipeName}</h1>
            <p style={{textAlign: "center"}}>"{concept}"</p>
            <ul>
                {ingredients.map((ingredient, key) => (
                    <li key={key}>{ingredient}</li>
                ))}
            </ul>
            <ol>
                {instructions.map((step, key) => (
                    <li key={key}>{step}</li>
                ))}
            </ol>
        </StyledDiv>

    );
}