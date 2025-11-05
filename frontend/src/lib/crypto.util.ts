import { Env } from "@/configs/env.config";
import type { JWTType } from "@/types/jwt.type";

/**
 * Шифрует сообщение (например, объект JWT) с помощью AES-GCM.
 * @param message — строка или объект, который нужно зашифровать.
 * @returns Base64-строка с IV и шифротекстом.
 */
export const encryptMessage = async (
	message: string | JWTType
): Promise<string> => {
	try {
		// Подготовка ключа
		const encoder = new TextEncoder();
		const rawKey = encoder.encode(Env.AUTH_SECRET);

		if (rawKey.length < 16) {
			throw new Error("Секретный ключ должен содержать минимум 16 байт.");
		}

		const key = await window.crypto.subtle.importKey(
			"raw",
			rawKey,
			{ name: "AES-GCM" },
			false,
			["encrypt"]
		);

		// Генерация IV (инициализационного вектора)
		const iv = window.crypto.getRandomValues(new Uint8Array(12));

		// Преобразуем сообщение в JSON → Uint8Array
		const plainText = typeof message === "string" ? message : JSON.stringify(message);
		const encodedMessage = encoder.encode(plainText);

		// Шифрование
		const encryptedBuffer = await window.crypto.subtle.encrypt(
			{ name: "AES-GCM", iv },
			key,
			encodedMessage
		);

		// Объединяем IV и шифротекст
		const encryptedBytes = new Uint8Array(encryptedBuffer);
		const combined = new Uint8Array(iv.length + encryptedBytes.length);
		combined.set(iv);
		combined.set(encryptedBytes, iv.length);

		// Преобразуем в Base64
		return btoa(String.fromCharCode(...combined));
	} catch (error) {
		console.error("[ENCRYPTION ERROR]", error);
		throw new Error("Ошибка при шифровании сообщения.");
	}
};

/**
 * Расшифровывает сообщение, зашифрованное encryptMessage().
 * @param encryptedData — Base64 строка с IV и зашифрованным текстом.
 * @returns Строка или объект JWTType, если расшифрован JSON.
 */
export const decryptMessage = async <T>(
	encryptedData: string
): Promise<T | string> => {
	try {
		if (!encryptedData || typeof encryptedData !== "string") {
			throw new Error("Переданы некорректные данные для расшифровки.");
		}

		// Подготовка Base64
		let base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");
		const padding = "=".repeat((4 - (base64.length % 4)) % 4);
		const padded = base64 + padding;

		// Преобразуем Base64 в байты
		const combined = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
		const iv = combined.slice(0, 12);
		const ciphertext = combined.slice(12);

		// Импорт ключа
		const encoder = new TextEncoder();
		const rawKey = encoder.encode(Env.AUTH_SECRET);
		if (rawKey.length < 16) {
			throw new Error("Секретный ключ должен содержать минимум 16 байт.");
		}

		const key = await window.crypto.subtle.importKey(
			"raw",
			rawKey,
			{ name: "AES-GCM" },
			false,
			["decrypt"]
		);

		// Расшифровка
		const decryptedBuffer = await window.crypto.subtle.decrypt(
			{ name: "AES-GCM", iv },
			key,
			ciphertext
		);

		const decryptedText = new TextDecoder().decode(decryptedBuffer);

		// Попытка распарсить JSON
		try {
			return JSON.parse(decryptedText) as T;
		} catch {
			return decryptedText;
		}
	} catch (error) {
		console.error("[DECRYPTION ERROR]", error);
		throw new Error("Ошибка при расшифровке сообщения.");
	}
};
