import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || "ru";
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
