import Container from '../ui/Container'

function Section({ as: Component = 'section', children, className = '', id }) {
  return (
    <Component id={id} className={className}>
      <Container>{children}</Container>
    </Component>
  )
}

export default Section
