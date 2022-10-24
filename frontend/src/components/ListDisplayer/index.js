import "./listDisplayer.css"

const ListDisplayer = ({ className, clickHandler, data }) => {
    return (
        <div className={`list-displayer ${className || ""}`.trim()}>
            {data && data.map((d, i) => (
                <p 
                    key={`${d}${i}`}
                    data-value={d} 
                    onClick={clickHandler}
                >
                    {d}
                </p>
            ))}
        </div>
    );
}
 
export default ListDisplayer;