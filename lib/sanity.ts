import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "2sr5goxa";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || "skllq7cqeS3mfcgFYDGyiIQFkFBWWcPNqyqlzzz3xPjTDYcN8w4qzogu6OdsheDNGtG6M3pA1hMJYEwkJgk4wqsDJu9XbGv6NGhaM5PAP5VmGsBQoonVpumiLbWi3k2l55YcirsoI8aBWWVc2sUQX7UnLAhTPUxEhh1dSKOU0VPuDY8lv7lf";

export const client = createClient({
  projectId, dataset,
  apiVersion: "2026-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
