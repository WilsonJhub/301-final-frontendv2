import React from 'react';

import axios from 'axios';

import { Navbar, Container, Row, Col } from 'react-bootstrap';
import Form from './components/AddItem.js';
import Items from './components/Items.js';
 

const API_SERVER = process.env.REACT_APP_API;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  addItem = async (item) => {
    await axios.post(`${API_SERVER}/items`, item);
    this.getItems();
  }

  getItems = async () => {
    const response = await axios.get(`${API_SERVER}/items`);
    const items = response.data;
    this.setState({ items });
  }

  deleteItem = async (id) => {
    
    try {
      let url = `http://localhost:3001/items/${id}`;
      console.log(url)
      await axios.delete(url);
      // this.getItems();
      let updatedItems = this.state.items.filter(item => {
        console.log("filter: ", item.id, id,"ENDFilter");
        return item._id !== id
      });
      console.log("HERE---->>>>>",updatedItems, "<----------HERE");

      this.setState({
        items: updatedItems
      });

    }
    catch (err) {
      console.log('We have an error: ', err.response.data)
    }
  }

  //delete
  async componentDidMount() {
    await this.getItems();
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">301 Final!</Navbar.Brand>
        </Navbar>
        <Container fluid>
          <Row>
            <Col><h1>Our Items</h1></Col>
          </Row>
          <Row>
            <Col md="auto">
              <Form handleAddItem={this.addItem}
              />
            </Col>
            <Col>
              <Items 
              deleteItem={this.deleteItem}
              itemsList={this.state.items} 
              
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
