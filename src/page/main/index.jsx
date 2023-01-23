import { useState } from 'react';
import axios from 'axios';
import style from './style';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { display } from '@mui/system';

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
      {!fact && (
        <CardActions>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              getFact();
            }}
          >
            Get another fact
          </Button>
        </CardActions>
      )}
      {fact && (
        <Card
          sx={{
            maxWidth: 900,
            maxHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <CardMedia
              sx={{ objectFit: 'fill' }}
              component="img"
              image={gifUrl}
              title={fact}
            />
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {fact}
              </Typography>
            </CardContent>
          </Card>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              getFact();
            }}
          >
            Get another fact
          </Button>
        </Card>
      )}
    </div>
  );
}

export default CatFacts;
