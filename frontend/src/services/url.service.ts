import generateUrl from "@/lib/generateURL";

type urlType = {
  path: string;
  params?: Record<string, string | number | boolean>;
  query?: Record<string, string | number | boolean>;
};

function getUrl(data: urlType): string {
    const baseUrl = process.env.API_BASE_URL ?? ''
    return generateUrl(baseUrl, data.path, data.params, data.query);
}
