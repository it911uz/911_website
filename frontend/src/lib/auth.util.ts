
/**
 * Decodes a JWT token and returns the payload data.
 * @template TokenData - The type of the payload data.
 * @param {string} token - The JWT token to decode.
 * @returns {TokenData | null} - The decoded payload data or null if the token is invalid.
 */
export const decodeJwt = <T = unknown>(token: string) => {
	if (
		token === undefined ||
		token === null ||
		typeof token !== "string" ||
		token.trim().length === 0
	) {
		console.error("[DECODE JWT ERROR] Invalid token provided");
		return null;
	}

	try {
		const tokenSections = token.split(".");
		if (tokenSections.length < 2) {
			console.error("[DECODE JWT ERROR] Token does not have enough sections");
			return null;
		}

		const tokenPayload = tokenSections[1];
		if (!tokenPayload) {
			console.error("[DECODE JWT ERROR] Token payload is empty");
			return null;
		}

		const base64Url = tokenPayload.replace(/-/g, "+").replace(/_/g, "/");
		const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
		const base64 = base64Url + padding;
		const decodedPayload = Buffer.from(base64, "base64").toString("utf-8");

		return JSON.parse(decodedPayload) as T;
	} catch (error) {
		console.error("[DECODE JWT ERROR]", error);

		return null;
	}
};