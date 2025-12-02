import './Grid.css';

const Grid = ({ characters, onReshuffle }) => {
    return (
        <div className="card-container">
            {characters.map((character) => {
                return (
                    <div
                        key={character.id}
                        className="card"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onReshuffle();
                        }}
                    >
                        <img
                            src={
                                character.images?.[1] ??
                                character.images?.[0] ??
                                'https://via.placeholder.com/150?text=No+Image'
                            }
                            alt={character.name}
                            className="card-img"
                        />
                        <p className="card-name">{character.name}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Grid;
