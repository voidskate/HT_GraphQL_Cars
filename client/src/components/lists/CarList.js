import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import { List } from "antd";

import CarCard from "../cards/CarCard";

const someStyling = () => ({
    list: {
        display: "flex",
        justifyContent: "center"
    }
})

const CarList = () => {
    const styles = someStyling();
    const { loading, error, data } = useQuery(GET_CARS);

    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`

    console.log("data", data);

    return (
        <List
            grid={{ gutter: 20, column: 1}}
            style={styles.list}
        >
            { data.cars.map(({ id, year, make, model, price, personId }) => (
                <List.Item key={id}>
                    <CarCard
                        id={id}
                        year={year}
                        make={make}
                        model={model}
                        price={price}
                        personId={personId}
                    />
                </List.Item>
            ))}
        </List>
    )
}

export default CarList