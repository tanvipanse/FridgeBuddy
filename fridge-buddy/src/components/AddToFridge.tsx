'use client';
import React from 'react';

export default function Form() {
    function submit(event) {
        const formData = new FormData(event.target);
        const query = formData.get("query");
        alert("Meow" + query);
    }
    // connect to backend 
    return (
        <form onSubmit={submit}>
            <input name="query" />
            <button type="submit">Add to cart 🛒</button>
            <br/><br/>
            <label>
                Food Category: <br/>
                <select>
                    <option value="default">Select</option>
                    <option value="dairy">Dairy</option>
                    <option value="protein">Protein</option>
                    <option value="fruit">Fruit</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="sauce">Sauce</option>
                    <option value="grain">Grain</option>
                    <option value="misc">Misc.</option>
                </select>
            </label>
            <br/> <br/>
            <button type="submit">Head to recipes! </button> 👩‍🍳
            
        </form>
    );
}