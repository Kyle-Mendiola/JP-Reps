import "./errorTooltip.css"

const ErrorTooltip = ({ error, divProps }) => {

    return (
        error.message && 
        <div
            className="errTooltip absolute-center-x"
            {...divProps}
        > 
            <div className="arrow-up absolute-center-x"></div>
            {error?.message}
        </div>
    );
}
 
export default ErrorTooltip;