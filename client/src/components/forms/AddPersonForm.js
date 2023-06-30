import { useMutation } from '@apollo/client'
import { useQuery } from "@apollo/client";
import { GET_PEOPLE, ADD_PERSON } from '../../queries'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, Button } from 'antd'

const someStyling = () => ({
    heading: {
        marginBottom: "1.5em"
    },

    form: {
        width: "756px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "5px 20px"
    },

    submitCont: {
    },

    submitBtn: {
        width: "80%"
    }
})

const AddPersonForm = (props) => {
    const [id] = useState(uuidv4());
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, [])

    const [add_person] = useMutation(ADD_PERSON)
    const styles = someStyling();

    const { loading, error, data } = useQuery(GET_PEOPLE);

    if(loading){
        return "Loading..."
    }

    if(error) return `Error! ${error.message}`

    console.log("people list", data);

    // create an array of objects,
    // in which each objects follows this pattern:
    /*
        {
            label: "firstName lastName",
            value: index (position in array)
        }
    */
    // will be used to populate the <Select> (owner dropdown) options
    let everyone = [];
    for(let [index, p] of data.people.entries()){
        let obj = {};
        let full_name = `${p.firstName} ${p.lastName}`;
        obj.label = full_name;
        obj.value = (index + 1).toString(); // turn [index] position to type String to match its type in the DB
        everyone.push(obj)
    }

    let first_person = everyone[0].label;

    /*----------------------------------------*/

    const addNewPerson = (values) => {
        const { firstName, lastName } = values;

        add_person({
            variables: {
                id,
                firstName,
                lastName
            },

            update: (cache, { data: { add_person } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE })
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, add_person]
                    }
                })
            }
        })
    }
    

    return (
        <>
        <h2 style={styles.heading}>Register a new person:</h2>
        <Form
            form={form}
            name="add-person-form"
            layout="horizontal"
            size="medium"
            style={styles.form}
            onFinish={addNewPerson}
        >
            {/*----- INPUT: FIRST NAME -----*/}
            <Form.Item
                style={styles.formItem}
                label="First Name:"
                name="firstName"
                rules={[{ required: true, message: "First name is required." }]}
            >
                <Input placeholder="e.g. John"/>
            </Form.Item>

            {/*----- INPUT: LAST NAME -----*/}
            <Form.Item
                style={styles.formItem}
                label="Last Name:"
                name="lastName"
                rules={[{ required: true, message: "Last name is required." }]}
            >
                <Input placeholder="e.g. Mulaney"/>
            </Form.Item>

            {/*----- BUTTON: SUBMIT -----*/}  
            <Form.Item
                shouldUpdate={true}
                style={styles.submitCont}
            >
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={styles.submitBtn}
                        disabled={
                            (
                                !form.isFieldTouched("firstName") &&
                                !form.isFieldTouched("lastName")
                            ) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >Add Person</Button>
                )}
            </Form.Item>
        </Form>
        </>
    )
}

export default AddPersonForm