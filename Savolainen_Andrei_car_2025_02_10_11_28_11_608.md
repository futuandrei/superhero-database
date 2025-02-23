Andrei Savolainen


# **End assignment** (car)


## Task: Create and test CarStorage class
Create a class `CarStorage` for car data. Data storage is passed to the constractor as a parameter. Data is in a json array. Use the following json array as default storage. You may need to modify the data or add more versions for testing. 

### datastorage.json

```json
[
  {
    "carID": 1,
    "name": "FauWee",
    "model": "XXL",
    "price": 15,
    "maxspeed": "70",
    "options": [
      "radar",
      "speedometer",
      "repair set"
    ],
    "info": {
      "notes": "-",
      "consumptionPer100km": 6,
      "powerSource": "gas"
    }
  },
  {
    "carID": 2,
    "name": "Racer",
    "model": "chrome",
    "price": 36,
    "maxspeed": "100",
    "options": [
      "repair set",
      "coffee warmer",
      "clock"
    ],
    "info": {
      "notes": "no comments",
      "consumptionPer100km": 6,
      "powerSource": "gas"
    }
  },
  {
    "carID": 3,
    "name": "Ovlov",
    "model": "silver",
    "price": 36,
    "maxspeed": "100",
    "options": [
      "hook",
      "speedometer",
      "clock"
    ],
    "info": {
      "notes": "no comments",
      "consumptionPer100km": 3,
      "powerSource": "pedalling"
    }
  },
  {
    "carID": 4,
    "name": "Drof",
    "model": "GT",
    "price": 10,
    "maxspeed": "30",
    "options": [
      "speedometer",
      "radar",
      "coffee warmer"
    ],
    "info": {
      "notes": "low emission",
      "consumptionPer100km": 2,
      "powerSource": "electricity"
    }
  },
  {
    "carID": 5,
    "name": "Moustin",
    "model": "VIP",
    "price": 15,
    "maxspeed": "150",
    "options": [
      "repair set",
      "warranty",
      "clock"
    ]
  }
]
```


# CarStorage API

## Constructor

### **constructor(jsondata)**
Initializes CarStorage object

>Parameters:
>>The data storage json object is passed as a parameter to the constructor.

>Returns:
>>

>Throws:
>>If the parameter is missing, constructor throws an error `'data storage missing'`


## Methods


### **get_maxspeed_of_car_by_name(searchKey)**
returns the maxspeed of the car matching the name

>Parameters:
>>searchKey is the name of the car

>Returns:
>>returns the maxspeed of car matching the searchKey name or null if no match is found

>Throws:
>>If a parameter searchValue is missing, an exeption `'missing parameter'` is thrown

### **get_Price(carID)**
get the price of the car

>Parameters:
>>carID of the car which price is to be returned

>Returns:
>>returns the price of a car matching the given carID

>Throws:
>>if no car with the given carID is  found throws an exeption `'nothing found with given searchValue'`

### **get_info(searchKey)**
searches the car matching the searchKey and if match is found returns the info object otherwise null is returned

>Parameters:
>>searchKey is the carID of the car

>Returns:
>>returns the info object of the car matching the searchKey. If no car matching the given searchKey is found or searchKey is missing, null will be returned

>Throws:
>>

### **get_All_cars_By_model(searchValue)**
searches cars with given model

>Parameters:
>>searchValue is the model of the car to be searched

>Returns:
>>Returns an array of car objects of given model. If no car of given model is found, returns an empty array.

>Throws:
>>If a parameter searchValue is missing, an exeption `'missing parameter'` is thrown

### **get_total_price_of_cars_by_model(searchValue)**
returns the total price of all cars that have the same model than the given searchValue

>Parameters:
>>searchValue is the model of the car to be searched

>Returns:
>>total cumulative price of cars matching the searchValue

>Throws:
>>if no car with the given searchValue is  found throws an exeption `'nothing found with given searchValue'`. If a parameter searchValue is missing, an exeption `'missing parameter'` is thrown

# The project

## Create a folder for the testproject
- the name of the folder should be `Savolainen_Andrei_car`
- create **package.json**
  - **`npm init -y`**
- install **jest** as development dependency
  - **`npm install jest --save-dev`**
- create folder `__tests__` for tests
- edit the test script in the **package.json**
- use **datastorage.json** as a data source

## Design test cases in separate .md -file
## Implement all tests and test them to fail
## Implement corresponding methods
## Test the project until all tests pass

## Submit the project folder
Submit your project folder acording to instructions given separately.
Remove the `node_modules` folder before submitting.
The project folder should include `package.json` file