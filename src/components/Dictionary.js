import { useState, useEffect } from "react";
export default function Dictionary(){
    //take a input variable and display on the page 
    const [word, setWord] = useState('');
    const [word2,setWord2 ] = useState('');

    useEffect(()=>{


    }
    ,[word] //dependency array 
    );//useEffect is a function,takes two arguments, a callback function and 
    // the purpose of this function can be use to tacke state change 
    //onChange is asynchronous, use useEffect we can ensure all the state is updated 
    //no dependency arry  -> update for any state change 
    //empty dependency arry -> execute once 
    // dependecy arry ->execute wheneve what in the dependency array changes 
    useEffect(()=>{


    }
    ,[word] //dependency array 
    );
    //you can have useState multiple times 
    





    return (
        
        <>
            <input type = "text" onChange = {(e)=>{
                setWord(e.target.value);
            }}/>
            <h2>Let's get the definition for {word}</h2>
            <input type = "text" onChange = {(e)=>{
                setWord2(e.target.value);
            }}/>
            <h2>Let's get the definition for {word2}</h2>
            

        </>
    )


}