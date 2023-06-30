import { useMutation } from '@apollo/client'
import { useQuery } from "@apollo/client";
import { GET_PEOPLE, ADD_CAR, GET_CARS } from '../../queries'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, Button, Select } from 'antd'

const someStyling = () => ({
    heading: {
        marginBottom: "1.5em"
    },

    form: {
        width: "756px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "5px 20px",
        marginBottom:"2em"
    },

    submitCont: {
    },

    submitBtn: {
        width: "80%"
    }
})

const AddCarForm = (props) => {
    const [id] = useState(uuidv4());
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, [])

    const [add_car] = useMutation(ADD_CAR)
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

    const addNewCar = (values) => {
        const { year, make, model, price, personId } = values;

        add_car({
            variables: {
                id,
                year: parseInt(year.trim()),
                make,
                model,
                price: parseFloat(price.trim()),
                personId
            },

            update: (cache, { data: { add_car } }) => {
                const data = cache.readQuery({ query: GET_CARS })
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, add_car]
                    }
                })
            }
        })
    }
    

    return (
        <>
        <h2 style={styles.heading}>Add a new car:</h2>
        <Form
            form={form}
            name="edit-car-form"
            layout="horizontal"
            size="medium"
            style={styles.form}
            onFinish={addNewCar}
        >
            {/*----- INPUT: BRAND (MAKE) -----*/}
            <Form.Item
                style={styles.formItem}
                label="Brand:"
                name="make"
                rules={[{ required: true, message: "Car brand must not be empty" }]}
            >
                <Input placeholder="Brand"/>
            </Form.Item>

            {/*----- INPUT: MODEL -----*/}
            <Form.Item
                style={styles.formItem}
                label="Model:"
                name="model"
                rules={[{ required: true, message: "Model variant must not be empty." }]}
            >
                <Input placeholder="Model"/>
            </Form.Item>

            {/*----- INPUT: YEAR -----*/}
            <Form.Item
                style={styles.formItem}
                label="Year:"
                name="year"
                rules={[{ required: true, message: "Year field must not be empty." }]}
            >
                <Input placeholder="Year"/>
            </Form.Item>

            {/*----- INPUT: PRICE -----*/}
            <Form.Item
                style={styles.formItem}
                label="Price:"
                name="price"
                rules={[{ required: true, message: "Price field must not be empty." }]}
            >
                <Input placeholder="Price" addonBefore="$"/>
            </Form.Item>

            <Form.Item
                style={styles.formItem}
                label="Owner:"
                name="personId"
                rules={[{ required: true, message: "Car must have an owner."}]}
            >
                <Select
                    defaultValue={first_person}
                    options={everyone}
                />
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
                                !form.isFieldTouched("id") &&
                                !form.isFieldTouched("year") &&
                                !form.isFieldTouched("make") &&
                                !form.isFieldTouched("model") &&
                                !form.isFieldTouched("price") &&
                                !form.isFieldTouched("personId")
                            ) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >Add Car</Button>
                )}
            </Form.Item>
        </Form>
        </>
    )
}

export default AddCarForm