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