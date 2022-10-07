import { useState } from "react";
import AddForm from "../components/AddForm";
import Questions from "../components/Questions";
import Memory from "../components/Memory";

const Home = () => {
    const [showForm, setShowForm] = useState(true)

    return (
        <div className="home">
            {showForm && <AddForm setShowForm={setShowForm} /> }
            <Questions>

            </Questions>
            <Memory>

            </Memory>
        </div>
    );
}
 
export default Home;