import React from 'react'

export default function Die(props){
    const styles={
        backgroundColor:props.isHeld? "#db7093":"#AAFF00"
    }
    return(
        <div className='grid-item' style={styles} onClick={() => {
            props.handleClick(props.id)
        }}>
            {props.value}
        </div>
    )
}