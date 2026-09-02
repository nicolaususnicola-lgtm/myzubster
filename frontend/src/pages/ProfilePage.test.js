import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  let container;
  let root;

  beforeEach(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    delete global.IS_REACT_ACT_ENVIRONMENT;
  });

  test('renders the MyZubster metaverse profile and public project links', async () => {
    await act(async () => {
      root.render(<ProfilePage />);
      await Promise.resolve();
    });

    expect(container.textContent).toContain('Zubster');
    expect(container.textContent).toContain('IDENTITÀ DIGITALE · DEMO');
    expect(container.textContent).toContain('UIIntegrata');
    expect(container.textContent).toContain('CodicePubblico');

    const links = Array.from(container.querySelectorAll('a'));
    expect(links.some((link) => link.getAttribute('href') === '/')).toBe(true);
    expect(links.some((link) => link.href.includes('github.com/nicolaususnicola-lgtm/myzubster'))).toBe(true);

    const image = container.querySelector('img.profile-art');
    expect(image).not.toBeNull();
    expect(image.getAttribute('alt')).toContain('Artwork del profilo metaverso Zubster');
  });
});
