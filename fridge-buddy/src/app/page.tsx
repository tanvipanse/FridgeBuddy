
import {Icon} from "@/components/Icon";
import 'react-tooltip/dist/react-tooltip.css';
import styled from 'styled-components';

export default function Home() {
  return (
    <div>
      <h1>Your Fridge</h1>
      <Icon category="vegetable" name="kale"/>
      <Icon category="protein" name="pork belly"/>
    </div>
  )
}


