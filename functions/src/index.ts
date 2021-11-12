import * as functions from "firebase-functions";
import {nanoid} from "nanoid";

export const getRandomKey = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw Error("Unauthenticated");
  }
  const {key_prefix: keyPrefix} = data;
  return {key: `${keyPrefix}_${nanoid(16)}`};
});
