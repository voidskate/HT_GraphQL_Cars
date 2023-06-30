import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import { List } from "antd";

import PersonCard from "../cards/PersonCard";

const someStyling = () => ({
    list: {
        display: "flex",
        justifyContent: "center",
        width: "69vw"
    },

    listItem: {
        marginBottom: "35px"
    }
})

const PeopleList = () => {
    const styles = someStyling();
    const { loading, error, data } = useQuery(GET_PEOPLE);

    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`

    console.log("data", data);

    return (
        <List
            grid={{ gutter: 20, column: 1}}
            style={styles.list}
        >
            { data.people.map(({ id, firstName, lastName }) => (
                <List.Item key={id} style={styles.listItem}>
                    <PersonCard
                        id={id}
                        firstName={firstName}
                        lastName={lastName}
                    />
                </List.Item>
            ))}
        </List>
    )
}

export default PeopleList