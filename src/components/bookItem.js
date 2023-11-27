import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function BookItem(props) {
  return (
    <div>
      <Card>
        <Card.Header>{props.myBook.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.myBook.cover} alt={props.myBook.title} />
            <footer>
              {props.myBook.author}
            </footer>
          </blockquote>
        </Card.Body>
        <Link to={"/edit/" + props.myBook._id} className='btn btn-primary'>Edit</Link>

        <Button onClick={(e) => {
          e.preventDefault();

          axios.delete(`http://localhost:4000/api/book/${props.myBook._id}`)
            .then(response => {
              props.reload();
            })
            .catch()
        
        }} variant="danger">Delete</Button>
      </Card>
    </div>
  );
}

export default BookItem;
