import styled from 'styled-components/macro';

export default function ErrorList({ length, errors }) {
  const showErrors = length > 0 && errors.length > 0;

  return showErrors ? (
    <>
      <ErrorHeading>Your password must have</ErrorHeading>
      {errors.map((error) => {
        return <ErrorMessage key={Math.random()}>{error}</ErrorMessage>;
      })}
    </>
  ) : null;

  // return (
  //   <ul>
  //     {errors.length > 0 ? <ErrorHeading>Your password must have</ErrorHeading> : null}
  // {errors.map((error) => {
  //   return <ErrorMessage>{error}</ErrorMessage>;
  // })}
  //   </ul>
  // );
}

const ErrorWrapper = styled.div`
  height: 200px;
`;

const ErrorHeading = styled.p`
  color: #191919;
  font-size: 13px;
  font-weight: bold;
  padding-bottom: 4px;
`;

export const ErrorMessage = styled.li`
  color: firebrick;
  font-size: 12px;
`;
