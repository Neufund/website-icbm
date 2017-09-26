interface ILinks {
  [id: string]: string;
}

function serviceToIcon(service: string): string {
  switch (service) {
    case "linkedin":
      return "fa-linkedin";
    case "github":
      return "fa-github";
    case "website":
      return "fa-globe";
    case "twitter":
      return "fa-twitter";
    case "medium":
      return "fa-medium";
    case "facebook":
      return "fa-facebook";
    case "reddit":
      return "fa-reddit";
    default:
      throw new Error(`Unknown service ${service}`);
  }
}

function mapLinksDescriptionToIcons(links: ILinks): string[] {
  const linksKeys = Object.keys(links);

  return linksKeys.map(
    link =>
      `<li><a class="link" href="${links[link]}" target="_blank"><i class="fa ${serviceToIcon(
        link
      )}"></i></a></li>`
  );
}

export const getPersonModal = (
  name: string,
  image: string,
  title: string,
  bio: string,
  links: ILinks,
  email: string
) => {
  let optionalElements = "";
  if (links) {
    optionalElements += `<ul class="list-inline">`;
    optionalElements += mapLinksDescriptionToIcons(links).join("\n");
    optionalElements += `</ul>`;
  }

  if (email !== "") {
    optionalElements += `<p class="handle">${email}</p>`;
  }

  return {
    unsafeContent: `
      <div class="row">
        <div class="col-md-3 person-info-container">
          <div class="person-info">
            <img class="rounded-image" src="${image}"/>
          </div>
        </div>
        <div class="col-md-6">
          <div class="person-details">
            <h4 class="name">${name}</h4>
            <div class="title-container">
              <h4 class="position">${title}</h4>
            </div>
            <div class="bio">${bio}</div>
            ${optionalElements}
          </div>
        </div>
    </div>`,
  };
};
