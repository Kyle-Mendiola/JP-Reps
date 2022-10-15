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

const ListInput = (props) => {
    const { data, 
        setData, 
        onChange, 
        placeholder } = props.inputConfig

    const onChangeHandler = onChange ? onChange : (e) => setData(e.target.value)

    return (
        <div className={`list-input-wrapper ${props.className || ""} `.trim()}>
            <input value={data} onChange={onChangeHandler} placeholder={placeholder || ""} />
            <button { ...props.btnConfig }> + </button>
        </div>
    );
}
 
export default ListInput;