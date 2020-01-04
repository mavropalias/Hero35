import * as functions from "firebase-functions";
import { auth } from "firebase-admin";
import crypto from "crypto";
import Mailchimp from "mailchimp-api-v3";

const mailchimp = new Mailchimp(functions.config().mailchimp.api_key);

/**
 * Subscribe new user to newsletter
 */
export const newsletterSubscribe = functions.auth
  .user()
  .onCreate(async (user: auth.UserRecord) => {
    const { email, displayName } = user;
    const hash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");
    try {
      await mailchimp.put(
        `/lists/${functions.config().mailchimp.list_id}/members/${hash}`,
        {
          email_address: email,
          status_if_new: "subscribed",
          status: "subscribed",
          merge_fields: {
            NAME: displayName || ""
          }
        }
      );
      console.log(
        `Successfully added new user ${displayName ||
          ""} ${email} to newsletter`
      );
    } catch (err) {
      console.error(
        "Mailchimp: Error while attempting to add registered subscriber —",
        err
      );
    }
  });
