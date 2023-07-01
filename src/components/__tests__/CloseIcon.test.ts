import { render } from '@testing-library/svelte';

import CloseIcon from '../CloseIcon.svelte';

test('renders the component', () => {
  const comp = render(CloseIcon);

  expect(comp.container).toMatchSnapshot();
});
