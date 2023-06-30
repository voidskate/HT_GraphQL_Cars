import { useMutation } from '@apollo/client'
import { useQuery } from "@apollo/client";
import { EDIT_CAR, GET_PEOPLE, GET_PERSON_BY_ID, PERSON_WITH_CARS, EDIT_PERSON } from '../../queries'

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
        gridArea: "2 / 1 / 3 / 3",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        alignItems: "center",
        gridGap: "0 22px"
    },

    footerBtns: {
        width: "100%"
    }
})

const EditPersonForm = (props) => {
    let { id, firstName, lastName } = props;
	const [form] = Form.useForm();
	const [, forceUpdate] = useState();
	const [edit_person] = useMutation(EDIT_PERSON);

    useEffect(() => {
        forceUpdate()
    }, [])

    const styles = someStyling();

    // GET A LIST OF EVERYONE
    // + FIND OUT OWNER'S NAME FROM THEIR PERSONID
    const { loading: hasCarsLoading, error: hasCarsError, data: hasCarsData } = useQuery(PERSON_WITH_CARS, {
        variables: { personId: id }
    });

    const { loading: evLoading, error: evError, data: evData } = useQuery(GET_PEOPLE);

    const { loading: personLoading, error: personError, data: personData } = useQuery(GET_PERSON_BY_ID, {
        variables: { id: id },
    });

    if(evLoading || personLoading || hasCarsLoading){
        return "Loading..."
    }

    if(evError) return `Error! ${evError.message}`
    if(personError) return `Error! ${personError.message}`
    if(hasCarsError) return `Error! ${hasCarsError.message}`

    console.log("data", evData);
    console.log("data", personData);
    console.log(`person ${id} has these cars:`, hasCarsData);

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
        const { firstName, lastName } = values;

        edit_person({
            variables: {
                id,
                firstName,
                lastName
            }
        })

        props.onBtnClick()
    }

    

    return (
        <Form
            form={form}
            name="edit-person-form"
            layout="vertical"
            size="large"
            style={styles.form}
            initialValues={{
				firstName, lastName
			}}
            onFinish={saveCarEdits}
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
                                    !form.isFieldTouched("firstName") &&
                                    !form.isFieldTouched("lastName")
                                ) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >Save Changes</Button>
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

export default EditPersonForm