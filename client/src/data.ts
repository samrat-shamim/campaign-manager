export interface Recipient {
    Name: string;
    Email: string;
    id?: string;
}

export const dummyRecipients: Recipient[] = [
    {
        Name: "Mamun",
        Email: "mamun@yopmail.com"
    },
    {
        Name: "Samrat",
        Email: "samrat@yopmail.com"
    },
    {
        Name: "Hira",
        Email: "hira@yopmail.com"
    }
]

export const LAMBDAS = {
    "CreateRecipient": "https://6r6cpkzwaj.execute-api.us-east-1.amazonaws.com/beta/recipients/create",
    "GetRecipientList": "https://6r6cpkzwaj.execute-api.us-east-1.amazonaws.com/beta/recipients"
}
