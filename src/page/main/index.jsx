import { useState } from 'react';
import axios from 'axios';
import style from './style';

function CatFacts() {
  const [fact, setFact] = useState('');
  const [gifUrl, setGifUrl] = useState('');

  const getFact = () => {
    axios
      .get(import.meta.env.VITE_CAT_API)
      .then((response) => {
        setFact(response.data.fact);
        //Usar las 3 primeras palabras del fact para buscar un gif
        getGif(response.data.fact.split(' ').slice(0, 3).join(' '));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getGif = (search) => {
    console.log(search);
    axios
      .get(
        `${import.meta.env.VITE_GIF_API}?api_key=${
          import.meta.env.VITE_API_KEY
        }&q=${search}&limit=1`
      )
      .then((gifResponse) => {
        setGifUrl(gifResponse.data.data[0].images.original.url);
      })
      .catch((err) => {
        console.error(err);
        getFact();
      });
  };
  return (
    <div style={style.main}>
      {!fact ? (
        <h1>Welcome to cat facts please press the button bellow </h1>
      ) : (
        ''
      )}
      <button style={style.button} onClick={getFact}>
        {!fact ? 'Get Cat Fact' : 'Get Another Fact'}
      </button>

      {fact && gifUrl && (
        <div style={style.content}>
          <img src={gifUrl} alt={fact} style={style.image} />

          <p style={style.text}>{fact}</p>
        </div>
      )}
    </div>
  );
}

export default CatFacts;
