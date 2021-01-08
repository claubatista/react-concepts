import React, {useState, useEffect} from 'react';
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: 'teste 4',
	    url: 'github/claubatsita',
	    techs: 'react'
    })

    const newRepository = res.data;
    console.log(newRepository);
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`)
      const newRepositories = repositories.filter((repositoryItem) => repositoryItem.id !== id);
      console.log(newRepositories);
      setRepositories(newRepositories);
    }
    catch {
      console.error("error ao tentar deletar")
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repositoryItem =>
            <li key={repositoryItem.id}>
              {repositoryItem.title}
            <button onClick={() => handleRemoveRepository(repositoryItem.id)}>
              Remover
            </button>
          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
