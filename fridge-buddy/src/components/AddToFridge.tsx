'use client';
import React, {ChangeEvent, useState} from 'react';
import {Icon, IconProps} from '@/components/Icon';
import {ButtonLink, ButtonLinkProps} from '@/components/ButtonLink';
import {useRouter} from 'next/navigation';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import styled from 'styled-components';
import fridge from '@/assets/fridge.png';
import Image from 'next/image';

const Button = styled.button`
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    font-size: 1.5rem;
    border-style: solid;
    border-width: 0.2rem;
    border-color: #0e273c;
`

const Input = styled.input`
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    font-size: 1.5rem;
    border-style: solid;
    border-width: 0.2rem;
    border-color: #0e273c;
`
const Select = styled.select`
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    font-size: 1.5rem;
    border-style: solid;
    border-width: 0.2rem;
    border-color: #0e273c;
`


export default function Form() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [name, setName] = useState("");
    const[icons, setIcons] = useState<IconProps[]>([]);
    const[basket, setBasket] = useState<IconProps[]>([]);
    // const [isClicked, setIsClicked] = useState(false);
    const [activeIcon, setActiveIcon] = useState<string | null>(null);

    const router = useRouter();

    function submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get("query");
        setIcons((prevIcons) => [
            ...prevIcons, 
            {category:selectedCategory,name:name,onClick:handleBasket}]);
        //create new icon data
        //add to icons state -> array of icons data
        setName(""); // clear input after form submission
        
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
        //performs on click of an icon 
    };

    const handleHeadToRecipes = async () => {
        const ingredients = basket.map((ingredient) => ingredient.name);
        // console.log(ingredients); // DEBUG
        try {
            const response = await fetch('http://127.0.0.1:5000/your-fridge', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                }, 
                body: JSON.stringify({ ingredients }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error, status: ${response.status}`);
            }
            const data = await response.json();
            const ids = data.ids;
            if (ids.length > 0) {
                const idParam = ids.join(','); // or just take the first one
                router.push(`/Kitchen?ids=${idParam}`);
              }
        } catch (error) {
            console.error('Error sending ingredients', error);
        }
    };

    const handleRemoveIcon = (nameToRemove: string) => {
        setIcons(prev => prev.filter(icon => icon.name !== nameToRemove));
      };

    return (
        <div style={{display: 'flex'}}>
            <div style={{flex: 1}}>
                <form onSubmit={submit}>
                    <label style={{fontSize: "2rem"}}>
                        Food Category: <br/>
                        <Select value={selectedCategory} onChange={storeCategory}>
                            <option value="default">Select 🙋‍♀️</option>
                            <option value="dairy">Dairy</option>
                            <option value="protein">Protein</option>
                            <option value="fruit">Fruit</option>
                            <option value="vegetable">Vegetable</option>
                            <option value="sauce">Sauce</option>
                            <option value="grain">Grain</option>
                            <option value="misc">Misc.</option>
                        </Select>
                    </label>
                    <Input type="text" name="query" value={name} onChange={storeName}/>
                    <Button type="submit">Add to cart 🛒</Button>
                    <br/> <br/>
                    <div style={{flexWrap: "wrap", width: "25rem"}}>
                        {basket.map((icon,index) => (
                            <Icon key={index} name={icon.name} category={icon.category} onClick={handleBasket}onRemove={handleRemoveIcon}/>
                        ))}
                    </div>

                    
                </form>
                <Button onClick={handleHeadToRecipes}>Head to recipes! 👩‍🍳</Button>
            </div>
            <div style={{position:'relative', width: '625px', height: '715px'}}>
                <Image
                src={fridge}
                alt="Fridge icon"
                fill
                style={{objectFit: "cover"}}
                />
                <div style={{position: 'absolute',width:'57%',height:'70%', top: '12%', left: '4%'}}>
                    {icons.map((icon,index) => (
                        <Icon key={index} name={icon.name} category={icon.category} onClick={handleBasket} onRemove={handleRemoveIcon}/>
                    ))}
                </div>
            </div>      
        </div>
        
    );
}