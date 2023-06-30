import PeopleList from "../lists/PeopleList"
import CarList from "../lists/CarList"
import AddCarForm from "../forms/AddCarForm"
import AddPersonForm from "../forms/AddPersonForm"

const ShowPage = () => {
    return (
        <>
            <AddPersonForm/>
            <AddCarForm/>
            <PeopleList/>
        </>
    )
}

export default ShowPage