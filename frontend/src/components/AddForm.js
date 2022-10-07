import { useState } from "react"

const AddForm = ({ setShowForm }) => {
    const [tags, setTags] = useState(["Tag1", "Tag2", "Tag3"])
    const [tag, setTag] = useState("")

    const closeHandler = (e) => {
        e.preventDefault()
        setShowForm(false)
    }

    const addTagHandler = (e) => {
        e.preventDefault()
        if(tag.trim().length <= 0){
            return
        }
        setTags([...tags, tag])
        setTag("")
    }

    return (
        <form className="add-form">
            <button className="close" onClick={closeHandler}>X</button>
            <h3> Add a new word </h3>
            <input className="word-input" type="text" />
            <label htmlFor="reading" > Reading: </label>
            <input className="reading-input" name="reading" type="text" />
            <label htmlFor="word-group"> Word groups: </label>
            {/* <div style={{"display":"flex"}}>
                <input className="word-group-input" name="word-group" value="jkhj" />
                <button className="addWordGroupButton"> + </button>
            </div> */}
            <label htmlFor="tags"> Tags: </label>
            <div style={{"display":"flex"}}>
                <input className="tags-input" name="tags" value={tag} onChange={(e) => setTag(e.target.value)} />
                <button className="addTagButton" onClick={addTagHandler} disabled={tag.length <= 0}> + </button>
            </div>
            <div style={{"display":"flex", "flex-wrap":"wrap", "width": "100px" }}>
                {tags.map(tag => (
                    <span key={tag}>{tag}</span>
                ))}
            </div>
            <label htmlFor="notes"> Notes: </label>
            <textarea className="notes-input" name="notes"/>
        </form>
    );
}
 
export default AddForm;