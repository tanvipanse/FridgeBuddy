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
    onRemove?: (name: string) => void;
}

export function Icon({category, name, onClick, onRemove}:IconProps) {
    const [isHovered, setIsHovered] = useState(false);

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

    const handleRemoveClick = (event : React.MouseEvent) => {
        event.stopPropagation(); //dont set off parent onclick
        // figure out how to frickin remove it 
        onRemove(name);
    }


    return (
        <div 
            onClick={handleClick} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: 'pointer', display: 'inline-block', position: 'relative'}}>
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
            {isHovered && (
                <button onClick={handleRemoveClick}
                style={{
                    position: "absolute",
                    right: '5px',
                    cursor: "pointer"
                }}
                >
                ✖
                </button>
            )}
            <Tooltip id="name-hover"/>
        </div>
    );
}

