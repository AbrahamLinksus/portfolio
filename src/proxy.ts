import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/lib/projects";

const slugs = new Set<string>(projects.map((p) => p.slug));

// Unknown case-study slugs get a real 404 status. Without this they stream
// through the route's loading boundary and the not-found UI arrives with 200.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !slugs.has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url), { status: 404 });
  }
}

export const config = { matcher: "/work/:slug" };
