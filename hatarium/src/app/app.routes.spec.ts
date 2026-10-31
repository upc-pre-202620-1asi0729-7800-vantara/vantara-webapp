import {routes} from './app.routes';

/** Verifies the application boots into the IAM flow. */
describe('app routes', () => {
  it('redirects the empty path to the IAM sign-in page', () => {
    const rootRedirect = routes.find(route => route.path === '' && route.pathMatch === 'full');

    expect(rootRedirect).toBeDefined();
    expect(rootRedirect?.redirectTo).toBe('iam/sign-in');
  });

  it('keeps the wildcard redirect inside IAM', () => {
    const wildcard = routes.find(route => route.path === '**');

    expect(wildcard?.redirectTo).toBe('iam/sign-in');
  });

  it('protects every veterinary route with the veterinarian guard', () => {
    const layoutRoute = routes.find(route => route.component && route.children?.length);
    const veterinaryRoutes = layoutRoute?.children?.filter(route => route.path?.startsWith('veterinary/')) ?? [];

    expect(veterinaryRoutes.length).toBe(8);
    for (const route of veterinaryRoutes) {
      expect(route.canActivate?.length).toBeGreaterThan(0);
    }
  });
});
