const envAdmins =
  process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
  process.env.ADMIN_EMAILS;

export const ADMIN_EMAILS =
  envAdmins?.split(",").map((email) => email.trim().toLowerCase()) || [
    "christopherisraelahiome@gmail.com",
    "darkeasterner@gmail.com",
  ];
