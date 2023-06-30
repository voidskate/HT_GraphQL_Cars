import { Card, Row, Col } from "antd";

const someStyling = () => ({
    card: {
    },

    ul: {
        textAlign: "initial",
        marginLeft: "-1em",
        marginBottom: 0
    }
})

const CarCard = (props) => {
    const { id, year, make, model, price, personId } = props;

    const cardTitle = `🏎️ ${make} ${model} (${year})`;
    
    const price_formatted = `$${Number(price).toLocaleString()}`;

    const styles = someStyling();
    return (
        <>
        <Card
            style={styles.card}
            title={cardTitle}
        >
            <ul style={styles.ul}>
                <li><b>Car ID:</b> {id}</li>
                <li><b>Brand:</b> {make}</li>
                <li><b>Model:</b> {model}</li>
                <li><b>Price:</b> {price_formatted}</li>
                {/* uncomment the following to confirm that they're reflecting accurately */}
                {/* <li><b>Owned By:</b> {personId}</li> */}
            </ul>
        </Card>
        </>
    )
}

export default CarCard