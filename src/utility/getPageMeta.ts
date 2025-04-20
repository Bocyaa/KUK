import { pageMeta } from "./pageMeta";

interface GetPageMeta {
  title: string;
  back?: string;
}

export function getPageMeta(pathname: string): GetPageMeta {
  // Try to match the most specific path first
  return (
    pageMeta.find((meta) => pathname === meta.path) ||
    pageMeta.find((meta) => pathname.startsWith(meta.path)) || { title: "" }
  );
}
