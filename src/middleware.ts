import { defineMiddleware } from 'astro:middleware';

const legacyLocaleRoute = /^\/(en|pt-br)(\/.*)?$/;

export const onRequest = defineMiddleware(({ request }, next) => {
  const url = new URL(request.url);
  const legacy = url.pathname.match(legacyLocaleRoute);
  if (!legacy) return next();
  const [, locale, suffix = '/'] = legacy;
  return new Response(null, { status: 308, headers: { location: `/panzonato/${locale}${suffix}${url.search}` } });
});
