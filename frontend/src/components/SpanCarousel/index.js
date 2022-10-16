//  Creates a div containing a list of span elements
//  Takes 3 props (* = optional)
//  elements   [array of strings] : the array of values to present in the span elements
//  className  [String]        : additional custom class for the div wrapper
//  pClickEvent  [event]*         : function to invoke when p is clicked

import { useState, useEffect } from "react"
import "./spanCarousel.css"
import { scrollInfo } from "../utilities"


const SpanCarousel = ({ elements, className, pClickEvent }) => {    
    const [showBtns, setShowBtns] = useState(false)

    const scroll = (e, config={ direction:"left" }) => {
        e.preventDefault()

        const parentDiv = document.querySelector(`.span-carousel.${className} div`)

        let direction
        switch (config.direction) {
            case "left": direction = -1; break;
            case "right": direction = 1; break;
            default: direction = -1
        }

        const scrollFactor = Math.round(parentDiv.scrollWidth / 3 * 0.5) * direction
        const scrollCoordinate = parentDiv.scrollLeft + scrollFactor

        parentDiv.scroll({
            left: scrollCoordinate,
            behavior: "smooth"
        })

        // Wait for scrolling before disabling buttons
        setTimeout(() => {
            const { onStart, onEnd } = scrollInfo(parentDiv, { offset:5 })

            document.querySelector(`.span-carousel.${className} button.left`).disabled = onStart
            document.querySelector(`.span-carousel.${className} button.right`).disabled = onEnd

        }, 150);

    }

    useEffect(() => {
        const parentDiv = document.querySelector(`.span-carousel.${className} div`)
        const parentWidth = parentDiv.parentElement.getBoundingClientRect().width

        // Show buttons when p elements overflow the parent container, else hide
        if(parentDiv.scrollWidth > parentWidth){
            parentDiv.style["overflow-x"] = "hidden"
            setShowBtns(true)
        }
        else{
            parentDiv.style["overflow-x"] = "visible"
            setShowBtns(false)
        }

    }, [elements, className, showBtns])

    return (
        <div
            // className={className}
            className={`span-carousel ${className || ""}`.trim()}
        >
            {showBtns && <button className="left" onClick={(e) => {scroll(e)}}> &#60; </button>}
            <div>
                {elements.length <= 0 && <p style={{"visibility":"hidden"}}> . </p>}
                {elements && elements.map((element, i) => (
                    <p
                        key={`${element}${i}`}
                        data-value={element}
                        onClick={pClickEvent}
                    >
                        {element}
                    </p>
                ))}
            </div>
            {showBtns && <button className="right" onClick={(e) => {scroll(e, { direction: "right" })}}> &#62; </button>}
        </div>
    );
}
 
export default SpanCarousel;