/* eslint-disable max-len */
import { getKcContext } from 'keycloakify/lib/getKcContext';

// NOTE: In most of the cases you do not need to overload the KcContext, you can
// just call getKcContext(...) without type arguments.
// You want to overload the KcContext only if:
// - You have custom plugins that add some values to the context (like https://github.com/micedre/keycloak-mail-whitelisting that adds authorizedMailDomains)
// - You want to add support for extra pages that are not yey featured by default, see: https://docs.keycloakify.dev/contributing#adding-support-for-a-new-page
export const { kcContext } = getKcContext<{ pageId: 'register.ftl'; authorizedMailDomains: string[]; }>({
  mockPageId: 'login.ftl',
  // mockData: [
  //   {
  //     pageId: 'login.ftl',
  //     locale: {
  //       // When we test the login page we do it in french
  //       currentLanguageTag: 'en',
  //     },
  //     // Uncomment the following line for hiding the Alert message
  //     // "message": undefined
  //     // Uncomment the following line for showing an Error message
  //     // message: { type: "error", summary: "This is an error" }
  //   },
  // ],
});

export type KcContext = NonNullable<typeof kcContext>;
