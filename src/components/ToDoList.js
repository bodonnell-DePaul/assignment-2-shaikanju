import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import todos from '../todoItems';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Form.css';

function getDateDifference(date1, date2) {
    // Create Date objects
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endDate - startDate;

    // Convert milliseconds to days
    const millisecondsInADay = 1000 * 60 * 60 * 24; // 1000 ms * 60 sec * 60 min * 24 hours
    const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInADay);

    if (differenceInDays > 7) {
        return "primary"
    }
    if (differenceInDays > 4 && differenceInDays < 7) {
        return "success"
    }
    if (differenceInDays > 2 && differenceInDays < 4) {
        return "warning"
    }
    if (differenceInDays < 2) {
        return "danger"
    }

}

function TodoList() {
    const today = new Date();
    const year = today.getFullYear(); // Get full year
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-11, so add 1) and pad with 0 if necessary
    const day = String(today.getDate()).padStart(2, '0');
    const now = `${year}-${month}-${day}`;
    const [todoss, setTodos] = useState(todos);

    return (
        <Container className="mt-4">
            {/* Ensure both components are in the same Row */}
            <Row className="mt-4">
                {/* Define column widths for each component */}
                <Col md={3}>
                    <h3>Assignment 2: ToDo List</h3> {/* Add title here */}
                    <Form className='form'>
                        <Row className="mb-3">
                            <Form.Group as={Row} controlId="formGridEmail" className='group' >
                                <Form.Label className='formLabel'>ToDo Item</Form.Label>
                                <Form.Control className='input' type="text" placeholder="Add todo item" />
                            </Form.Group>

                            <Form.Group as={Row} controlId="formGridPassword">
                                <Form.Label className='formLabel'>Due Date</Form.Label>
                                <Form.Control className='input' type="date" placeholder="Password" />
                            </Form.Group>
                        </Row>



                        <Button variant="primary" type="submit" className="button">
                            Add Todo
                        </Button>
                    </Form> {/* Form */}
                </Col>
                <Col md={9}>
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link0">
                        <Row>
                            <Col sm={4}>
                                <ListGroup>
                                    {todoss.map((item, index) => (

                                        <ListGroup.Item action href={`#link${index}`} variant={getDateDifference(now, item.dueDate)} key={index}>


                                            <h5>{item.title}</h5>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content>
                                    {todoss.map((item, index) => (
                                        <Tab.Pane eventKey={`#link${index}`} key={index}>
                                            <div
                                                contentEditable
                                                suppressContentEditableWarning={true}
                                                onBlur={(e) => {
                                                    const updatedTodos = [...todos];
                                                    updatedTodos[index].description = e.target.innerText;
                                                    setTodos(updatedTodos); // Update the state
                                                }}
                                            >
                                                {item.description}
                                            </div>
                                            <input
                                                type="date"
                                                value={item.dueDate}
                                                onChange={(e) => {
                                                    const updatedTodos = [...todos];
                                                    updatedTodos[index].dueDate = e.target.value; // Update due date from input
                                                    setTodos(updatedTodos); // Update the state
                                                }}
                                            />
                                            {/* <div
                                    contentEditable
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => {
                                        const updatedTodos = [...todos];
                                        updatedTodos[index].dueDate = e.target.innerText;
                                        setTodos(updatedTodos); // Update the state
                                    }}
                                >
                                    {item.dueDate}
                                </div> */}
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Col>
            </Row>


        </Container>
    );
}

export default TodoList;