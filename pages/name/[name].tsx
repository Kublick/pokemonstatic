import { useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Layout } from '../../components/layouts';
import pokeApi from '../../api/pokeApi';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti';

interface Props {
	pokemon: Pokemon;
}

const PokemonNamePage: NextPage<Props> = ({ pokemon }) => {
	const [isInFavorites, setisInFavorites] = useState(
		localFavorites.existInFavorites(pokemon.id as number),
	);

	const onToggleFavorite = () => {
		localFavorites.toogleFavorite(pokemon.id as number);
		setisInFavorites(!isInFavorites);

		if (!isInFavorites) {
			confetti({
				zIndex: 999,
				particleCount: 100,
				spread: 160,
				angle: -100,
				origin: { x: 1, y: 0 },
			});
		}
	};

	return (
		<Layout title={pokemon.name}>
			<Grid.Container css={{ marginTop: '5px' }} gap={2}>
				<Grid xs={2} sm={4}>
					<Card hoverable css={{ padding: '30px' }}>
						<Card.Body>
							<Card.Image
								src={
									pokemon.sprites!.other?.dream_world?.front_default ||
									'/no-image.png'
								}
								alt={pokemon.name}
								width="100%"
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header
							css={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<Text h1 transform="capitalize">
								{pokemon.name}
							</Text>
							<Button
								color="gradient"
								ghost={!isInFavorites}
								onClick={onToggleFavorite}
							>
								{isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
							</Button>
						</Card.Header>

						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction="row" display="flex" gap={0}>
								<Image
									src={pokemon.sprites?.front_default || '/no-image.png'}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites?.back_default || '/no-image.png'}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites?.front_shiny || '/no-image.png'}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites?.back_shiny || '/no-image.png'}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await pokeApi.get<PokemonListResponse>('pokemon?limit=151');

	const pokemonNames = data.results.map((pokemon: Pokemon) => {
		return pokemon.name;
	});

	return {
		paths: pokemonNames.map((name) => ({
			params: {
				name,
			},
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { name } = params as { name: string };

	return {
		props: {
			pokemon: await getPokemonInfo(name),
		},
	};
};

export default PokemonNamePage;
