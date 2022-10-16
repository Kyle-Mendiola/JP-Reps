import { useEffect, useState } from "react"
import SpanCarousel from "../SpanCarousel"
import ListInput from "../ListInput"
import ListDisplayer from "../ListDisplayer"
import { isEmpty, hasString } from "../utilities"
import "./addForm.css"

const AddForm = ({ setShowForm }) => {
    const [existingTags ,setExistingTags] = useState([])
    const [newTags, setNewTags] = useState([])
    const [tag, setTag] = useState("")
    const [tagInputInvalid, setTagInputInvalid] = useState(false)
    const [showMoreOptions, setShowMoreOptions] = useState(false)
    const [form, setForm] = useState({
        word: "",
        reading: "",
        meaning: ""
    })

    const closeHandler = (e) => {
        e.preventDefault()
        setShowForm(false)
    }

    const addTagHandler = (e) => {
        e.preventDefault()

        if(isEmpty(tag) || newTags.includes(tag)){
            return "Invalid input"
        }

        setNewTags([...newTags, tag])
        setTag("")
    }

    const addSuggestedTagClickHandler = (e) => {
        const newTag = e.target.getAttribute("data-value")
        setNewTags([...newTags, newTag])
        setTag("")
    }

    const removeTagClickHandler = (e) => {
        const tagToRemove = e.target.getAttribute("data-value")
        setNewTags(newTags.filter(t => t !== tagToRemove))
    }

    const inputsHandler = (e) =>{
        const  { name, value } = e.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const submitHandler = (e) => {
        e.preventDefault()
        // if (showMoreOptions) {
        //     word["tags"] = newTags
        // }
        console.table(form);
    }

    useEffect(() => {
        if (isEmpty(tag) || newTags.includes(tag)) {
            setTagInputInvalid(true)
        }
        else{
            setTagInputInvalid(false)
        }

    }, [tag, newTags])

    // Set existing tags on first render (fetch from backend)
    useEffect(() => {
        setExistingTags(["Tag1", "Tag2", "Tag3", "Tag1", "Tag2"])
    }, [])

    return (
        <form className="add-form">
            <button className="close" onClick={closeHandler}>X</button>
            <h3> Add a new word </h3>
            <input className="word-input" type="text" name="word" onChange={inputsHandler} value={form.word} />
            <label htmlFor="reading"> Reading: </label>
            <input className="regular-input" name="reading" type="text" onChange={inputsHandler} value={form.reading} />
            <label htmlFor="meaning" > Meaning: </label>
            <input className="regular-input" name="meaning" type="text" onChange={inputsHandler} value={form.meaning} />
            <label htmlFor="type" > Type: </label>
            <select className="type-input" name="type" type="text">
                <option value="noun">Noun</option>
                <option value="verb">Verb</option>
                <option value="adj">Adjective</option>
            </select>
            <label htmlFor="addOptionsCb"> 
                More Options: 
                <input type="checkbox" 
                    name="addOptionsCb" 
                    id="addOptionsCb" 
                    onChange={(e) => {
                        setShowMoreOptions(e.target.checked)
                    }} 
                />
            </label>

            {showMoreOptions && 
            <div className="more-options">
                <label htmlFor="word-group"> Word groups: </label>
                <div className="list-displayer-container tags">
                    <label> Tags: </label>
                    <ListDisplayer
                        className="tags"
                        clickHandler={removeTagClickHandler}
                        data={newTags}
                    />
                </div>
                <ListInput
                    inputConfig={{
                        data:tag,
                        setData: setTag,
                        placeholder: "Add new tag here"
                    }}
                    btnConfig={{
                        onClick:addTagHandler,
                        disabled:tagInputInvalid
                    }}
                    className="tag"
                />
                <SpanCarousel
                    elements={existingTags.filter((t) => hasString(t, tag) && !newTags.includes(t))}
                    className="tag"
                    pClickEvent={addSuggestedTagClickHandler}
                />
                <label htmlFor="notes"> Notes: </label>
                <textarea className="notes-input" name="notes"/>
            </div>}
            <button className="submit" onClick={submitHandler}> ADD </button>
        </form>
    )
}
 
export default AddForm;