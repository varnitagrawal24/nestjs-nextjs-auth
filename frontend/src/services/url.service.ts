import generateUrl from "@/lib/generateURL";

type urlType = {
  path: string;
  params?: Record<string, string | number | boolean>;
  query?: Record<string, string | number | boolean>;
};

function getUrl(data: urlType): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
    return generateUrl(baseUrl, data.path, data.params, data.query);
}

//auth
export const SIGN_UP_URL = () => getUrl({
  path: '/auth/signup'
})

export const LOG_IN_URL = () => getUrl({
  path: '/auth/login'
})
