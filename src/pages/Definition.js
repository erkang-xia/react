import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import Dictionary from "./Dictionary";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
  //const [word, setWord] = useState();
  //const [notFound, setNotFound] = useState(false);
  let { search } = useParams();
  //https://api.dictionaryapi.dev/api/v2/entries/en/<word>

  const {
    request,
    data: [{ meanings: word }] = [{}],
    err,
  } = useFetch(
    //data:word rename the return data to word
    //data: [{meanings:word}] = [{}] data:[] go get the first properity, {} go inside the properity, meanings:word rename
    //= [{}] assign a empty value until data is received

    "https://api.dictionaryapi.dev/api/v2/entries/en/" + search
  );
  useEffect(() => {
    request();
  });

  /*
  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
          //navigate('/404');
        }
        return response.json();
      })
      .then((data) => {
        setWord(data[0].meanings);
        console.log(data);
      });
  }, []);
  */

  if (err === 404) {
    return (
      <>
        <NotFound />
        <Link to="/dic">Search another</Link>
      </>
    );
  }

  return (
    <>
      {word ? (
        <>
          <h1>here is a definition</h1>
          {word.map((meaning) => {
            return (
              <>
                <h5>{search}</h5>

                <p key={uuidv4()}>
                  {meaning.partOfSpeech + ": "}
                  {meaning.definitions[0].definition}
                </p>
              </>
            );
          })}
        </>
      ) : null}
      <Link to="/dic">Search another</Link>
      <Dictionary />
    </>
  );
}
