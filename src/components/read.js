// Importing React hooks for side effects and state management
import { useEffect, useState } from "react";
// Importing axios for making HTTP requests
import axios from "axios";
// Importing the Books component to display book items
import Books from "./books";

// Functional component for displaying and managing the read page
function Read() {
  // State variable to store the data fetched from the server
  const [data, setData] = useState([]);

  // useEffect hook to fetch data from the server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/api/books')
      .then((response) => {
        // Updating the state with the fetched data
        setData(response.data);
      })
      .catch((error) => {
        // Handling errors if the data fetching fails
        console.log(error);
      });
  }, []);  

  // Function to reload data by making a new request to the server
  const ReloadData = (e) => {
    axios.get('http://localhost:4000/api/books')
      .then((response) => {
        // Updating the state with the re-fetched data
        setData(response.data);
      })
      .catch((error) => {
        // Handling errors if the data reloading fails
        console.log(error);
      });
  };  

  // Rendering the Read component
  return (
    <div>
      {/* Heading for the Read component */}
      <h2>Hello from Read Component!</h2>
      {/* Rendering the Books component and passing data and reload function as props */}
      <Books myBooks={data} Reload={ReloadData}></Books>
    </div>
  );
}

// Exporting the Read component as the default export of this module
export default Read;
