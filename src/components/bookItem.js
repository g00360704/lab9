// Importing necessary modules and components from external libraries
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Functional component for rendering a single book item
function BookItem(props) {
  return (
    <div>
      {/* Card component from react-bootstrap to display book information */}
      <Card>
        {/* Displaying book title in the card header */}
        <Card.Header>{props.myBook.title}</Card.Header>
        <Card.Body>
          {/* Blockquote to structure book details */}
          <blockquote className="blockquote mb-0">
            {/* Displaying book cover image */}
            <img src={props.myBook.cover} alt={props.myBook.title} />
            {/* Displaying book author in the footer */}
            <footer>
              {props.myBook.author}
            </footer>
          </blockquote>
        </Card.Body>
        
        {/* Link to the edit page with the book's ID as part of the URL */}
        <Link to={"/edit/" + props.myBook._id} className='btn btn-primary'>Edit</Link>

        {/* Button for triggering the deletion of the book */}
        <Button onClick={(e) => {
          e.preventDefault();

          // Sending a DELETE request to the server to delete the book
          axios.delete(`http://localhost:4000/api/book/${props.myBook._id}`)
            .then(response => {
              // Reloading the book list after successful deletion
              props.reload();
            })
            .catch(error => {
              // Handling errors in case the deletion request fails
              console.error('Error deleting book:', error);
            });
        }} variant="danger">Delete</Button>
      </Card>
    </div>
  );
}

// Exporting the BookItem component as the default export of this module
export default BookItem;
