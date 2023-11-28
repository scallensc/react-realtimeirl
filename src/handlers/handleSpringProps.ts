const defaultSpringConfig = { mass: 4, tension: 400, friction: 80, velocity: 10 };

const componentConfigs = {
  neighbourhood: {
    springConfig: defaultSpringConfig,
    transform: {
      from: { in: 'translate(-100px, 0px)', out: 'translate(0px, 0px)' },
      to: { in: `translate(0px, 0px)`, out: `translate(0px, -100px)` }
    },
  },
  rotator: {
    springConfig: defaultSpringConfig,
    transform: {
      from: { in: `translate(400px, 0px)`, out: `translate(0px, 0px)` },
      to: { in: `translate(0px, 0px)`, out: `translate(400px, 0px)` },
    }
  }
};

const handleSpringProps = (componentName, show) => {
  const component = componentConfigs[componentName];
  return {
    config: component.springConfig,
    from: { transform: show ? component.transform.from.in : component.transform.from.out },
    transform: show ? component.transform.to.in : component.transform.to.out,
  };
}

export default handleSpringProps;
