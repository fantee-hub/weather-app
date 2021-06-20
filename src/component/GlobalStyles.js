import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body{
        margin:0;
        padding: 0;
        box-sizing: border-box;
        background:#202020;
        font-family: 'Poppins', sans-serif;
    }
    input{
        font-weight: lighter;
        font-size:1rem;
        font-family: 'Poppins', sans-serif;
    }
    p {
    font-size: 1.2rem;
    span{
        color:#FFF100;
        font-size:2rem;
    }
  }
  h1{
      font-size:1.5rem;
      span{
          color: #FFF100;
      }
  }

`;

export default GlobalStyles;
