import React, { useEffect, useState } from 'react';
import axios from 'axios'

export const app = () => {
  // So this essentially the this.state of class based components. 'set' is the function called against state object/item
  const [results, setResults] = useState([])
  const [query, setQuery] = useState("Rails")
  const [error, setError] = useState(null)

  const resultData = async () => {
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits)
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    resultData();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    resultData();
  }

  return ( 
    <div className="container">
      <div className="ten columns">
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} className="u-full-width" onChange={event => setQuery(event.target.value)}/>
        <button type="submit" className="button button-primary" onClick={resultData}>Search</button>
        <ul>
          {results.map(result => (
            <li key={result.objectID}>
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      </form>
      {error && <div>{error.message}</div>}
      </div>
    </div>
  );
}
 
export default app;
