import {useRef, useState} from 'react';
import DropCard from '../drop-card';
import ListStyles from './list.module.css';

export default function List({list}){
    const listRef = useRef();

    return(
        <div className={ ListStyles.ListContainer }>
            <span className={ ListStyles.ListNamaes }>{list.title} </span>
            <div className={ ListStyles.ListDropCards} ref={listRef}>
                {list.content.map((item, i)=>(
                    <DropCard index={i} item={item} />
                ))}
            </div>
        </div>
    )
}
