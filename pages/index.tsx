import { Grid } from '@nextui-org/react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import PokemonCard from '../components/pokemon/PokemonCard';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';

interface Props {
	pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
	let title = 'Listado de Pokemons';

	return (
		<>
			<Layout title={title}>
				<Grid.Container gap={2} justify="flex-start">
					{pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))}
				</Grid.Container>
			</Layout>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

	const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => ({
		...pokemon,
		id: i + 1,
		img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
			i + 1
		}.svg`,
	}));

	return {
		props: {
			pokemons,
		},
	};
};

export default Home;
