import styled from 'styled-components/macro';

const Wrapper = styled.div`
  background: lightcoral;
`;

function createMarkup(html) {
  return { __html: JSON.parse(html) };
}

export default function MyComponent(html) {
  const markup = createMarkup(html);
  return <div dangerouslySetInnerHTML={markup} />;
}

// export default function Content(html) {
//   return (
//     <Wrapper>
//       <MyComponent html={html} />
//     </Wrapper>
//   );
// }
