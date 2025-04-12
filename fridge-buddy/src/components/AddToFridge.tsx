'use client';
import React, {ChangeEvent, useState} from 'react';
import {Icon, IconProps} from '@/components/Icon';
import {ButtonLink, ButtonLinkProps} from '@/components/ButtonLink';

export default function Form() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [name, setName] = useState("");
    const[icons, setIcons] = useState<IconProps[]>([]);
    const[basket, setBasket] = useState<IconProps[]>([]);
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
    }

    const storeName = (event) => {
        setName(event.target.value);
    }

    const handleBasket = (icon: {category:string;name:string;isClicked:boolean}) => {
        console.log(icon.isClicked);
        if(icon.isClicked){
           //remove corresponding icon from icons
           setIcons(prevIcons => prevIcons.filter(clickedIcon => clickedIcon.name !== icon.name));
           //add corresponding icon to basket 
           setBasket(prevBasket => [...prevBasket, {category:icon.category,name:icon.name}])
        }
        else if(!icon.isClicked){
            setIcons((prevIcons) => [...prevIcons, {category: icon.category,name:icon.name}]);
            setBasket(prevBasket => prevBasket.filter(clickedIcon => clickedIcon.name !== icon.name));
        }
        //performs on click of an icon
        
        
    }

    return (
        <div>
            <div>
                {icons.map((icon,index) => (
                    <Icon  key={index} name={icon.name} category={icon.category} onClick={handleBasket} isClicked={icon.isClicked}/>
                ))}
            </div>
            <form onSubmit={submit}>
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
                <input type="text" name="query" value={name} onChange={storeName}/>
                <button type="submit">Add to cart 🛒</button>
                <br/> <br/>

                
            </form>
            <div>
                {basket.map((icon,index) => (
                    <Icon key={index} name={icon.name} category={icon.category} onClick={handleBasket} isClicked={icon.isClicked}/>
                ))}
            </div>

            <ButtonLink href="/Kitchen">Head to recipes! 👩‍🍳</ButtonLink>
            
            
        </div>
        
    );
}