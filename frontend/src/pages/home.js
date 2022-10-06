import AddForm from "../components/AddForm";

const Home = () => {
    return (
        <div className="home">
            <AddForm>

            </AddForm>
            <div className="questions">
                <h3> Questions </h3>
            </div>
            <div className="memory">
                <h3> Memory </h3>
            </div>
        </div>
    );
}
 
export default Home;