import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { provideApolloClient } from '@vue/apollo-composable';

// One Apollo Client for the whole app, provided once at plugin init so
// every page/component can just call useQuery/useMutation from
// @vue/apollo-composable without re-wiring the client each time.
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const httpLink = new HttpLink({ uri: config.public.apiUrl });

  // Attaches the access token (Phase 2 ADR-006's short-lived JWT) to every
  // request. Token lives in a cookie rather than localStorage so it's
  // available on the server-rendered auth pages too (login/register are
  // SSR per nuxt.config.ts's routeRules).
  const authLink = setContext((_, { headers }) => {
    const token = useCookie('ferrow_access_token').value;
    return { headers: { ...headers, ...(token ? { authorization: `Bearer ${token}` } : {}) } };
  });

  // A 401-ish GraphQL error (UNAUTHENTICATED) anywhere means the access
  // token has expired — this scaffold does not yet implement silent
  // refresh-on-401 (see README); it clears the session and sends the user
  // back to login rather than leaving them looking at a broken screen.
  const errorLink = onError(({ graphQLErrors }) => {
    const unauthenticated = graphQLErrors?.some((e) => e.extensions?.code === 'UNAUTHENTICATED');
    if (unauthenticated && import.meta.client) {
      useCookie('ferrow_access_token').value = null;
      useCookie('ferrow_refresh_token').value = null;
      navigateTo('/login');
    }
  });

  const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: 'cache-and-network' },
    },
    ssrMode: import.meta.server,
  });

  provideApolloClient(apolloClient);

  return { provide: { apollo: apolloClient } };
});
