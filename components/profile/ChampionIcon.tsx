"use client";

import {
  useEffect,
  useState,
} from "react";


interface Props {
  champion:string;
  className?:string;
}


export default function ChampionIcon({
  champion,
  className
}:Props){

  const [src,setSrc] =
    useState("");


  useEffect(()=>{

    fetch(
      `/api/champion/${champion}`
    )
    .then(res=>res.json())
    .then(data=>{
      setSrc(data.icon);
    });

  },[champion]);


  if(!src)
    return null;


  return (
    <img
      src={src}
      alt={champion}
      className={className}
    />
  );
}