# React Native and AppSync - Demo Travel App

This app demonstrates how to integrate React Native & GraphQL using AppSync with optimistic UI and real time subscriptions.

![React Native AppSync](https://i.imgur.com/X3zmWGS.jpg)

### To get started    

1. clone project    

```
git clone https://github.com/dabit3/appsync-graphql-cities.git
```

2. change into directory and install dependencies    

```
cd appsync-graphql-cities && yarn || cd appsync-graphql-cities && npm install
```

3. Update credentials in `./aws-exports`    

4. Run project in either iOS or Android simulators

___

## AppSync Configuration    

For this to work, you must have the following AppSync Schema as well as the `cityId-index` created in your LocationTable (see screenshot below). You must also have the correct resolver mapping template for the `listLocations` query.

#### listLocations request mapping template:    

```
{
    "version": "2017-02-28",
    "operation": "Query",
    "index": "cityId-index",
    "query": {
        "expression": "cityId = :cityId",
        "expressionValues": {
            ":cityId": {
                "S": "$ctx.args.cityId"
            }
        }
    },
    "limit": #if($context.arguments.limit) $context.arguments.limit #else 10 #end,
    "nextToken": #if($context.arguments.nextToken) "$context.arguments.nextToken" #else null #end
}
```

#### Schema    

```
type City {
	id: ID!
	name: String!
	country: String!
	locations: [Location]
}

type CityConnection {
	items: [City]
	nextToken: String
}

input CreateCityInput {
	id: ID!
	name: String!
	country: String!
}

input CreateLocationInput {
	id: ID!
	cityId: ID!
	name: String!
	info: String
}

input DeleteCityInput {
	id: ID!
}

input DeleteLocationInput {
	id: ID!
}

type Location {
	id: ID!
	cityId: ID!
	name: String!
	info: String
}

type LocationConnection {
	items: [Location]
	nextToken: String
}

type Mutation {
	createCity(input: CreateCityInput!): City
	updateCity(input: UpdateCityInput!): City
	deleteCity(input: DeleteCityInput!): City
	createLocation(input: CreateLocationInput!): Location
	updateLocation(input: UpdateLocationInput!): Location
	deleteLocation(input: DeleteLocationInput!): Location
}

type Query {
	getCity(id: ID!): City
	listCities(first: Int, after: String): CityConnection
	getLocation(id: ID!): Location
	listLocations(cityId: ID!, first: Int, after: String): LocationConnection
}

type Subscription {
	onCreateCity(id: ID, name: String, country: String): City
		@aws_subscribe(mutations: ["createCity"])
	onUpdateCity(id: ID, name: String, country: String): City
		@aws_subscribe(mutations: ["updateCity"])
	onDeleteCity(id: ID, name: String, country: String): City
		@aws_subscribe(mutations: ["deleteCity"])
	onCreateLocation(
		id: ID,
		cityId: ID,
		name: String,
		info: String
	): Location
		@aws_subscribe(mutations: ["createLocation"])
	onUpdateLocation(
		id: ID,
		cityId: ID,
		name: String,
		info: String
	): Location
		@aws_subscribe(mutations: ["updateLocation"])
	onDeleteLocation(
		id: ID,
		cityId: ID,
		name: String,
		info: String
	): Location
		@aws_subscribe(mutations: ["deleteLocation"])
}

input UpdateCityInput {
	id: ID!
	name: String
	country: String
}

input UpdateLocationInput {
	id: ID!
	cityId: ID
	name: String
	info: String
}

schema {
	query: Query
	mutation: Mutation
	subscription: Subscription
}
```

### LocationsTable index configuration

![](https://i.imgur.com/W05xPFo.png)
