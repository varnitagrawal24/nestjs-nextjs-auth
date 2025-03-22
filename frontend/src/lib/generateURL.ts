export default function generateUrl(
  baseUrl: string,
  path: string,
  params?: Record<string, string | number | boolean>,
  query?: Record<string, string | number | boolean>
) {
  let url = path;
  if (params && Object.keys(params).length > 0) {
    url = path.replace(
      /:([a-zA-Z]+)/g,
      (_, key) => params[key]?.toString() || ""
    );
  }

  if (query && Object.keys(query).length > 0) {
    const queryString = new URLSearchParams(
      Object.entries(query).reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    url += `?${queryString}`;
  }

  return `${baseUrl}${url}`;
}
