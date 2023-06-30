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
    query {
        find_cars_by_personID {
            cars {
                id
                year
                make
                model
                price
                personId
            }
        }
    }
`