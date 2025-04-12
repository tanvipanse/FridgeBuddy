'use client';
import React, {ChangeEvent, useState} from 'react';
import {Icon, IconProps} from '@/components/Icon';
import {ButtonLink, ButtonLinkProps} from '@/components/ButtonLink';

export default function Form() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [name, setName] = useState("");
    const[icons, setIcons] = useState<IconProps[]>([]);
    // const addFridgeContainer = document.getElementById('add-fridge-container');

    function submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get("query");
        setIcons((prevIcons) => [...prevIcons, {category:selectedCategory,name:name}]);
        //create new icon data
        //add to icons state -> array of icons data
        
    }

    const storeCategory = (event) => {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        console.log(newCategory);
        
        console.log(icons);

    }

    const storeName = (event) => {
        setName(event.target.value);
    }

    return (
        <div>
            <div>
                {icons.map((icon,index) => (
                    <Icon key={index} name={icon.name} category={icon.category}/>
                ))}
            </div>
            <form onSubmit={submit}>
                <input type="text" name="query" value={name} onChange={storeName}/>
                <button type="submit">Add to cart 🛒</button>
                <br/><br/>
                <label >
                    Food Category: <br/>
                    <select value={selectedCategory} onChange={storeCategory}>
                        <option value="default">Select 🙋‍♀️</option>
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
                <ButtonLink href="/Kitchen">Head to recipes! 👩‍🍳</ButtonLink>

                
            </form>
            
            
        </div>
        
    );
}