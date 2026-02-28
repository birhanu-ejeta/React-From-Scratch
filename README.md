# React Fundamental
## Components is simple and reusable part of code for example
```
function Greeting() {
  return <h2>My First Component</h2>;
}

// arrow function also works

const Greeting = () => {
  return <h2>My First Component</h2>;
};
```
## Destructuring ES6 java concept
```
obj={
name:"birhanu",
email:fonsa@gmail.com",
password:kdkejidk}

{name,Email,password}=obj
// this is best example of object distracturing

```

## children in react
** is used to render data between my component to UI **
```
export default function Book({image,author, title, children}){
  return(
    <div>
        <img src={image} alt="title"/>
        <h2>{author}</h2>
        <p>{title}</p>
<div>{children}</di>
    </div>)};
// in the app.js
import Book from './Book.jsx"
export default function App(){
return(
<Book image="./image/photo1.png" author="birhanu" title="that one is good" }>Wow this book is amazing</Book>)}

