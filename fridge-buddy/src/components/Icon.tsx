'use client'
import React, {useState} from 'react';
import {Tooltip} from 'react-tooltip';
import Image from 'next/image';

// IMPORT IMAGES STATICALLY 
import dairy from "../assets/dairy.png";
import protein from "../assets/protein.png";
import fruit from "../assets/fruit.png";
import vegetable from "../assets/vegetable.png";
import sauce from "../assets/sauce.png";
import grain from "../assets/grain.png";
import misc from "../assets/misc.png";



export type IconProps = {
    category:string;
    name:string;
    onClick: (icon:{category: string; name: string;}) => void;
}

export function Icon({category, name, onClick}:IconProps) {
    const setImage = () => {
        switch(category) {
            case "dairy":
                return dairy;
            case "protein":
                return protein;
            case "fruit":
                return fruit;
            case "vegetable":
                return vegetable;
            case "sauce":
                return sauce;
            case "grain":
                return grain;
            default: return misc;
        }
    }
    const handleClick = () => {
        const icon = {category, name};
        onClick(icon);
        
    }
    return (
        <div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-block', position: 'relative'}}>
            <span
            data-tooltip-id="name-hover"
            data-tooltip-content={name}
            style={{ display: 'inline-block' }}
            >
            <Image
                src={setImage()}
                alt="icon"
                width={100}
            />
            </span>
            <Tooltip id="name-hover"/>
        </div>
    );
}

