
const mockSnacksData = [{
    "id": "nachos",
    "name": "Nachos",
    "description": "An American classic!",
    "recipe": "Cover expensive, organic tortilla chips with Cheez Whiz.",
    "serve": "Serve in a hand-thrown ceramic bowl, garnished with canned black olives"
},
{
    "id": "hummus",
    "name": "Hummus",
    "description": "Sure to impress your vegan friends!",
    "recipe": "Purchase one container of hummus.",
    "serve": "Place unceremoniously on the table, along with pita bread."
}];
const mockDrinksData = [{
    "id": "martini",
    "name": "Martini",
    "description": "An ice-cold, refreshing classic.",
    "recipe": "Mix 3 parts vodka & 1 part dry vermouth.",
    "serve": "Serve very cold, straight up."
},
{
    "id": "negroni",
    "name": "Negroni",
    "description": "A nice drink for a late night conversation.",
    "recipe": "Mix equal parts of gin, Campari, and sweet vermouth.",
    "serve": "Serve cold, either on the rocks or straight up."
},
{
    "id": "gin-and-tonic",
    "name": "Gin and Tonic",
    "description": "Like regular tonic, but with gin.",
    "recipe": "Mix 2 parts gin & 1 part tonic water.",
    "serve": "Serve in a tall glass over ice, garnished with a lime wedge."
}];

let mockFood = [
    { menu: "snacks", title: "Snacks", items: mockSnacksData },
    { menu: "drinks", title: "Drinks", items: mockDrinksData }
];

export { mockSnacksData, mockDrinksData, mockFood };