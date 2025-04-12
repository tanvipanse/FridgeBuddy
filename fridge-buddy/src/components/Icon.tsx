'use client'
import React, {useState} from 'react';
import {Tooltip} from 'react-tooltip';


export type IconProps = {
    category:string;
    name:string;
    onClick: (icon:{category: string; name: string;}) => void;
}

export function Icon({category, name, onClick}:IconProps) {
    const setImage = () => {
        let emoji = "👾";
        switch(category) {
            case "dairy":
                emoji = "🧀";
                break;
            case "protein":
                emoji = "🥩";
                break;
            case "fruit":
                emoji = "🍎";
                break;
            case "vegetable":
                emoji = "🥦";
                break;
            case "sauce":
                emoji = "🥫";
                break;
            case "grain":
                emoji = "🌾";
                break;
        }
        return emoji;
    }
    const handleClick = () => {
        const icon = {category, name};
        onClick(icon);
        
    }
    return (
        <div onClick={handleClick}>
            <a 
                data-tooltip-id="name-hover" 
                data-tooltip-content={name} 
            >
                {setImage()}
            </a>
            <Tooltip id="name-hover"/>
        </div>
    );
}

