import { createTheme } from "@material-ui/core";

export const theme = createTheme({
    typography: {
      button:{
        fontWeight:'bolder',
        fontSize:'0.9rem'
      },
      h1:{
        fontSize:'2rem', 
        fontWeight:'bolder',
      },
      h2:{
        fontSize: '2.75rem',
        fontWeight: 'bolder',
      },
      h4:{
        fontSize: '1.3rem',
        fontWeight: 'bolder',
        lineHeight: '2.235',
      },
      caption:{
        fontSize:'0.9rem',
        fontWeight: 'lighter',
        textTransform: 'uppercase',
        color:'#29457a',
      },
      body1:{
        fontSize: '0.8rem',
        fontWeight: 'bold',
        lineHeight: '1.4',
      },
      fontFamily: [
        'Gotham', 
        'helvetica', 
        'arial', 
        'sans-serif'
      ].join(','),
    },
    palette: {
      action: {
        disabledBackground: '#141F33',
        disabled: 'white'
      },
      primary: {
        main: '#e850f8',
      },
      secondary:{
        main:'#29457a',
      }
    }
  });