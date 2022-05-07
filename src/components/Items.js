import { Component } from 'react';

import Button from 'react-bootstrap/Button';
//removed Table

import { Accordion } from 'react-bootstrap';

class Items extends Component {

  render() {

    return (
      <section>
        <h2>Items...</h2>
          <Accordion>


        
            {
              this.props.itemsList.map((item, idx) =>
              <Item 
              key={item._id} 
              itemData={item}
              deleteItem={this.props.deleteItem} 
              />
              )
            }
         


          </Accordion>
      </section>
    );
  }
}

class Item extends Component {

  render() {
   
    const itemData = this.props.itemData;

    return (
      <Accordion.Item eventKey='0'>

        <Accordion.Header>{itemData.name}</Accordion.Header>
        <Accordion.Body>{itemData.description}</Accordion.Body>
        <Accordion.Body>
          <Button 
          data-testid={`delete-button-${itemData.name}`}
          onClick={() => this.props.deleteItem(itemData._id)}
          >Delete Item</Button>
          <Button 
          onClick={() => this.props.deleteItem(itemData._id)}
          />
        </Accordion.Body>
      </Accordion.Item>
           
      
    );
  }
}

export default Items;
