import { gql } from "@apollo/client";

export const GET_CARS = gql`
    query {
        cars {
            id
            year
            make
            model
            price
            personId
        }
    }
`

export const GET_PEOPLE = gql`
    query {
        people {
            id
            firstName
            lastName
        }
    }
`

export const PERSON_WITH_CARS = gql`
    query HasCars($personId: String!){
        find_cars_by_personID(personId: $personId){
            id
            year
            make
            model
            price
            personId
        }
    }
`

export const ADD_CAR = gql`
    mutation AddCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!){
        add_car(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId){
            id
            year
            make
            model
            price
            personId
        }
    }
`

export const EDIT_CAR = gql`
    mutation EditCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!){
        edit_car(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId){
            id
            year
            make
            model
            price
            personId
        }
    }
`

export const GET_PERSON_BY_ID = gql`
    query GetPerson($id: String!){
        find_person_by_ID(id: $id){
            id
            firstName
            lastName
        }
    }
`

export const REMOVE_CAR = gql`
    mutation RemoveCar($id: String!){
        remove_car(id: $id){
            id
            year
            make
            model
            price
            personId
        }
    }
`