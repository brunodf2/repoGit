import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
	max-width: 700px;
	padding: 30px;
	margin: 80px auto;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);

	h1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 20px;

		svg {
			margin-right: 10px;
		}
	}
`;

export const Form = styled.form`
	display: flex;
	margin-top: 30px;
	flex-direction: row;

	input {
		flex: 1;
		border: 1px solid ${(props) => (props.error ? '#FF0000' : '#ddd')};
		padding: 10px 15px;
		border-radius: 4px;
		font-size: 17px;
	}
`;

// Animacao butao
const animate = keyframes`
  from{
    transform: rotate(0deg)
  }

  to{
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
	type: 'submit',
	disabled: props.loading
}))`
  background: #0d2636;
  border: 0;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
		props.loading &&
		css`
			svg {
				animation: ${animate} 2s linear infinite;
			}
		`}

`;

export const List = styled.ul`
	margin-top: 20px;

	li {
		padding: 15px 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		& + li {
			border-top: 1px solid #d3d3d3d3;
		}

		span {
			font-size: 18px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			padding: 0 10px;
		}

		a {
			color: #0d2636;
			text-decoration: none;
		}
	}
`;

export const DeleteButton = styled.button.attrs({
	type: 'button'
})`
  background: transparent;
  color: #0D2636;
  border: 0;
  padding: 8px 7px;
  outline: 0;
`;
