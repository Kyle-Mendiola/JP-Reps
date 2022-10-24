import React from 'react'
import { useEffect, useState, useRef } from "react"
import { isEmpty, hasString } from "../../utilities"
import SpanCarousel from "../SpanCarousel"
import ListInput from "../ListInput"
import ListDisplayer from "../ListDisplayer"
import WordGroupModal from "../WordGroupModal"
import ErrorInput from "../partials/ErrorInput"
import "./addForm.css"

// TODO: Revise states so that they are cleaner

const AddForm = ({ setShowForm }) => {
    const [existingTags ,setExistingTags] = useState([])
    const [newTags, setNewTags] = useState([])
    const [tag, setTag] = useState("")

    const [tagInputError, setTagInputError] = useState({message: ""})
    const [wordInputError, setWordInputError] = useState({message: ""})

    const [showMoreOptions, setShowMoreOptions] = useState(false)
    const wordGroupsRef = useRef([])
    const [form, setForm] = useState({
        word: "",
        reading: "",
        meaning: "",
        type: "noun"
    })
    const [isWordGroupModalShown, setIsWordGroupModalShown] = useState(false)

    const modalHandler = (e) => {
        e.preventDefault()
        setIsWordGroupModalShown(true)
    }

    const closeHandler = (e) => {
        e.preventDefault()
        setShowForm(false)
    }

    const addTagHandler = (e) => {
        e.preventDefault()

        if(isEmpty(tag) || newTags.includes(tag)){
            setTagInputError(getTagInputError())
            return
        }

        setTagInputError({})
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

    const inputsHandler = (e) => {
        const  { name, value } = e.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(isEmpty(form.word)){
            setWordInputError({ message: "Please input a value"})
            return
        }

        if (showMoreOptions) {
            form["tags"] = newTags
        }
        console.table(form);
    }

    const getTagInputError = () => {
        if(isEmpty(tag)){
            return { message: "Please input a value." }
        }
        else if(newTags.includes(tag)){
            return { message: "This tag is already included."}
        }
        return {}
    }
    
    // Set existing tags on first render (fetch from backend)
    useEffect(() => {
        setExistingTags(["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"])
    }, [])

    useEffect(() => {
        setTagInputError({})
    }, [tag])

    useEffect(() => {
        setWordInputError({})
    }, [form])


    return (
        <form className="add-form">
            <h3> Add a new word </h3>
            {/* <input className="word-input" type="text" name="word" onChange={inputsHandler} value={form.word} /> */}
            <ErrorInput 
                el={{ 
                    type:"input", 
                    props:{ 
                        className:"word-input", 
                        type:"text", 
                        name:"word", 
                        onChange:inputsHandler, 
                        value:form.word
                    }}
                }
                error={wordInputError}
            />
            <label htmlFor="reading"> Reading: </label>
            <input className="regular-input" name="reading" type="text" onChange={inputsHandler} value={form.reading} />
            <label htmlFor="meaning" > Meaning: </label>
            <input className="regular-input" name="meaning" type="text" onChange={inputsHandler} value={form.meaning} />
            <label htmlFor="type" > Type: 
                <select 
                    className="type-input" 
                    name="type" 
                    type="text"
                    onChange={inputsHandler} 
                    value={form.type}
                >
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adj">Adjective</option>
                </select>
            </label>
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
                <label htmlFor="word-group"> Word groups: <button onClick={modalHandler}> + </button> </label>
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
                        placeholder: "Add new tag here",
                    }}
                    btnConfig={{
                        onClick:addTagHandler,
                        // disabled:tagInputInvalid
                    }}
                    className="tag"
                    error={tagInputError}
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
            <button className="close" onClick={closeHandler}>X</button>
            <WordGroupModal
                wordGroupsRef={wordGroupsRef}
                isShown={isWordGroupModalShown} 
                setIsShown={setIsWordGroupModalShown} />
        </form>
    )
}
 
export default AddForm;