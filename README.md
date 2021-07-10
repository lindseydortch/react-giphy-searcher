# React Giphy Searcher Project Tutorial

In this tutorial, we'll go through all of the steps to build a Giphy Searcher app in react that allows users to search the [Giphy API](https://developers.giphy.com/).

## Project Mockup

Our project designer provided us with the following mockup:

<img width="100%" alt="project mockup" src="https://media.git.generalassemb.ly/user/17300/files/d88b5a00-3da9-11ea-9d57-7a742c153636">

Let's get working on building this thing!

### Steps

1.  [Sign up for an API key](#sign-up-for-an-api-key)
1.  [Scaffold your project](#scaffold-your-project)
1.  [Create files for components and empty App](#create-files-for-components-and-empty-app)
1.  [Create barebones SearchForm and SearchResults components](#create-barebones-searchform-and-searchresults-components)
1.  [Add and style the SearchForm component JSX](#add-and-style-searchform-component-jsx)
1.  [Add and style SearchResults component JSX](#add-and-style-searchresults-component-jsx)
1.  [Store your API key safely](#store-your-api-key-safely)
1.  [Add the Giphy API request](#add-the-giphy-api-request)
1.  [Add SearchForm functionality](#add-searchform-functionality)
1.  [Improving the User Experience](#improving-the-user-experience)
1.  [Working with SVGs and addressing a11y](#working-with-svgs-and-addressing-a11y)

## Sign up for an API key

Before starting this project, you'll need to go to the [Giphy Developers site](https://developers.giphy.com/) and obtain an api key.

1.  Create an account and sign in.
1.  Set up an app by clicking the Create App in the navbar to obtain your beta key.

## Scaffold your project

1. Change into your `sei/labs` directory with:

```bash
cd ~/sei/labs
```

2. Run Create React App to scaffold your project by typing:

```bash
npx create-react-app react-giphy-searcher
```

3. Change directories into the newly created project directory:

```bash
cd ~/sei/labs/react-giphy-searcher
```

4. Open the project in VS Code:

```bash
code .
```

5. Back in the Terminal, run your server:

```bash
npm run start
```

## Create files for components and empty App

Remove the imports for the `App.css` file and the `logo.svg`. We won't need either of these files, so we can delete them as well from the project's `src` directory. Next, empty the App component function.

We'll be using [Hooks](https://reactjs.org/docs/hooks-overview.html) to build our app so your App component can be a simple function that returns just a `div` containing a single `h1` with the app name in it. Make sure you don't have any errors and that the app is running in the browser before moving on to the next step.

```JSX
import React from 'react';

function App() {
  return (
    <div>
      <h1>Giphy Searcher</h1>
    </div>
  );
}

export default App;
```

After your App.js file is set up, create a new directory inside of the `src` directory of the project and name it `components`. Inside the components directory create a `SearchForm.js` and a `SearchResults.js` file.

[View the commit](../../commit/49e9fdd)

## Create barebones SearchForm and SearchResults components

Next, we need to scaffold out both the SearchForm and SearchResults components. In both cases we're just going to build a basic functional component like the App component with each returning an `h2` element displaying the component's name.

Once you've completed both components, import them into App.js and add them into the JSX below the `<h1>` element:

```JSX
import React from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <div>
      <h1>Giphy Searcher</h1>
      <SearchForm />
      <SearchResults />
    </div>
  );
}

export default App;
```

Once again, make sure you don't have any errors. You should now see the titles for SearchForm and SearchResults displaying.

[View the commit](../../commit/0fdf1d8)

## Add and style the SearchForm component JSX

Replace the placeholder content in the SearchForm
component with a form. We're not going to worry about the functionality yet. We're just going to get our form styled to look like the project's mock up.

```JSX
function SearchForm() {
  return (
    <form className="form-horizontal">
      <input placeholder="Search" type="text" name="searchString" required />
      <button type="submit">Search</button>
    </form>
  );
}
```

To style the form, we're going to use flexbox to display the input and button on the same line. Even though inputs and buttons display inline by default, with flexbox, we can tell the input to grow to take up as much space as possible while the button should remain it's natural width.

In the `src/index.css` file delete the styles and add the following styles:

```css
/* Set box-sizing for all elements */
*,
:after,
:before {
  box-sizing: border-box;
}

/* Create color variables */
:root {
  --primary: #5f9ae0;
  --secondary: #ff7f50;
  --secondary-light: #ffa483;
  --white: #fff;
}

/* Remove the body margin */
body {
  font-family: sans-serif;
  line-height: 1.5;
  margin: 0;
  padding: 0 1rem;
}

/* Style the button and tell it not to grow */
button {
  background-color: var(--primary);
  border: 0;
  color: var(--white);
  flex-grow: 0;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0.75rem 1rem;
  text-transform: uppercase;
}

/* Add some margin on the left of any buttons
that follow another button or an input */
button + button,
input + button {
  margin-left: 2px;
}

form {
  padding: 1rem 0;
}

/* Style the input and tell it to grow */
input {
  background-color: var(--secondary-light);
  border: 2px solid var(--secondary);
  color: var(--white);
  flex-grow: 1;
  font-size: 1.2rem;
  padding: 0.75rem 1rem;
  width: 100%;
}

/* Set the color of the placeholder text */
input::placeholder {
  color: var(--white);
}

/* Change the background of the input when
it is focused or hovered and remove its
default outline */
input:focus,
input:hover {
  background-color: var(--secondary);
  outline: 0;
}

/* Apply flex to the form */
.form-horizontal {
  align-items: center;
  display: flex;
}

/* Add a media query to add more space between
the button and input when the browser is at least
600px wide */
@media (min-width: 600px) {
  button + button,
  input + button {
    margin-left: 1rem;
  }
}
```

Check the result in the browser and make sure that the form with the input and button display properly before moving on to the next step.

[View the commit](../../commit/35a9fc4)

## Add and style SearchResults component JSX

Now we'll replace the placeholder content in the SearchResults component with some static images so we can style the component to look like the supplied design. Let's start by adding an array of objects containing image urls. Copy the array below into the `App.js` file. You can add it **above** the function for the App and **below** the import statements at the top of the file.

```js
const images = [
  {
    id: 1,
    url: 'https://media.giphy.com/media/3DsNP07nApt1eEyjvM/giphy.gif'
  },
  {
    id: 2,
    url: 'https://media1.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif'
  },
  {
    id: 3,
    url:
      'https://www.thisiscolossal.com/wp-content/uploads/2018/04/agif2opt.gif'
  },
  {
    id: 4,
    url: 'https://media.giphy.com/media/3oEdva9BUHPIs2SkGk/giphy.gif'
  },
  {
    id: 5,
    url: 'https://media.giphy.com/media/3o6ozoD1ByqYv7ARIk/giphy.gif'
  },
  {
    id: 6,
    url: 'https://buffer.com/library/wp-content/uploads/2016/06/giphy.gif'
  },
  {
    id: 7,
    url: 'https://media4.giphy.com/avatars/default5.gif'
  },
  {
    id: 8,
    url: 'https://media2.giphy.com/media/3oEduPff5ErjNmlbwY/source.gif'
  }
];
```

Now that we have an array of images, we can pass that array as a prop to the SearchResults component.

```JSX
<SearchResults images={images} />
```

Inside of the SearchResults component, we can destructure the images from props and map over the array to output a `div` containing an `img` element for each element in the array. We'll also want to make sure that we've got a way to display an image if there are no images in the array. Add a class of `gallery` to the outer wrapping `div` so we can style it.

If there are no images, we'll just return an `h2` that reads: No Images Found!. Remember that the code inside an if statement block only runs if the condition in the parentheses evaluates to true. So, if it's true that the images array has no length, then the return statement runs and the rest of the function is ignored. If the condition is not true &mdash; meaning the images array does have a length &mdash; it skips the code block and runs the return to display the search results.

```JSX
const SearchResults = ({ images }) => {
  // return early if there are no images
  if (!images.length) {
    return <h2>No Images Found!</h2>
  }

  return (
    <div className="gallery">
      {images.map(image => (
        <div key={image.id} className="gif">
          <img src={image.url} />
        </div>
      ))}
    </div>
  )
}
```

We definitely need to add some styles, but at this point, you should see the images appear on the page in the browser. Nice work!

To start, let's give the images some base styles. In the index.scss, add some css to make the images have a width of `100%` and give them each a margin on the bottom of `1rem`:

```css
img {
  margin-bottom: 1rem;
  width: 100%;
}
```

That improves things on mobile devices. Ideally, we want to have the images display stacked on mobile devices, but on larger devices, they should be in neat columns. CSS Flexbox — with or without the help of Bootstrap's grid classes — can make the images line up in rows horizontally, but since our images aren't all the same height, each row will have a height that is based on the tallest image in the row. This will produce unattractive gaps in the design as seen below on the left. What we really want is for the images to stack tightly in columns like the example on the right.

![gaps](https://media.git.generalassemb.ly/user/17300/files/74556c80-1151-11ea-8c04-a058242add12)

To accomplish this, we can use CSS Columns. The CSS column-count property is used to set the number of columns and we'll just adjust this at different breakpoints using a few media queries. We've already got one media query at 600px, so we'll add the `gallery` class and set the `column-count` to `2` at this breakpoint. Then, we'll add two more media queries with the following CSS.

> **Remember, the order of the media queries matters!**

```css
@media (min-width: 600px) {
  button + button,
  input + button {
    margin-left: 1rem;
  }

  .gallery {
    column-count: 2;
  }
}

@media (min-width: 1000px) {
  .gallery {
    column-count: 3;
  }
}

@media (min-width: 1400px) {
  .gallery {
    column-count: 4;
  }
}
```

Check out the results in the browser and make sure to test the design at multiple breakpoints by resizing your browser. If all is well, `git add` and `git commit` your changes to this point.

[View the commit](../../commit/ecdfc76)

## Store your API key

As developers, we need to guard against our API keys being pushed to Github. One way to ensure that this doesn't happen is to store them in a separate file that is not tracked in Git at all.

The way we tell Git to ignore certain files is through a special file that is named `.gitignore`. This file must be placed in the root directory of the git repository. Conveniently, create-react-app automatically creates this file for us and adds a handful of files to it that are commonly excluded from Git. The `.env.local` file is one example of a file that is ignored by default.

To use this file to store your API keys, you create your variables in it and then reference them anywhere in your JavaScript files via a special object named `process.env`.

Create a new file in the project root directory (in the outer project folder where the README.md file is **not** in the `src` directory) called `.env.local`. Yes, this file's name starts with a dot (`.`)! Make sure you name it **_exactly_** as you see it here.

Inside this file add the following, replacing where it reads `YourAPIkeyGoesHere` with your Giphy API key (don't add any quotes around your API key):

```md
REACT_APP_GIPHY_KEY=YourAPIkeyGoesHere
```

When your app loads environment variables like the `REACT_APP_GIPHY_KEY` variable that we just created are loaded into memory. This means that _if your server is already running_, you need to stop it and restart it after adding or changing an environment variable, so do that now.

## Add the Giphy API request

Navigate to the [Giphy API Explorer](https://developers.giphy.com/explorer) and choose **search** from the endpoint dropdown. In the **Request URL** it should now display:

```md
https://api.giphy.com/v1/gifs/search?api_key=your-api-key-here&q=&limit=25&offset=0&rating=G&lang=en
```

We'll create an object to store all of the options for the Giphy API url and store it in the App component. Your API key that is stored in the `.env.local` file is accessible with `process.env.REACT_APP_GIPHY_KEY`.

```js
function App() {
  const searchOptions = {
    key: process.env.REACT_APP_GIPHY_KEY,
    limit: 25,
    rating: 'G',
    api: 'https://api.giphy.com/v1/gifs',
    endpoint: '/search'
  };
  // ... the rest of your code
}
```

Import both the useEffect and useState hooks into App.js by destructuring them in your React import at the top of the file. Now we can delete the static images array in this file and create an array in state for the images instead. Initialize images with an empty array.

```js
const [images, setImages] = useState([]);
```

Next, we'll use the useEffect hook so we can make a request to the Giphy API when the App component mounts and retrieve some images. We're going to have to make the exact same request each time the user performs a new search, so it makes sense to write a separate function to make the request. We'll call that function `getImages` and write it in the next step.

```js
useEffect(() => {
  getImages();
}, []);
```

The getImages function needs to construct a request URL
from the options; make the request to the Giphy API; and, if successful, set the response in the images array in state. We want to test things out before we connect our search form, so we'll just create a `searchString` variable inside of getImages to hold a string so we can simulate the results.

```js
function getImages() {
  const searchString = 'minions';
  /* Build a URL from the searchOptions object */
  const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}&q=${searchString} &limit=${searchOptions.limit}&offset=${searchOptions.offset}&rating=${searchOptions.rating}&lang=en`;

  fetch(url)
    .then(response => response.json())
    .then(response => {
      setImages(response.data);
    })
    .catch(console.error);
}
```

Cool, we're almost there... we just need to change the image src in SearchResults component to
display the image from `image.images.downsized_large.url` now.

```JSX
{images.map(image => (
  <div key={image.id} className="gif">
    <img src={image.images.downsized_large.url} />
  </div>
))}
```

Check it out in the browser! You should now see 25 gifs coming from Giphy. Manually change the searchString value in the getImages function and you should get a new set of gifs. If things are working, go ahead and `git add` and `git commit` your changes.

[View the commit](../../commit/cd8422b)

## Add SearchForm functionality

With the API request working, we need to add the SearchForm functionality. First, let's add searchString to our state in the App. We can initialize it with a value of our choice so that images are loaded when the page loads.

```js
const [searchString, setSearchString] = useState('minions');
```

Make sure to **delete the local variable inside the getImages function** to use the searchString in state as the query value.

To connect the searchString in state with the value in our form, we'll need a handleChange and handleSubmit function in the App component that we can pass down to the SearchForm component as props.

```js
function handleChange(event) {
  setSearchString(event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  getImages();
}
```

Now you can pass all these along to the SearchForm component as props:

```JSX
<SearchForm
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  searchString={searchString}
/>
```

Lastly, we need to wire up our form. In the SearchForm component, add an `onSubmit` attribute to the form element and set it to the handleSubmit function we passed to the SearchForm as a prop. Similarly, in the input element, add an `onChange` attribute and set it to the handleChange function that is received as a prop. All that's left is to add the `value` attribute to the input and set it to the
`searchString` prop.

```JSX
  // Destructure props object
function SearchForm({ handleSubmit, handleChange, searchString }) {
  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <input
        placeholder="Search"
        type="text"
        name="searchString"
        required
        onChange={handleChange}
        value={searchString}
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

Test it out in the browser by typing something in the search field and pressing enter or clicking the search button.

[View the commit](../../commit/6bc127f)

## Improving the User Experience

Currently, the search input remains populated even after the form is submitted. This isn't a good user experience. We can easily improve the UX by setting the `searchString` to an empty string when the form is submitted. This will cause the SearchForm input to be reset, but it introduces another problem. When the input is cleared, the user no longer knows what search string was used to produce the current results that are being displayed.

Let's add a new bit of data into state in the App component called `lastSearch`. Now, we'll change up the getImages function a bit so that it will receive a searchString as an argument. This is arguably better than just leaving it to use the value that is currently in state when the function runs. It also means that we can safely use the searchString as the value we pass to `setLastSearch` because we don't need to worry about the asynchronous way in which state is updated.

```js
function App() {
  ...
  const [lastSearch, setLastSearch] = useState('');

  useEffect(() => {
    // Pass the searchString to getImages
    getImages(searchString);
  }, []);

  // This function now needs a parameter
  function getImages(searchString) {
    const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}&q=${searchString}&limit=${searchOptions.limit}&offset=${searchOptions.offset}&rating=${searchOptions.rating}&lang=en`;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        setImages(response.data);
        // Set the lastSearch to the searchString value
        setLastSearch(searchString);
        // Set the searchString in state to an empty string
        setSearchString('');
      })
      .catch(console.error);
  }
  ...
  function handleSubmit(event) {
    event.preventDefault();
    // Don't forget to pass the searchString to getImages
    getImages(searchString);
  }
}
```

Next, we'll add a simple, separate SearchHeader component to display the app name and the last search value.

```jsx
import React from 'react';

function SearchHeader({ lastSearch }) {
  return (
    <header>
      <h1>Giphy Searcher</h1>
      <p className="muted">
        Showing results for <strong>{lastSearch}</strong>
      </p>
    </header>
  );
}
export default SearchHeader;
```

Replace the `h1` element in the App component with the new SearchHeader. Import the SearchHeader component into App and pass it lastSearch as a prop.

```js
<SearchHeader lastSearch={lastSearch} />
```

Style the header using Flexbox:

```css
/* Add a muted to the existing color variables in :root  */
:root {
  /* ... */
  --muted: #a1a1a1;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
}

h1,
p {
  margin: 0;
}

.muted {
  color: var(--muted);
}

/* Add a header declaration to the existing 
media query for screen sizes of 1000px or more  */
@media (min-width: 1000px) {
  header {
    align-items: center;
    flex-direction: row;
  }
  /* ...  */
}
```

If you check the browser, things should be looking really good. In the next step we'll amp up the design with a logo, a matching favicon and use an icon instead of the text in the search button. In addition, we'll make sure we've considered and fixed some accessibility issues.

[View the commit](../../commit/5a6cd13)

## Working with SVGs and addressing a11y

Scalable Vector Graphics (SVGs) are graphics that are defined by 2D points and primative shapes and written in a special markup language. What this means is that SVGs can be edited with a text editor and manipulated with JavaScript and styled using CSS just like HTML elements. It also means that SVGs can be scaled to any size without losing quality while being extremely small in terms of file size compared with raster image formats such as `*.png` or `*.jpg` files.

### Embedding SVGs in HTML

One way that you can use SVGs in web applications is to store an SVG file in your application and load it with an HTML `img` element. Let's create a logo for our app and use this technique to display the image in the SearchHeader. Create a new file in the `src` folder and name it `giphy-searcher-logo.svg`. The extension is important. Then copy the markup below and paste it in the file.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path fill="#FF7F50" d="M505,442.7L405.3,343c-4.5-4.5-10.6-7-17-7H372c2.1-2.7,4.1-5.4,6.1-8.2c-0.2,0.1-0.4,0.2-0.6,0.3
	c-5.5,8.5-12.2,16.3-19.9,23.5c-0.3,0.3-0.5,0.5-0.8,0.8c-0.3,0.3-0.6,0.6-0.9,0.9c-0.6,0.6-1.3,1.3-1.9,1.9
	c-0.2,0.2-0.5,0.5-0.7,0.7c-0.9,0.8-1.7,1.7-2.6,2.5c-0.1,0.1-0.1,0.1-0.2,0.2c-4.6,5-9.5,9.5-14.6,13.5v16.2c0,6.4,2.5,12.5,7,17
	l99.7,99.7c9.4,9.4,24.6,9.4,33.9,0l28.3-28.3C514.3,467.3,514.3,452.1,505,442.7z"/>
<path fill="#222222" d="M416,208C416,93.1,322.9,0,208,0S0,93.1,0,208s93.1,208,208,208c48.3,0,92.7-16.4,128-44v2.1
	c5.4-8.2,11.9-15.8,19.4-22.7c5.3-5.7,11-10.9,17.1-15.4H372C399.6,300.7,416,256.3,416,208z"/>
<path fill="#5F9AE0" d="M355.4,272c-6.6,20.3-17.9,37.8-33.8,52.6c-14.8,15.9-32.3,27.2-52.6,33.8c-19.5,10.2-40.5,14.9-63,14.1
	c-29.5-0.1-57-7.5-82.5-22.3c-11-8.5-22.1-17-33.1-25.6c-20.3-20.4-34.3-44.4-42-72.1c-1.9-14.5-3.9-29-5.8-43.5
	c-0.8-22.5,3.8-43.5,14.1-63c6.6-20.3,17.9-37.8,33.8-52.6c14.8-15.9,32.3-27.2,52.6-33.8c19.5-10.2,40.5-14.9,63-14.1
	c29.5,0.1,57,7.5,82.5,22.3c11,8.5,22.1,17,33.1,25.6c20.3,20.4,34.3,44.4,42,72.1c1.9,14.5,3.9,29,5.8,43.5
	C370.3,231.5,365.7,252.5,355.4,272z"/>
<path fill="#92C3F4" d="M349.6,278.6c-14.8,15.9-32.3,27.2-52.6,33.8c-19.5,10.2-40.5,14.9-63,14.1c-29.5-0.1-57-7.5-82.5-22.3
	c-11-8.5-22.1-17-33.1-25.6c-20.3-20.4-34.3-44.4-42-72.1c-1.9-14.5-3.9-29-5.8-43.5c-0.8-22.5,3.8-43.5,14.1-63
	c0.1-0.5,0.3-0.9,0.5-1.4c-13.1,13.7-22.6,29.4-28.5,47.4c-10.2,19.5-14.9,40.5-14.1,63c1.9,14.5,3.9,29,5.8,43.5
	c7.8,27.7,21.8,51.7,42,72.1c11,8.5,22.1,17,33.1,25.6c25.5,14.8,53,22.2,82.5,22.3c22.5,0.8,43.5-3.8,63-14.1
	c20.3-6.6,37.8-17.9,52.6-33.8c15.6-14.5,26.7-31.6,33.3-51.3C353.2,275.1,351.5,276.9,349.6,278.6z"/>
</svg>
```

Save and close the file.  Then, import the file into the SearchHeader.js as `import logo from '../giphy-searcher-logo.svg';`

Now, in the SearchHeader component return statement, replace the `h1` element with the following:

```jsx
<div className="brand">
  <img src={logo} alt="" />
  <h1>Giphy Searcher</h1>
</div>
```

If you check the results in the browser you should now see the new logo. Add the following CSS to the `index.css` file style the image and h1, and check the result again in the browser:

```css
.brand {
  align-items: center;
  display: flex;
  width: auto;
}

.brand img {
  height: 2rem;
  margin: 0 0.5rem 0 0;
  width: auto;
}

.brand h1 {
  font-weight: 200;
  letter-spacing: -1px;
  margin-right: 1rem;
  white-space: nowrap;
}
```

Cool! Now we have a logo. One thing to note here is that when we embedded the image into the page with the `<img>` tag, we used an empty `alt` tag. If this had been a 'real' logo where the text of the app name was part of the logo image, we would have used the `"Giphy Searcher"` as the alt text. According to the HTML specification, **every image must have an alt attribute**, but the use of a 'null' alt tag is acceptable when the image is purely decorative and we intend to have screen readers ignore it entirely.

### Making a favicon

To make the favicon match the logo on the page, use [Convertio](https://convertio.co/svg-ico/) to convert the giphy-searcher-logo.svg into a `.ico` file type. In React projects you'll store this file in the public folder as well. Make sure to delete the favicon in the public folder and change the name of the file you download from Convertioto favicon.ico.

### Using SVGs inline

Next we'll create another SVG as a component and use it in lieu of the text on the search button. Start by creating a new folder and file within it in the src directory: `src/shared/AppIcons.js`. This file can contain many icons in the future. Each icon will be a separate, reuseable component. Since we want to have several components in the same file, we're not going export a default component, instead we'll export them individually using the `export` before each component's function. Initially, the AppIcons file should be:

```jsx
import React from 'react';

export const SearchIcon = ({ height, width }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height || '1rem'}
    width={width || '1rem'}
    role="img"
    aria-labelledby="title"
  >
    <title id="title">Search</title>
    <path
      fill="currentColor"
      d="M9.516 14.016c2.484 0 4.5-2.016 4.5-4.5s-2.016-4.5-4.5-4.5-4.5 2.016-4.5 4.5 2.016 4.5 4.5 4.5zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281c-1.125 0.984-2.625 1.547-4.219 1.547-3.609 0-6.516-2.859-6.516-6.469s2.906-6.516 6.516-6.516 6.469 2.906 6.469 6.516c0 1.594-0.563 3.094-1.547 4.219l0.281 0.281h0.797z"
    ></path>
  </svg>
);
```

The SearchIcon component is a functional component (without state) that returns the SVG element. It takes two arguments, one for height and the other to set its width. Both height and width have default values of `1rem`.

Also, the SVG uses two special accessibility attributes: `role` and `aria-labelledby`. The `role` property when set to `image` is important because it tells screen readers to treat the entire SVG as one image element versus trying to parse it into its individual parts represented by each of its children tags. The value of the `aria-labelledby` attribute is the `id` of another element on the page whose content will be used to describe the SVG, similar to how an `alt`attribute is used in an `img` element.

To use the SearchIcon, it needs to be imported into the SearchForm component. The import statement will use the destructuing technique we've used before:

```jsx
import { SearchIcon } from '../shared/AppIcons';
```

Next, replace the text `search` in the submit button with the SearchIcon component and pass it props for height and width.

```jsx
<button type="submit">
  <SearchIcon height="2rem" width="2rem" />
</button>
```

Inline SVGs are easy to manipulate with CSS and JS. You treat them just like HTML elements except that they have different CSS properties (like `fill` instead of `background-color` and several stroke properties). Want to make your own SVGs? Try [Inkscape](https://inkscape.org/en/). It's a free and open source vector graphics program for Mac, Windows and Linux.

### Add alt text for images

If we audit our site for a11y issues, we'll see that earlier when we created our SearchResults component we didn't add the `alt` tag on the images. Do that now by replacing the `img` tag inside the map operation.

```jsx
<img src={image.images.downsized_large.url} alt={image.title} />
```

### Color contrast for accessibility

Contrast and color use are vital to accessibility. Users with visual disabilities may not be able to perceive content on the page if there isn't enough contrast between the foreground and background colors, for example. There are many ways to check for contrast. Firefox even has an [Accessibility Inspector](https://www.youtube.com/watch?v=7mqqgIxX_NU) with a built in contrast checker, but there are also many reliable ones online, including the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

According to the tests for our design, the `--muted` color does not provide enough contrast. It only has a contrast ratio of **2.58:1**. The target for contrast of text >= 14px (normal paragraph text is 16px). Changing the color to `--muted: #949494;` bumps up the contrast sufficiently, putting it above the target contrast ratio, giving us a score of **3.03:1**.

[View the commit](../../commit/55df875)

## Bonus

Finished up and want more? Work on your own to add these features:

- Create a new component for each image and have the SearchResults component render that component
- Create options for the user to change the number of images to return; the rating of the images; and which API to use.
- Click on an image to copy its url to the clipboard.
- Show and hide the options panel.
- Use React Router to allow the user to see a _details_ view for each gif like the [Giphy.com](http://giphy.com/) site.
