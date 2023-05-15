import newCard from '../styles/NewCard.module.css';
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export type OpenedActivityCardProps = {
    "title" : string,
    "owner" : string | null,
    "owner_avatar" : string | null,
    "co_owner_usernames"  : Array<string> | null,
    "co_owner_avatars" : Array<string> | null,
    "description": string,
    "setDisplayCard": any,
    "color": string
}

const NewCard = () =>{
    

    const onCloseClick = () =>{
        //setDisplayCard(false);
    }

    /* if(co_owner_usernames!=null && co_owner_usernames!=undefined){

        for(var x = 0; x < co_owner_usernames.length -1; x++){
            //coOwner[x] existance
            if(co_owner_usernames!=null && co_owner_avatars!=null && co_owner_avatars[x]==undefined){ // coOwners exist, but don't have avatar
                letterCo[x]=co_owner_usernames[x].charAt(0);
                letterCoBg[x]=adjustColor('#' + color, 600*(x+0.7)/10);
                //letterCoBg[x] = adjustColor('#' + '000080', 600*(x+0.7)/10) // 900, 1500
            }
        }
    }

    for(var y=0; y < 3; y++){
        if(letterCo[y]==undefined || co_owner_usernames==null || co_owner_usernames==undefined){ // coOwners doesn't exist
            letterCo[y] = 'N';
            letterCoBg[y] = grays[y];
        }
    } */

    /* for(var z=0; z<3; z++){
        if(letterCoBg[z]!=null || letterCoBg[z]!=undefined){
            decoy = letterCoBg[z];
        }

    } */
/* 
    var decoy : string | undefined= '' */

/* 
    useLayoutEffect(()=>{
            setCurrCoBg1(letterCoBg[0])
            setCurrCoBg2(letterCoBg[1])
            setCurrCoBg3(letterCoBg[2])
    }) */

 
    return(
    <>
        <div className={newCard.modalBackground}>
           <div className={newCard.Card}>
                <div className={newCard.close}>
                    <button className={newCard.closeButton} onClick={() => onCloseClick()}>
                        <FontAwesomeIcon icon={faXmark} style={{color: "#62656a", height: "2em"}} />
                    </button>
                </div>

                <div className={newCard.title}>
                    <div>
                        <input  className={newCard.inputs} placeholder='Título'/>
                        
                    </div>
                </div>

                <div className={newCard.description}>
                    <div>
                        <input className={newCard.inputs} placeholder='Descripción' />
                    </div>
                </div>
            
            </div>
    
        </div>
        
    </>

    )


}

export default NewCard;