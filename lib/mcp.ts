/**
 * MCP (Model Context Protocol) server connection
 * Handles sensitive school data via server-side only environment variables.
 * Never expose MCP_API_KEY or SCHOOL_DB_SECRET to the client.
 */

type SchoolData = {
  campuses: Campus[];
  contacts: Contact;
  timings: string;
};

type Campus = {
  name: string;
  address: string;
  principalName: string;
  mapUrl: string;
  phone: string;
};

type Contact = {
  email: {
    poorna: string;
    vijaya: string;
  };
  phones: string[];
};

// Server-side only — do not import in Client Components
export async function getSchoolData(): Promise<SchoolData> {
  const mcpUrl = process.env.MCP_SERVER_URL;
  const apiKey = process.env.MCP_API_KEY;

  // If MCP server is configured, fetch from it
  if (mcpUrl && apiKey && apiKey !== "your_mcp_api_key_here") {
    try {
      const res = await fetch(`${mcpUrl}/api/school-data`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 3600 },
      });
      if (res.ok) return res.json();
    } catch {
      // Fall through to static data
    }
  }

  // Static fallback (uses NEXT_PUBLIC_ vars from .env)
  const phone = process.env.NEXT_PUBLIC_MOM_PHONE ?? "";
  const email = process.env.NEXT_PUBLIC_MOM_EMAIL ?? "";

  return {
    campuses: [
      {
        name: "Poorna Pragna Layout Campus",
        address: "Poorna Pragna Layout, Bangalore - 560098",
        principalName: "Mrs. Placeholder Name",
        mapUrl: "https://maps.app.goo.gl/PVD5W2F86Ykoaz4d6",
        phone,
      },
      {
        name: "Vijaya Bank Layout Campus",
        address: "Vijaya Bank Layout, Bannerghatta Road, Bangalore - 560076",
        principalName: "Mrs. Placeholder Name",
        mapUrl: "https://maps.app.goo.gl/hrDwxLsGX6drHNtMA",
        phone,
      },
    ],
    contacts: {
      email: { poorna: email, vijaya: email },
      phones: [phone],
    },
    timings: "10:00 AM – 4:00 PM (Monday to Saturday)",
  };
}
