declare const ga: any;

export const handleMailChimpSubscribe = (): void => {
  const params = new URLSearchParams(document.location.search.substring(1));
  const subscribe = params.get("subscribe");

  if (subscribe !== null) {
    history.replaceState({}, null, "/");
    ga("send", {
      hitType: "pageview",
      page: document.location.origin + "/mailchimp",
    });
  }
};
