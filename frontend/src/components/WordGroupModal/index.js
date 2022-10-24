import { useState, useEffect, useCallback } from "react"
import "./wordGroupModal.css"

const WordGroupModal = ({ isShown, setIsShown, wordGroupsRef }) => {
    const [wordGroups, setWordGroups] = useState([])
    const [newWordGroup, setNewWordGroup] = useState("")
    const [disableAddBtn, setDisableAddBtn] = useState(false)

    const sortFunc = (a, b) => a.text.localeCompare(b.text)

    // When overlay is clicked, NOT the modal itself
    const overlayCLick =  (e) => {
        if (e.target === e.currentTarget) {
            setIsShown(false)
        }
    }

    const keyDownHandler = (e) => {
        const isFocused = document.activeElement === e.target
        console.log(isFocused);
        if(e.key === "Enter" && isFocused  && isValidInput()) {
            addNewWordGroupHandler(e)
        }
        else{
            console.log("Not added")
        }
    }

    const checkboxHandler = (e) => {
        const newObject = wordGroups.find(wordGroup => wordGroup.id === e.target.id)
        newObject.checked = e.target.checked
        setWordGroups(prevState => ([
            ...prevState.filter(wg => wg.id !== e.target.id),
            newObject
        ]).sort(sortFunc))
    }

    const addNewWordGroupHandler = (e) => {
        e.preventDefault()
        const addWordGroupStyle = document.querySelector(".add-word-group").style
        const addWordGroupInputStyle = document.querySelector(".add-word-group-input").style
        if (addWordGroupStyle.display === "none") {

            if (!isValidInput()) {
                return
            }
            
            addWordGroupStyle.display = "block"
            addWordGroupInputStyle.display = "none"
        
            manageWordGroups([
                ...wordGroups, 
                {
                    "id": newWordGroup,
                    "text": newWordGroup,
                    "checked": true
                }
            ])
            setNewWordGroup("")
        }
        else{
            addWordGroupStyle.display = "none"
            addWordGroupInputStyle.display = "flex"
            document.querySelector(".add-word-group-input").firstElementChild.focus()
        }
    }

    const newWordGroupChangeHandler = (e) => {
        setNewWordGroup(e.target.value)
    }

    const closeHandler = (e) => {
        e.preventDefault()
        console.table(wordGroupsRef.current)
    }

    const manageWordGroups = useCallback((data) => {
        wordGroupsRef.current = data
        setWordGroups([...data].sort(sortFunc))
    }, [wordGroupsRef])

    const isValidInput = useCallback(() => {
        const isDuplicate = wordGroups.some(wordGroup => wordGroup.text === newWordGroup)
        return !isDuplicate && !newWordGroup.length <= 0
    }, [newWordGroup, wordGroups])


    useEffect(() => {
        const data = [
            {
                "id" : "1234",
                "text":"WG-1213", 
                "checked": false
            },
            {
                "id" : "2345",
                "text":"AG-876987", 
                "checked": false
            },
            {
                "id" : "3456",
                "text":"WG-6", 
                "checked": false
            }
        ]

        manageWordGroups(data)

    }, [manageWordGroups])

    useEffect(() => {
        setDisableAddBtn(!isValidInput())
    }, [isValidInput])
    
    return (
        isShown && <div className="word-group-modal overlay" 
            onClick={overlayCLick}>
            <div className="modal vertical-centered">
                <h2> Your word groups </h2>
                <button onClick={closeHandler}> Close</button>
                <ul id="style-1">
                    {wordGroups && wordGroups.map(wordGroup => (
                        <li key={`word-group-${wordGroup.id}`}> 
                            <label className={wordGroup.id === wordGroup.text ? "new" : ""} 
                                htmlFor={wordGroup.id}> 
                                {wordGroup.text} 
                            </label>
                            <input 
                                type="checkbox" 
                                name={`word-group-${wordGroup.id}`} 
                                id={wordGroup.id}
                                onChange={checkboxHandler}
                                value={wordGroup.checked}
                                checked={wordGroup.checked}
                            />
                        </li>
                    ))}
                    <li>
                        <label onClick={addNewWordGroupHandler}
                            className="add-word-group"> 
                            Add new + 
                        </label> 
                        <label className="add-word-group-input"
                            style={{display:"none"}}>
                            <input type="text" value={newWordGroup} 
                                onChange={newWordGroupChangeHandler} 
                                onKeyDown={keyDownHandler} 
                            />
                            <button 
                                onClick={addNewWordGroupHandler} 
                                disabled={disableAddBtn}> 
                                Add 
                            </button>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default WordGroupModal;  