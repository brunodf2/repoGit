import React, { useState, useCallback, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, Form, SubmitButton, List, DeleteButton } from './styles';

import api from '../../services/api';

export default function Main() {
	const [ newRepo, setNewRepo ] = useState('');
	const [ repository, setRepository ] = useState([]);
	const [ loading, setLoding ] = useState(false);
	const [ alert, setAlert ] = useState(null);

	useEffect(() => {
		const repoStorage = localStorage.getItem('repos');

		if (repoStorage) {
			setRepository(JSON.parse(repoStorage));
		}
	}, []);

	// Salvar alteracoes
	useEffect(
		() => {
			localStorage.setItem('repos', JSON.stringify(repository));
		},
		[ repository ]
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();

			async function submit() {
				setLoding(true);
				setAlert(null);

				try {
					if (newRepo === '') {
						throw new Error('Você precisa indicar um repositório!');
					}

					const response = await api.get(`repos/${newRepo}`);
					console.log(response.data);

					const hasRepo = repository.find((repo) => repo.name === newRepo);

					if (hasRepo) {
						throw new Error('Repositório duplicado!');
					}

					const data = {
						name: response.data.full_name,
						language: response.data.language
					};

					setRepository([ ...repository, data ]);
					setNewRepo('');
				} catch (error) {
					setAlert(true);
					console.log(error);
				} finally {
					setLoding(false);
				}
			}
			submit();
		},
		[ newRepo, repository ]
	);

	function handleInputChange(e) {
		setNewRepo(e.target.value);
		setAlert(null);
	}

	const handleDelete = useCallback(
		(repo) => {
			const find = repository.filter((r) => r.name !== repo);
			setRepository(find);
		},
		[ repository ]
	);

	return (
		<Container>
			<h1>
				<FaGithub size={25} />
				Meus Repositórios
			</h1>

			<Form onSubmit={handleSubmit} error={alert}>
				<input type="text" placeholder="Adicionar Repositórios" value={newRepo} onChange={handleInputChange} />

				<SubmitButton loading={loading ? 1 : 0}>
					{loading ? <FaSpinner color="#FFF" size={14} /> : <FaPlus color="#FFF" size={14} />}
				</SubmitButton>
			</Form>

			<List>
				{repository.map((repo) => (
					<li key={repo.name}>
						<span>
							<DeleteButton onClick={() => handleDelete(repo.name)}>
								<FaTrash size={14} />
							</DeleteButton>
							{repo.name} {'-'} {repo.language}
						</span>
						<Link to={`repository/${encodeURIComponent(repo.name)}`}>
							<FaBars size={20} />
						</Link>
					</li>
				))}
			</List>
		</Container>
	);
}
