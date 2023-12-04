// Importing the BookItem component to render individual book items
import BookItem from "./bookItem";

// Functional component to render a list of books using the BookItem component
function Books(props) {
    // Mapping through the array of books and rendering a BookItem for each book
    return props.myBooks.map(
        (book) => {
            // Rendering a BookItem component with book data and a reload function as props
            return <BookItem myBook={book} key={book._id} reload={() => props.Reload()}></BookItem>
        }
    );
}

// Exporting the Books component as the default export of this module
export default Books;
