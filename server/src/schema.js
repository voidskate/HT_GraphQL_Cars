import find from "lodash.find"

const peopleArray = [
    {
      id: '1',
      firstName: 'Bill',
      lastName: 'Gates'
    },
    {
      id: '2',
      firstName: 'Steve',
      lastName: 'Jobs'
    },
    {
      id: '3',
      firstName: 'Linux',
      lastName: 'Torvalds'
    }
  ]
  
  const carsArray = [
    {
      id: '1',
      year: '2019',
      make: 'Toyota',
      model: 'Corolla',
      price: '40000',
      personId: '1'
    },
    {
      id: '2',
      year: '2018',
      make: 'Lexus',
      model: 'LX 600',
      price: '13000',
      personId: '1'
    },
    {
      id: '3',
      year: '2017',
      make: 'Honda',
      model: 'Civic',
      price: '20000',
      personId: '1'
    },
    {
      id: '4',
      year: '2019',
      make: 'Acura',
      model: 'MDX',
      price: '60000',
      personId: '2'
    },
    {
      id: '5',
      year: '2018',
      make: 'Ford',
      model: 'Focus',
      price: '35000',
      personId: '2'
    },
    {
      id: '6',
      year: '2017',
      make: 'Honda',
      model: 'Pilot',
      price: '45000',
      personId: '2'
    },
    {
      id: '7',
      year: '2019',
      make: 'Volkswagen',
      model: 'Golf',
      price: '40000',
      personId: '3'
    },
    {
      id: '8',
      year: '2018',
      make: 'Kia',
      model: 'Sorento',
      price: '45000',
      personId: '3'
    },
    {
      id: '9',
      year: '2017',
      make: 'Volvo',
      model: 'XC40',
      price: '55000',
      personId: '3'
    }
  ]

  /*-------------------------*/

  const typeDefs = `
    type Person {
        id: String!
        firstName: String
        lastName: String
    }

    type Car {
      id: String!
      year: String
      make: String
      model: String
      price: String
      personId: String
    }

    type Query {		
        people: [Person]
        find_person_by_ID(id: String!): Person

        cars: [Car]
        find_car_by_ID(id: String!): Car
        find_cars_by_personID(personId: String!): [Car]
        find_cars_by_brand(make: String!): [Car]
    }
`

// note to self: add Mutation next

const resolvers = {
    Query: {
        people: () => peopleArray,
		cars: () => carsArray,

		// 🧍 return a person via knowing their ID
        find_person_by_ID: (parent, args, contacts, info) => {
            return find(peopleArray, { id: args.id })
        },

		// 🚕 return a car via knowing its ID
        find_car_by_ID: (parent, args, contacts, info) => {
            return find(carsArray, { id: args.id })
        },

		// 🚕 find out the cars that a certain person owns
		find_cars_by_personID: (parent, args, contacts, info) => {
			return carsArray.filter(car => car.personId === args.personId);
		},

		// 🚕 return all cars from a certain brand
		find_cars_by_brand: (parent, args, contacts, info) => {
			return carsArray.filter(brand => brand.make === args.make);
		}
		  
    }
}

export { typeDefs, resolvers }
