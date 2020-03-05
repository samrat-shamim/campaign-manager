import {createRecipient} from "./recipients/create-recipient";
import {getRecipients} from "./recipients/get-recipients";
import {sendEmail} from "./emails/send-email";
import {getEmails} from "./emails/get-emails";
import {onMailgunEvent} from "./emails/on-mailgun-event";

export {onMailgunEvent, sendEmail, getRecipients, getEmails, createRecipient};