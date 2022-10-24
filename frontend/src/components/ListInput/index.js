// inputConfig [options] : the options for the input field
//    - data                  : the state object
//    - setData               : the setter object
//    - onChange [event()]    : the change event function
//    - placeholder [String]* : input placeholder

// btnConfig [options] : the options for the add button
//    - onClick  [event()]   : the click object
//    - disabled [boolean]   : disabled property of the button

// className* [String] : custom className for the div container

import "./listInput.css"
import ErrorTooltip from "../partials/ErrorTooltip"

const ListInput = (props) => {
    const { data, 
        setData,
        onChange,
        placeholder,
        } = props.inputConfig

    const onChangeHandler = onChange ? onChange : (e) => setData(e.target.value)

    const className = `list-input-wrapper ${props.className || ""}`.trim()

    const inputChangeHandler = (e) => {
        onChangeHandler(e)
    }

    const keyDownHandler = (e) => {
        switch (e.key) {
            case "Enter":
                e.preventDefault()
                props.btnConfig.onClick(e)
                break;
        
            default:
                break;
        }
    }

    const onFocusHandler = (e) => {
        e.target.parentElement.classList.add("focused")
    }

    const onBlurHandler = (e) => {
        e.target.parentElement.classList.remove("focused")
    }

    return (
        <div className={className}>
            <div className="input">
                <input 
                    value={data} 
                    onChange={inputChangeHandler} 
                    onKeyDown={keyDownHandler} 
                    placeholder={placeholder || ""} 
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                <button { ...props.btnConfig }> + </button>
            </div>
            <ErrorTooltip error={props.error} />
        </div>
    );
}
 
export default ListInput;