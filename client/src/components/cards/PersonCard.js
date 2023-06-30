import { Card, List, Row, Col } from "antd";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import CarCard from "./CarCard";

const someStyling = () => ({
    card: {
    },

    cardHead: {
        background: "#f9f9fb"
    },

    cardBody: {
        background: "#fdfdfe",
        borderTop: "1px solid #f0f0f0"
    },

    ul: {
        textAlign: "initial"
    }
})

const PersonCard = (props) => {
    const { id, firstName, lastName } = props;

    const nameFull = `${firstName} ${lastName}`;
    const person_self_ID = id;

    const { loading, error, data } = useQuery(GET_CARS);

    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`

    console.log("data", data);

    const styles = someStyling();
    return (
        <Card
            style={styles.card}
            title={nameFull}
            headStyle={styles.cardHead}
            bodyStyle={styles.cardBody}
        >
            <Row gutter={16}>
                { data.cars.map(({ id, year, make, model, price, personId }) => (
                    // show all the cars owned by THIS person
                    (person_self_ID === personId) ? (
                    <Col key={id} span={8}>
                        <CarCard
                            id={id}
                            year={year}
                            make={make}
                            model={model}
                            price={price}
                            personId={personId}
                        />
                    </Col>) : ("")
                ))}
            </Row>
        </Card>
    )
}

export default PersonCard