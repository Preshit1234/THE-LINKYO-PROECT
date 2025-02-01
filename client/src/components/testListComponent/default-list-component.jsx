import {useRef, useState} from 'react';
import DropCard from '../drop-card';
import ListStyles from './list.module.css';

export default function DefList({deflist}){
    const listRef = useRef();

    return(
        <div className={ ListStyles.ListContainer }>
            <span className={ ListStyles.ListNamaes }>Newly Added Drops </span>
            <div className={ ListStyles.ListDropCards} ref={listRef}>
                {deflist.map((item, i)=>(
                    <DropCard item={item._id} />
                ))}
            </div>
        </div>
    )
}