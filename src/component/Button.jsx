import React from 'react'

function Button({
    children,
    type = "button",
    className = "",
    textColor = "text-white",
    bgColor = "bg-blue-900",
    hover = " hover:bg-blue-800 duration-200",
    ...props
}) {

    return (
       <button
        className={`px-4 py-2 rounded-lg ${hover} ${textColor} ${bgColor} ${className}`} {...props}
       >{children}</button>
    )
}

export default Button
