import { useEffect, useState } from 'react';
import Grid from './components/Grid';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    const reshuffleCharacters = () => {
        const currentScroll = window.scrollY;
        setCharacters((prev) => shuffleArray(prev));
        requestAnimationFrame(() => {
            window.scrollTo(0, currentScroll);
        });
    };

    useEffect(() => {
        const selectedCharactersId = [
            1344, 1307, 1299, 376, 928, 1303, 259, 1359, 1373, 344, 865, 1293,
        ];

        const fetchCharacter = async () => {
            try {
                const response = await fetch(
                    'https://dattebayo-api.onrender.com/characters'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const result = await response.json();

                const selectedCharacters = result.characters.filter((char) =>
                    selectedCharactersId.includes(char.id)
                );

                setCharacters(shuffleArray(selectedCharacters));
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacter();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return <Grid characters={characters} onReshuffle={reshuffleCharacters} />;
};

export default App;
