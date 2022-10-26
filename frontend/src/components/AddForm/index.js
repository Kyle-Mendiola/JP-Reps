import React from 'react'
import { useEffect, useState, useRef } from "react"
import { isEmpty, hasString } from "../../utilities"
import SpanCarousel from "../SpanCarousel"
import ListInput from "../ListInput"
import ListDisplayer from "../ListDisplayer"
import WordGroupModal from "../WordGroupModal"
import ErrorInput from "../partials/ErrorInput"
import "./addForm.css"

// 

const AddForm = ({ setShowForm }) => {
    const [form, setForm] = useState({
        word: { inputValue: "", error: { message: "" }},
        reading: { inputValue: "", error: { message: "" }},
        meaning: { inputValue: "", error: { message: "" }},
        type: { inputValue: "noun", error: { message: "" }},
    })

    const [tag, setTag] = useState({
        inputValue: "",
        existingTags: [],
        newTags: [],
        error: { message:""}
    })

    const [wordInputError, setWordInputError] = useState({message: ""})

    const [showMoreOptions, setShowMoreOptions] = useState(false)
    const wordGroupsRef = useRef([])

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

        const error = getTagInputError()

        if(error?.message){
            tagHandler({ error: error })
            return
        }

        tagHandler({ 
            newTags: [...tag.newTags, tag.inputValue],
            inputValue: "",
            error: {}
        })
    }

    const addSuggestedTagClickHandler = (e) => {
        const newTag = e.target.getAttribute("data-value")
        tagHandler({ 
            newTags: [...tag.newTags, newTag],
            inputValue: ""
        })
    }

    const removeTagClickHandler = (e) => {
        const tagToRemove = e.target.getAttribute("data-value")
        tagHandler({
            newTags: tag.newTags.filter(t => t !== tagToRemove)
        })
    }

    const inputsHandler = (e) => {
        const  { name, value } = e.target

        setForm(prevState => ({
            ...prevState,
            [name]: { inputValue: value, error: { message: "" }}
        }));
    }

    const tagHandler = (pairs) => {
        const oldState = Object.assign({}, tag)

        const newState = Object.assign(oldState, pairs)
        setTag(newState)
    }

    const tagInputChangeHandler = (e) => {
        tagHandler({ 
            inputValue:e,
            error: {}
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(isEmpty(form.word.inputValue)){
            setWordInputError({ message: "Please input a value"})
            return
        }

        if (showMoreOptions) {
            form["tags"] = tag.newTags
        }
        console.table(form);
    }

    const getTagInputError = () => {
        if(isEmpty(tag.inputValue)){
            return { message: "Please input a value." }
        }
        else if(tag.newTags.includes(tag.inputValue)){
            return { message: "This tag is already included."}
        }

        return {}
    }
    
    // Set existing tags on first render (fetch from backend)
    useEffect(() => {
        setTag(prevState => ({
            ...prevState,
            existingTags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]
        }))
    }, [])

    useEffect(() => {
        setWordInputError({})
    }, [form])


    return (
        <form className="add-form">
            <h3> Add a new word </h3>
            <ErrorInput 
                el={{ 
                    type:"input", 
                    props:{ 
                        className:"word-input", 
                        type:"text", 
                        name:"word", 
                        onChange:inputsHandler, 
                        defaultValue:form.word.inputValue
                        // value:form.word.inputValue
                    }}
                }
                error={wordInputError}
            />
            <label htmlFor="reading"> Reading: </label>
            <ErrorInput 
                el={{
                    type: "input",
                    props: {
                        className:"regular-input", 
                        name:"reading", 
                        type:"text",
                        onChange:inputsHandler, 
                        value:form.reading.inputValue
                    }
                }}
                error={form.reading.error}  
            />
            <label htmlFor="meaning" > Meaning: </label>
            <ErrorInput 
                el={{
                    type: "input",
                    props: {
                        className:"regular-input", 
                        name:"meaning", 
                        type:"text",
                        onChange:inputsHandler, 
                        value:form.meaning.inputValue
                    }
                }}
                error={form.meaning.error}  
            />
            <label htmlFor="type" > Type: 
                <select 
                    className="type-input" 
                    name="type" 
                    type="text"
                    onChange={inputsHandler} 
                    value={form.type.inputValue}
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
                        data={tag.newTags}
                    />
                </div>
                <ListInput
                    inputConfig={{
                        data:tag.inputValue,
                        setData: tagInputChangeHandler,
                        placeholder: "Add new tag here",
                    }}
                    btnConfig={{
                        onClick:addTagHandler,
                    }}
                    className="tag"
                    error={tag.error}
                />
                <SpanCarousel
                    elements={tag.existingTags.filter((t) => hasString(t, tag.inputValue) && !tag.newTags.includes(t))}
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