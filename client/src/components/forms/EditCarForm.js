import { useMutation } from '@apollo/client'
import { useQuery } from "@apollo/client";
import { EDIT_CAR, GET_PEOPLE, GET_PERSON_BY_ID, PERSON_WITH_CARS } from '../../queries'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, Button, Select } from 'antd'

const someStyling = () => ({
    form: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: "14px 22px"
    },

    formItem: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: 0
    },

    flex: {
        marginBottom: "4px",
        marginTop: "10px",
        gridArea: "4 / 1 / 5 / 3",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        alignItems: "center",
        gridGap: "0 22px"
    },

    footerBtns: {
        width: "100%"
    }
})

const CarForm = (props) => {
    let { id, year, make, model, price, personId } = props;
	const [form] = Form.useForm();
	const [, forceUpdate] = useState();
	const [edit_car] = useMutation(EDIT_CAR);

    useEffect(() => {
        forceUpdate()
    }, [])

    const styles = someStyling();

    // GET A LIST OF EVERYONE
    // + FIND OUT OWNER'S NAME FROM THEIR PERSONID
    const { loading: hasCarsLoading, error: hasCarsError, data: hasCarsData } = useQuery(PERSON_WITH_CARS, {
        variables: { personId: personId }
    });

    const { loading: evLoading, error: evError, data: evData } = useQuery(GET_PEOPLE);

    const { loading: personLoading, error: personError, data: personData } = useQuery(GET_PERSON_BY_ID, {
        variables: { id: personId },
    });

    if(evLoading || personLoading || hasCarsLoading){
        return "Loading..."
    }

    if(evError) return `Error! ${evError.message}`
    if(personError) return `Error! ${personError.message}`
    if(hasCarsError) return `Error! ${hasCarsError.message}`

    console.log("data", evData);
    console.log("data", personData);
    console.log(`person ${personId} has these cars:`, hasCarsData);

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
    for(let [index, p] of evData.people.entries()){
        let obj = {};
        let full_name = `${p.firstName} ${p.lastName}`;
        obj.label = full_name;
        obj.value = (index + 1).toString(); // turn [index] position to type String to match its type in the DB
        everyone.push(obj)
    }

    // (set extracted FULL NAME STRING as personId to show in the dropdown)
    // let get_name_from_id = `${personData.find_person_by_ID.firstName} ${personData.find_person_by_ID.lastName}`;
    // personId = get_name_from_id

    // SAVE CHANGES
    const saveCarEdits = (values) => {
        const { year, make, model, price, personId } = values;

        edit_car({
            variables: {
                id,
                year: parseInt(year.trim()),
                make,
                model,
                price: parseFloat(price.trim()),
                personId
            }
        })

        props.onBtnClick()
    }

    

    return (
        <Form
            form={form}
            name="edit-car-form"
            layout="vertical"
            size="large"
            style={styles.form}
            initialValues={{
				year, make, model, price, personId
			}}
            onFinish={saveCarEdits}
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
                    defaultValue="John Mulaney"
                    options={everyone}
                />
            </Form.Item>

            {/*----- BUTTONS: SUBMIT & CANCEL -----*/}
            <div style={styles.flex}>            
                <Form.Item
                    shouldUpdate={true}
                    style={{ marginBottom: 0 }}
                >
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={styles.footerBtns}
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

                <Button
                    onClick={() => setTimeout(props.onBtnClick, 200)}
                    style={styles.footerBtns}
                >
                    Cancel
                </Button>
            </div>
        </Form>
    )
}

export default CarForm