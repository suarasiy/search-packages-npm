import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useAction';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector((state) => state.repositories);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && (
        <ul>
          {data.map((repositories) => (
            <li key={repositories.name}>
              <a href={repositories.url} target="_blank" rel="noreferrer">
                {repositories.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepositoriesList;
