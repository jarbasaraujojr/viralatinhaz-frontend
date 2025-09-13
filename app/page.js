"use client";
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
        const response = await fetch(`${apiUrl}/animals`);

        if (!response.ok) {
          throw new Error('Falha ao buscar os dados da API.');
        }

        const data = await response.json();
        setAnimals(data.animals);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnimals();
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: 'center', paddingTop: '50px' }}>Carregando animais...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', paddingTop: '50px', color: 'red' }}>Erro: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Lista de Animais</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {animals.length > 0 ? (
          animals.map((animal, index) => (
            <li key={index} style={{ padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '5px' }}>
              <strong>Nome:</strong> {animal.name} - <strong>Espécie:</strong> {animal.species}
            </li>
          ))
        ) : (
          <p>Nenhum animal encontrado.</p>
        )}
      </ul>
    </div>
  );
}
