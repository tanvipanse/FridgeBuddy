'use client';
import React, {ChangeEvent, useState} from 'react';
import {Icon, IconProps} from '@/components/Icon';
import {ButtonLink, ButtonLinkProps} from '@/components/ButtonLink';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';

export default function Form() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [name, setName] = useState("");
    const[icons, setIcons] = useState<IconProps[]>([]);
    const[basket, setBasket] = useState<IconProps[]>([]);
    // const [isClicked, setIsClicked] = useState(false);
    const [activeIcon, setActiveIcon] = useState<string | null>(null);
    const [dishLabel, setDishLabel] = useState("Entrée");

    function submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get("query");
        setIcons((prevIcons) => [
            ...prevIcons, 
            {category:selectedCategory,name:name,onClick:handleBasket}]);
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

    const handleBasket = (clickedIcon: {category:string;name:string;}) => {
        //determines whether this icon is in fridge or basket
        const inFridge = icons.find(icon => icon.name === clickedIcon.name);
        const inBasket = basket.find(icon => icon.name === clickedIcon.name);

        if(inFridge){
            setIcons(prev => prev.filter(icon => icon.name !== clickedIcon.name));
            setBasket(prev => [...prev, clickedIcon]);
        } else if(inBasket){
            setBasket(prev => prev.filter(icon => icon.name !== clickedIcon.name));
            setIcons(prev => [...prev, clickedIcon]);
        }
        
    };

    const handleDishLabel = () => {
        dishLabel === "Entrée"? setDishLabel("Side"): setDishLabel("Entrée");
    };

    return (
        <div>
            <div>
                {icons.map((icon,index) => (
                    <Icon  key={index} name={icon.name} category={icon.category} onClick={handleBasket}/>
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
                    <Icon key={index} name={icon.name} category={icon.category} onClick={handleBasket}/>
                ))}
            </div>

            <FormControlLabel control={<Switch/>} label={dishLabel} onChange={handleDishLabel}/>
            <ButtonLink href="/Kitchen">Head to recipes! 👩‍🍳</ButtonLink>
  
        </div>
        
    );
}