import { useState, useEffect } from 'react';
import firebase from './firebase';
import './App.css';

function App() {

  const [ bookList, setBookList ] = useState([]);
  const [ userInput, setUserInput ] = useState("");

  // THIS IS THE USEEFFECT
  useEffect( () => {
    // We go get an object that REFERENCES our configured database:
    const dbRef = firebase.database().ref();

    // We set up a listener for data in our firebase, which will fire ON any instance where those VALUES appear (ie. the page loads) or those VALUES change (this is often referred to as a SUBSCRIPTION to a third-party data source):
    dbRef.on('value', (snapshot) => {
      const myData = snapshot.val();

      const newArray = [];

      for (let propertyName in myData) {
        // We create a new object with our key and book title, and then push that whole object into the newArray we just made:
        const bookObject = {
          key: propertyName,
          title: myData[propertyName]
        }

        newArray.push(bookObject);
      }

      setBookList(newArray);
    });
  }, [] );
  // END OF USEEFFECT

  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // We create a reference to our Firebase database:
    const dbRef = firebase.database().ref();

    dbRef.push(userInput);

    setUserInput("");
  }

  const handleDelete = (keyOfBookToDelete) => {
    // Create a reference to our Firebase database:
    const dbRef = firebase.database().ref();

    // Go get the specific node (ie. the property) which we want to delete in Firebase and REMOVE IT:
    dbRef.child(keyOfBookToDelete).remove();
  }

  return (
    <div className="App">
      <h1>CATS</h1>

      <form action="submit" onSubmit={handleSubmit} >
        <label htmlFor="userBookChoice">Write a book to add to the shelf!</label>
        <input
          type="text"
          id="userBookChoice"
          onChange={handleChange}
          value={userInput}
        />

        <button type="submit">Add it!</button>
      </form>

      <ul>
        {
          bookList.map( (bookObject) => {
            return (
              <li key={bookObject.key}>
                <p>{bookObject.title}</p>
                <button
                  onClick={ () => handleDelete(bookObject.key) }
                >
                  Delete this fucking book!
                </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;



// Display our Firebase books on the page
    // - Set up an empty state that will hold our books.
    // - Go get our books from Firebase!
          // - Setting up a connection to Firebase needs to happen only ONCE (when our component mounts) because a firebase listener is like an event listener. We can use useEffect for this!
          // - We need to put those books in state once we get them.
    // - Set up our JSX to print whatever is in state to the page!


// Let the user add books to the database
    // - We need a form on our page, with a text input and a submit button.
    // - We need some way to get the shit the user types from that text input.
            // Maybe we can capture the literal user INTERACTION with our page. That is to say, maybe we can capture the actual KEYSTROKE EVENT that CHANGES the value of our text input, and get the user's shit from there. This will happen *LIVE* as the user types.
            // Since we will be taking in data and updating it live as the app runs (that is to say, we will be updating some local value storage as our app is running), we need to put this value...... IN STATE.
    // - On submit, we want to take that user input that we have captured and push it into Firebase!


// Add a button that lets the user DELETE books from the database
    // - Add a button next to each book in our JSX
    // - Have that button call a function that will find that book in the database and REMOVE IT.
          // - To do this, we will need the unique KEY of the book in question. That is to say, we will need to pass the function the key of the book to delete from firebase, so we can find that key (ie. that property name) in our Firebase structure.
