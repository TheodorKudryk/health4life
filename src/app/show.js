import {useState, useEffect} from 'react';

const Show = ({hash, children}) => {  
   const [, setRoute]= useState(window.location.hash);
   const handleHash = () => setRoute(window.location.hash);

   useEffect(()=> {
      window.addEventListener("hashchange", handleHash)
      return () => window.removeEventListener("hashchange", handleHash);
   }, []);

   const showNavBar = (hash==="#nav" && window.location.hash!=="#login");

   return (hash===window.location.hash || showNavBar) ? children : false;
};

 export default Show;