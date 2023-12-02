import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import { Alert } from "react-native";

import { API_URL } from "./config";
import { uploadAndGetURL } from "./firebase";

interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions | undefined = { method: "GET" }
) {
  const { method, body } = options;

  // for debugging
  console.log(`Fetching: ${API_URL}${endpoint}\nMethod: ${method}${body ? "\nJSON body:" : ""}`);
  body && console.log(body);

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      credentials: "include",
      headers: body
        ? {
            "Content-Type": "application/json",
          }
        : undefined,
      body,
    });
    if (res.status === 204) return { data: null };

    const jsonRes = await res.json();

    if (jsonRes?.error || !res.ok) {
      throw new Error(jsonRes?.message || res.statusText);
    }

    const data = jsonRes as T;

    return { data };
  } catch (err) {
    console.error(err);
    return { error: (err as Error)?.message };
  }
}

// Function to pick an image from the device's media library
export async function pickImageGetURL() {
  const { status } = await requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert("Permission Denied", `Media library permission is required to upload images.`);
  } else {
    // Launch the image library and get the selected image
    const result = await launchImageLibraryAsync();

    if (result?.assets?.[0]?.uri) {
      const uploadedURL = await uploadAndGetURL(result.assets[0].uri);

      return uploadedURL;
    }
  }
}
