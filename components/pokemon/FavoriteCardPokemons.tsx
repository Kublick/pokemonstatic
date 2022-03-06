import { Card } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
	pokemonId: number;
}

const FavoriteCardPokemons: FC<Props> = ({ pokemonId }) => {
	const router = useRouter();

	const onFavoriteClick = () => {
		router.push(`/pokemon/${pokemonId}`);
	};

	return (
		<>
			<Card hoverable clickable css={{ padding: 10 }} onClick={onFavoriteClick}>
				<Card.Image
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
					alt={`Pokemon ${pokemonId}`}
					width={'100%'}
					height={140}
				/>
			</Card>
		</>
	);
};

export default FavoriteCardPokemons;
