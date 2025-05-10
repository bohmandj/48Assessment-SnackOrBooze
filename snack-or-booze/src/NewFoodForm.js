import React, { useState } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Form,
    Input,
    Label
} from "reactstrap";

function NewFoodForm({ allFood, postNewFood }) {
    /* New food form - displays form to create a new food item 
    ** to add to db on submit */

    const { foodMenu } = useParams();
    const [formData, setFormData] = useState({
        menu: foodMenu || "",
        name: "",
        description: "",
        recipe: "",
        serve: ""
    });
    const history = useHistory();

    if (foodMenu) {
        // Ensure menu in url exist or redirect to 404
        const food = allFood.find(f => f.menu === foodMenu);
        if (!food) {
            return <Redirect to="/404" />
        }
    }
    const textInputs = ["name", "description", "recipe", "serve"]

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // check that every input has content
        const responses = Object.values(formData);
        const isFormComplete = responses.every((response, i) => {
            return response.trim() !== "" && response !== textInputs[i];
        });
        if (isFormComplete) {
            // format responses for db entry
            const newItem = {
                id: formData.name.replace(/\s+/g, '-').toLowerCase(),
                name: capitalize(formData.name),
                description: formData.description,
                recipe: formData.recipe,
                serve: formData.serve
            }
            try {
                await postNewFood(formData.menu, newItem);
                let redirect = foodMenu ? foodMenu : formData.menu;
                history.push(`/${redirect}`);
                alert(`New food item '${newItem.name}' created successfully.`);
            } catch (error) {
                console.log(`API POST Request Error: ${error}`)
                alert(`There was an issue with your submission. Please try again.`);
            }
        } else {
            alert("All fields must be filled in order to create the new food item.");
        };
    };


    return (
        <section className="col-md-6">
            <Card>
                <CardBody>
                    <CardTitle><h1>Add a New Food</h1></CardTitle>
                    <Form onSubmit={handleSubmit}>
                        {!foodMenu ?
                            <div className="form-row">
                                <Label htmlFor="menu">Select a menu: </Label>
                                <Input
                                    type="select"
                                    name="menu"
                                    id="menu"
                                    value={formData.menu || ""}
                                    onChange={handleChange}
                                >
                                    <option value="" >New Item Belongs In...</option>
                                    <option value="snacks">Snacks</option>
                                    <option value="drinks">Drinks</option>
                                </Input>
                            </div> :
                            <h4>Adding to {capitalize(formData.menu)} Menu</h4>
                        }
                        {textInputs.map((input) => (
                            <div key={input} className='form-row'>
                                <Label htmlFor={input}>
                                    {`${capitalize(input)}: `}
                                </Label>
                                <Input
                                    id={input}
                                    type="text"
                                    name={input}
                                    placeholder={`Enter item ${input}`}
                                    value={formData[input] || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <Button name="submit">Create New Item!</Button>
                    </Form>
                </CardBody>
            </Card>
        </section>
    )
}

export default NewFoodForm;