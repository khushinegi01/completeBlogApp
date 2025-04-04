import React from 'react'

export function Logo({ width = "50px", height = "50px" }) {
    return (
        <img src='https://cdn.pixabay.com/photo/2022/01/16/16/44/blogger-logo-6942640_960_720.png' alt='logo'
        width={width} 
        height={height} 
        style={{ objectFit: "contain" }}
        />
    )
}


