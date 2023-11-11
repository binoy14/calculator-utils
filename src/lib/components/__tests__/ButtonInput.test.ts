import { render } from '@testing-library/svelte';

import ButtonInput from '../ButtonInput.svelte';

test('renders the button input', () => {
  const component = render(ButtonInput, {
    props: {
      items: [1],
      label: 'button',
      title: 'Button',
      value: 1,
      placeholder: '%',
      formatter: (value: number) => `${value}`,
    },
  });

  expect(component.container).toMatchSnapshot();
});
