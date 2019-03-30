import React, { useEffect, useState } from 'react';
import axios from 'axios'


export const app = () => {
  const [results, setResults] = useState([])

  useEffect(() => {
    axios.get(`http://hn.algolia.com/api/v1/search?query=visual+studio+code`)
      .then(response => {
        console.log(response.data)
        setResults(response.data.hits);
      })
  }, [])

  return ( 
    <div>
      {results.map(result => (
        <li key={result.objectID}>
          <a href={result.url}>{result.title}</a>
        </li>
      ))}
    </div>
  );
}
 
export default app;
