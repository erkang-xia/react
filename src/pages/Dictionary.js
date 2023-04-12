import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dictionary() {
  //take a input variable and display on the page
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  /*

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


    */

  return (
    <form
      onSubmit={() => {
        navigate("/dfn/" + word); //help to use enter key to search
      }}
    >
      <div>
        <h2>Let's get the definition for {word}</h2>
      </div>
      <div className="space-x-2">
        <input
          className="shrink min-w-0 rounded px-1 py-1"
          placeholder="word"
          type="text"
          onChange={(e) => {
            setWord(e.target.value);
          }}
        />
        <button className="px-2 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          Search
        </button>
      </div>
    </form>
  );
}
