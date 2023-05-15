import openedCard from '../styles/OpenedActivityCard.module.css';
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import adjustColor from '../helpers/lightenColor';

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

const OpenedActivityCard = ({title, owner, owner_avatar, co_owner_usernames, co_owner_avatars, description, setDisplayCard, color}: OpenedActivityCardProps) =>{

    const [openComments, setOpenComments] = useState(false);

    const [arrowDown, setArrowDown] = useState(openedCard.nonRotated);
    
    const [currCoBg1, setCurrCoBg1] = useState<string | undefined>('#ff0000');
    const [currCoBg2, setCurrCoBg2] = useState<string | undefined>('#ff0000');
    const [currCoBg3, setCurrCoBg3] = useState<string | undefined>('#ff0000');

    const handleOpenComments = () =>{
        setOpenComments(!openComments);
        
        if(openComments){
            setArrowDown(openedCard.rotated);
        }
        else{
            setArrowDown(openedCard.nonRotated);
        }

        console.log(openComments)
        console.log(arrowDown)
    } 

    const onCloseClick = () =>{
        setDisplayCard(false);
    }

    var letter = ''
    var letterBackground = ''

    //owner existance
    if(owner==null && owner_avatar==null){
        letter = 'N';
        letterBackground = '#505050';
    }
    else if(owner!=null && owner_avatar==null){
        letter = owner.charAt(0);
        letterBackground = '#' + color;
    }


    var letterCo : Array<string | undefined> = [undefined, undefined, undefined] 
    var letterCoBg : Array<string | undefined> = [undefined, undefined, undefined] 
    const grays : Array<string> = ['#6c6c6c','#929292','#cfcfcf'];

    if(co_owner_usernames!=null && co_owner_usernames!=undefined){

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
    }

    /* for(var z=0; z<3; z++){
        if(letterCoBg[z]!=null || letterCoBg[z]!=undefined){
            decoy = letterCoBg[z];
        }

    } */
/* 
    var decoy : string | undefined= '' */


    useLayoutEffect(()=>{
            setCurrCoBg1(letterCoBg[0])
            setCurrCoBg2(letterCoBg[1])
            setCurrCoBg3(letterCoBg[2])
    })

 
    return(
    <>
        <div className={openedCard.modalBackground}>
           <div className={openedCard.Card}>
                <div className={openedCard.close}>
                    <button className={openedCard.closeButton} onClick={() => onCloseClick()}>
                        <FontAwesomeIcon icon={faXmark} style={{color: "#62656a", height: "2em"}} />
                    </button>
                </div>

                <div className={openedCard.title}>
                    {title}
                </div>

                <div className={openedCard.ownersWrap}>
                    
                    <div className={openedCard.owner}>
                        {owner_avatar!=null && <img src={owner_avatar} alt="owner_avatar" className={openedCard.ownerPhoto}/> /*user exists and have photo*/} 
                        {owner==null && owner_avatar==null && <div className={openedCard.ownerPhoto} style={{backgroundColor:letterBackground}}><div className={openedCard.letter}>{letter}</div></div> /*user doesn't exis*/}
                        {owner!=null && owner_avatar==null && <div className={openedCard.ownerPhoto} style={{backgroundColor:letterBackground}}><div className={openedCard.letter}>{letter}</div></div> /*user exists, but doesn't have photo*/}

                        <div>Owner</div>
                    </div>

                    <div className={openedCard.coOwners}>

                        {co_owner_usernames!=null && co_owner_avatars!=null && co_owner_avatars[0]!=null && <img src={co_owner_avatars[0]} alt="owner_avatar1" className={openedCard.image1}/>}
                        {/*coOwners exists, coOwner1 have photo*/}
                        {co_owner_usernames!=null && co_owner_avatars!=null && co_owner_avatars[0]==null && <div className={openedCard.image1} style={{backgroundColor:currCoBg1}}><div className={openedCard.letter}>{letterCo[0]}</div></div>}
                        {/*coOwners exists, coOwner1 doesn't have photo*/}
                        {co_owner_usernames==null && <div className={openedCard.image1} style={ {backgroundColor:currCoBg1}}><div className={openedCard.letter}>{letterCo[0]}</div></div>}
                        {/*coOwners doesn't exist*/}
                        
                        {co_owner_usernames!=null && co_owner_avatars!=null && co_owner_avatars[1]!=null && <img src={co_owner_avatars[1]} alt="owner_avatar1" className={openedCard.image2}/>}
                        {/*coOwners exists, coOwner2 have photo*/}
                        {co_owner_usernames!=null && co_owner_avatars!=null && co_owner_avatars[1]==null && <div className={openedCard.image2} style={{backgroundColor:currCoBg2}}><div className={openedCard.letter}>{letterCo[1]}</div></div>}
                        {/*coOwners exists, coOwner2 doesn't have photo*/}
                        {co_owner_usernames==null && <div className={openedCard.image2} style={{backgroundColor:currCoBg2}}><div className={openedCard.letter}>{letterCo[1]}</div></div>}
                        {/*coOwners doesn't exist*/}

                        {co_owner_usernames!=null && co_owner_avatars!=null && co_owner_avatars[2]!=null && <img src={co_owner_avatars[2]} alt="owner_avatar1" className={openedCard.image3}/>}
                        {/*coOwners exists, coOwner3 have photo*/}
                        {co_owner_usernames!=null && co_owner_avatars!=null && co_owner_avatars[2]==null && <div className={openedCard.image3} style={{backgroundColor:currCoBg3}}><div className={openedCard.letter}>{letterCo[2]}</div></div>}
                        {/*coOwners exists, coOwner3 doesn't have photo*/}
                        {co_owner_usernames==null && <div className={openedCard.image3} style={{backgroundColor:currCoBg3}}><div className={openedCard.letter}>{letterCo[2]}</div></div>}
                        {/*coOwners doesn't exist*/}

                        {<div>Co-Owner</div>}

                    </div>

                </div>

                <div className={openedCard.description}>
                    {description}
                </div>

                <div className={openedCard.addComment}>
                    <input type="password" className={openedCard.inputComment} name = 'password' placeholder={'Agregar comentario...'} title="Enter your password"></input>

                    <button className={openedCard.sendButton}>
                        <img src="/send/blue_send_button.png" className={openedCard.send}></img>
                    </button>    
                    
                </div>

                <div className={openedCard.commentsWrap}>
                    <div className={openedCard.commentsText}>
                        Comentarios
                    </div>
                        <FontAwesomeIcon icon={faChevronDown} className={arrowDown} onClick={()=>{handleOpenComments()}}/>
                    </div>

            </div>
        </div>
        
    </>

    )


}

export default OpenedActivityCard;