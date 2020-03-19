import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Loading = styled.div`
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const Container = styled.div`
	max-width: 700px;
	background: #fff;
	border-radius: 5px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
	padding: 30px;
	margin: 80px auto;
`;

export const Owner = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		width: 150px;
		border-radius: 20%;
		margin: 20px 0;
	}

	h1 {
		font-size: 30px;
		color: #0d2636;
	}

	p {
		margin-top: 5px;
		font-size: 18px;
		color: #000;
		text-align: center;
		line-height: 1.4;
		max-width: 400px;
	}
`;

export const IssuesList = styled.ul`
	margin-top: 30px;
	padding-top: 30px;
	border-top: 1px solid #eee;

	li {
		display: flex;
		padding: 15px 10px;

		& + li {
			margin-top: 12px;
			border-top: 1px solid #d3d3d3;
		}
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		border: 1px solid #0d2636;
	}

	div {
		flex: 1;
		margin-left: 12px;

		p {
			margin-top: 10px;
			font-size: 12px;
			color: #000;
		}
	}

	strong {
		font-size: 15px;

		a {
			text-decoration: none;
			color: #222;

			&:hover {
				color: #0071db;
			}
		}

		span {
			background: #222;
			color: #fff;
			border-radius: 4px;
			font-size: 12px;
			font-weight: 600;
			padding: 3px 7px;
			margin-left: 10px;
		}
	}
`;

export const PageActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	button {
		border: 0;
		background: #222;
		color: #fff;
		padding: 5px 10px;
		border-radius: 5px;
		transform: 0.3s;

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		&:hover {
			opacity: 0.8;
		}
	}
`;

export const FilterList = styled.div`
	margin: 15px 0;

	button {
		border: 0;
		padding: 8px;
		border-radius: 4px;
		margin: 0 3px;
		background: #222;
		color: #fff;
		font-weight: bold;

		&:nth-child(${(props) => props.active + 1}) {
			background: #0071db;
		}
	}
`;

export const BackButton = styled(Link)`
  background: transparent;
	border: 0
`;
