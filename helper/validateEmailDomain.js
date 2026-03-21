const dns = require("dns").promises;

async function validateEmailDomain(email) {
  const domain = String(email || "").split("@")[1] || "";
  if (!domain) return false;

  try {
    const records = await dns.resolveMx(domain);
    return Array.isArray(records) && records.length > 0;
  } catch (_error) {
    return false;
  }
}

module.exports = validateEmailDomain;
