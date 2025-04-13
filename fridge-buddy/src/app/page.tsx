'use client'
import {Icon} from "@/components/Icon";
import Form from "@/components/AddToFridge"
import 'react-tooltip/dist/react-tooltip.css';
import styled from 'styled-components';



const StyledDiv = styled.div`
  display: flex;
`
const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 5rem;
  margin-right: 5rem;
`


export default function Home() {


  return (
    <>
      <h1 style={{margin:"35px", backgroundColor:'#CACC90', padding:'20px', borderRadius: '40px', width: '270px'}}>FridgeBuddy 🧊</h1>
      <FlexRowDiv>
        <StyledDiv>
            <Form />
        </StyledDiv>
      </FlexRowDiv>
     
    </>  
  )
}