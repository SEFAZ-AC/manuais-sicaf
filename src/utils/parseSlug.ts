import slugify from "slugify";

export function createSlugFromSearchParams(searchParams?: string[]) {
  if (!searchParams || !searchParams.length) {
    return "";
  }
  let slug = "/manual";
  if (searchParams.length === 1) {
    slug += `/${searchParams[0]}`;
  } else if (searchParams.length === 2) {
    slug += `/${searchParams[0]}/${searchParams[1]}`;
  } else if (searchParams.length >= 3) {
    slug += `/${searchParams[0]}/${searchParams[1]}/${searchParams[2]}`;
  }
  return slug;
}

export function createSlug(name: string) {
  return slugify(name, { lower: true, strict: true });
}

export function createPageSlug(name: string) {
  const slug = slugify(name, { lower: true, strict: true });
  return `/${slug}`;
}

export function createManualSlug(
  name: string,
  module: string | null,
  section: string | null
) {
  let slug = "/manual";
  if (module) {
    slug += `/${slugify(module, { lower: true, strict: true })}`;
    if (section) {
      slug += `/${slugify(section, { lower: true, strict: true })}`;
    }
  }
  slug += `/${slugify(name, { lower: true, strict: true })}`;
  return slug;
}
