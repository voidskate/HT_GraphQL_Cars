import { useMutation } from '@apollo/client'
import { Card, Modal, Row, Col } from "antd";
import { useQuery } from "@apollo/client";
import filter from 'lodash.filter'
import { GET_CARS } from "../../queries";
import CarCard from "./CarCard";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import EditPersonForm from "../forms/EditPersonForm";
import { GET_PEOPLE, REMOVE_PERSON } from "../../queries";

const someStyling = () => ({
    card: {
    },

    cardHead: {
        position: "relative",
        background: "#f9f9fb",
    },

    cardBody: {
        background: "#fdfdfe",
        borderTop: "1px solid #f0f0f0",
        gridGap: "20px",
        marginTop: "-16px"
    },

    ul: {
        textAlign: "initial"
    },

    card_opened_wrapper: {
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 16px)",
        boxSizing: "border-box",
        flex: "1",
        marginTop: "16px"
    },

    card_opened_body: {
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign:"center"
    },

    wideBtnLeftWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "22px",
        marginRight: "25px"
    },

    wideBtnLeft: {
        display: "flex",
        alignItems: "center",
        marginLeft: "13px"
    },

    wideBtnRightWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "22px",
        marginLeft: "25px"
    },

    wideBtnRight: {
        display: "flex",
        alignItems: "center",
        marginRight: "13px"
    }
})

const PersonCard = (props) => {
    const { id, firstName, lastName } = props;

    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nameFull = `${firstName} ${lastName}`;
    const person_self_ID = id;

    

    const styles = someStyling();

    

    const editClick = () => {
        setEditMode(!editMode);
        setIsModalOpen(true);
    }

    const [remove_person] = useMutation(REMOVE_PERSON, {
        update(cache, { data: { remove_person } }) {
          const { people } = cache.readQuery({ query: GET_PEOPLE })
          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              people: filter(people, c => {
                return c.id !== remove_person.id
              })
            }
          })
        }
      })

    const deleteAction = () => {
        let result = window.confirm('Are you sure you want to delete this user?')
        if (result) {
            remove_person({
                variables: {
                    id
                }
            })
        }
    }

    const saveChanges = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditMode(!editMode)
        },200)
        
    }

    const cancelModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditMode(!editMode)
        },200)
    }

    const { loading, error, data } = useQuery(GET_CARS);

    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`

    console.log("data", data);

    /*----------------------*/

    return (
        <>
            {/*------------------------*/}

            {/* if editMode, show the edit person form */}
            {editMode ? (
                <>
                    <Card
                        style={styles.card_opened_wrapper}
                        title={nameFull}
                        bodyStyle={styles.card_opened_body}
                    >
                        Launching edit form...
                    </Card>

                    <Modal
                        title="Edit User Information:"
                        open={isModalOpen}
                        okText="Save Changes"
                        onOk={saveChanges}
                        onCancel={cancelModal}
                        cancelText="Cancel"
                        centered="true"
                        footer={null}
                    >
                    <EditPersonForm
                        onBtnClick={editClick}
                        id={id}
                        firstName={firstName}
                        lastName={lastName}
                    />
                    </Modal>
                </>
            ) :
            
            // otherwise, just show the buttons meant to trigger the form
            (
                <Card
                    style={styles.card}
                    title={nameFull}
                    headStyle={styles.cardHead}
                    bodyStyle={styles.cardBody}
                    actions={[
                        <div style={styles.wideBtnLeftWrap} onClick={editClick}>
                            <span>Edit User</span>
                            <EditOutlined key="edit" style={styles.wideBtnLeft}/>
                        </div>,
                        <div style={styles.wideBtnRightWrap} onClick={deleteAction}>
                            <DeleteOutlined key="delete" style={styles.wideBtnRight} />
                            <span>Delete User</span>
                        </div>
                        
                    ]}
                >
                    <Row gutter={16}>
                        { data.cars.length ? data.cars.map(({ id, year, make, model, price, personId }) => (
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
                        )) :
                            <Col span={8}>
                                No users detected in the database.
                            </Col>
                        }
                    </Row>
                </Card>
            )}
        </>
    )
}

export default PersonCard