import React from 'react'
import ErrorTooltip from "../ErrorTooltip"
import "./errorInput.css"

// Creates an element with an error tooltip attached to it

// Note: Call Element in function form (Line 13) to prevent rerendering of this component
const ErrorInput = ({el, error}) => {


    const Element = () => React.createElement(el.type, 
        {
            ...el.props,
            style: { borderColor: error.message ? "rgb(216, 114, 114)" : "black"}
        }
    )

    return (
        <div className="error-input"> 
            {Element()}
            <ErrorTooltip error={error} />
        </div>
    );
}
 
export default ErrorInput;