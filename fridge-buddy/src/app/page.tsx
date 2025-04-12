
import {Icon} from "@/components/Icon";
import Form from "@/components/AddToFridge"
import 'react-tooltip/dist/react-tooltip.css';
import styled from 'styled-components';
import fridge from '@/assets/fridge.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1>Your Fridge</h1>
      <Form />
      <Image
        src={fridge}
        alt="Fridge icon"
        width={500}
      />

    </div>
  )
}


