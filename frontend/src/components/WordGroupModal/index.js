import "./wordGroupModal.css"

const WordGroupModal = ({ isShown, setIsShown }) => {

    const overlayCLick =  (e) => {
        if (e.target === e.currentTarget) {
            setIsShown(false)
        }
    }

    return (
        <div className="word-group-modal overlay" 
            style={{ display: isShown ? "block": "none" }} 
            onClick={overlayCLick}>
            <div className="modal">Hello</div>
        </div>
    );
}

export default WordGroupModal;  