import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';

import api from '../../services/api';

export default function Repository({ match }) {
	const [ repositorio, setRepositorio ] = useState({});
	const [ issues, setIssues ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ page, setPage ] = useState(1);
	const [ filters, setFilters ] = useState([
		{ state: 'all', label: 'Todas', active: true },
		{ state: 'open', label: 'Abertas', active: false },
		{ state: 'closed', label: 'Fechadas', active: false }
	]);
	const [ filterIndex, setFilterIndex ] = useState(0);

	useEffect(
		() => {
			async function load() {
				const nomeRepo = decodeURIComponent(match.params.repository);

				const [ repoData, issuesData ] = await Promise.all([
					api.get(`/repos/${nomeRepo}`),
					api.get(`/repos/${nomeRepo}/issues`, {
						params: {
							state: filters.find((f) => f.active).state,
							per_page: 5
						}
					})
				]);
				setRepositorio(repoData.data);
				setIssues(issuesData.data);
				setLoading(false);
			}

			load();
		},
		[ match.params.repository ]
	);

	useEffect(
		() => {
			async function loadIssue() {
				const nomeRepo = decodeURIComponent(match.params.repository);

				const response = await api.get(`/repos/${nomeRepo}/issues`, {
					params: {
						state: filters[filterIndex].state,
						page,
						per_page: 5
					}
				});
				setIssues(response.data);
			}
			loadIssue();
		},
		[ filterIndex, filters, page ]
	);

	function handlePage(action) {
		setPage(action === 'back' ? page - 1 : page + 1);
	}

	function handleFilter(index) {
		setFilterIndex(index);
	}

	if (loading) {
		return (
			<Loading>
				<h1>Carregando...</h1>
			</Loading>
		);
	}

	return (
		<Container>
			<BackButton to="/">
				<FaArrowLeft color="#0D2636" size={30} />
			</BackButton>
			<Owner>
				<img src={repositorio.owner.avatar_url} alt="avatar" />
				<h1>{repositorio.name}</h1>
				<p>{repositorio.description}</p>
			</Owner>

			<FilterList active={filterIndex}>
				{filters.map((filter, index) => (
					<button type="button" key={filter.label} onClick={() => handleFilter(index)}>
						{filter.label}
					</button>
				))}
			</FilterList>

			<IssuesList>
				{issues.map((issue) => (
					<li key={String(issue.id)}>
						<img src={issue.user.avatar_url} alt="avatar" />

						<div>
							<strong>
								<a href={issue.html_url} target="_blank">
									{issue.title}
								</a>

								{issue.labels.map((label) => <span key={String(label.id)}>{label.name}</span>)}
							</strong>
							<p>{issue.user.login}</p>
						</div>
					</li>
				))}
			</IssuesList>

			<PageActions>
				<button type="button" disabled={page < 2} onClick={() => handlePage('back')}>
					Voltar
				</button>
				<button type="button" onClick={() => handlePage('next')}>
					Proxíma
				</button>
			</PageActions>
		</Container>
	);
}
