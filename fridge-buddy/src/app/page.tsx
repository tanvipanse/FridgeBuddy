'use client'
import {Icon} from "@/components/Icon";
import Form from "@/components/AddToFridge"
import 'react-tooltip/dist/react-tooltip.css';
import styled from 'styled-components';




export default function Home() {
  return (
      <div>
        <h1>Your Fridge</h1>
        <Form />
      </div>
  )
}


