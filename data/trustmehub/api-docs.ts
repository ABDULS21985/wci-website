import type { SdkInfo, ApiFeature } from "@/types/trustmehub";

export const sdkList: SdkInfo[] = [
    {
        language: "Node.js",
        icon: "nodejs",
        installCommand: "npm install @trustmehub/sdk",
        quickstartCode: `import { TrustMeHub } from '@trustmehub/sdk';

const client = new TrustMeHub({
  apiKey: process.env.TRUSTMEHUB_API_KEY,
});

// Verify a credential
const result = await client.credentials.verify({
  credentialId: 'cred_abc123',
});

console.log(result.verified); // true`,
        docsUrl: "https://docs.trustmehub.com/sdk/nodejs",
        githubUrl: "https://github.com/trustmehub/sdk-nodejs",
    },
    {
        language: "Python",
        icon: "python",
        installCommand: "pip install trustmehub",
        quickstartCode: `from trustmehub import TrustMeHub

client = TrustMeHub(api_key=os.environ["TRUSTMEHUB_API_KEY"])

# Verify a credential
result = client.credentials.verify(
    credential_id="cred_abc123"
)

print(result.verified)  # True`,
        docsUrl: "https://docs.trustmehub.com/sdk/python",
        githubUrl: "https://github.com/trustmehub/sdk-python",
    },
    {
        language: "Go",
        icon: "go",
        installCommand: "go get github.com/trustmehub/sdk-go",
        quickstartCode: `package main

import (
    "fmt"
    "github.com/trustmehub/sdk-go"
)

func main() {
    client := trustmehub.NewClient(os.Getenv("TRUSTMEHUB_API_KEY"))

    result, _ := client.Credentials.Verify("cred_abc123")

    fmt.Println(result.Verified) // true
}`,
        docsUrl: "https://docs.trustmehub.com/sdk/go",
        githubUrl: "https://github.com/trustmehub/sdk-go",
    },
    {
        language: "Rust",
        icon: "rust",
        installCommand: 'cargo add trustmehub',
        quickstartCode: `use trustmehub::TrustMeHub;

#[tokio::main]
async fn main() {
    let client = TrustMeHub::new(
        std::env::var("TRUSTMEHUB_API_KEY").unwrap()
    );

    let result = client
        .credentials()
        .verify("cred_abc123")
        .await
        .unwrap();

    println!("{}", result.verified); // true
}`,
        docsUrl: "https://docs.trustmehub.com/sdk/rust",
        githubUrl: "https://github.com/trustmehub/sdk-rust",
    },
];

export const apiFeatures: ApiFeature[] = [
    {
        icon: "Zap",
        title: "Sub-10ms Response Time",
        description:
            "Lightning-fast verification with P50 latency of 3ms and P95 of 8ms. Built for real-time applications.",
    },
    {
        icon: "FileJson",
        title: "OpenAPI 3.0 Specification",
        description:
            "Fully documented REST API with interactive documentation. Auto-generate clients for any language.",
    },
    {
        icon: "Bell",
        title: "Webhook & Event Streaming",
        description:
            "Real-time notifications for credential events. Subscribe to issuance, verification, and revocation events.",
    },
    {
        icon: "Shield",
        title: "Enterprise Security",
        description:
            "API key authentication, rate limiting, and IP allowlisting. SOC 2 and ISO 27001 compliant.",
    },
    {
        icon: "Code2",
        title: "Auto-generated SDKs",
        description:
            "Official SDKs for Node.js, Python, Go, and Rust. Type-safe clients with full IDE support.",
    },
    {
        icon: "Activity",
        title: "Real-time Analytics",
        description:
            "Monitor API usage, latency, and error rates. Detailed logs for debugging and compliance.",
    },
];

export const apiEndpoints = [
    {
        method: "POST" as const,
        path: "/v1/credentials",
        description: "Issue a new blockchain-anchored credential",
        authentication: "required" as const,
    },
    {
        method: "GET" as const,
        path: "/v1/credentials/{id}",
        description: "Retrieve credential details by ID",
        authentication: "required" as const,
    },
    {
        method: "POST" as const,
        path: "/v1/credentials/{id}/verify",
        description: "Verify a credential's authenticity",
        authentication: "required" as const,
    },
    {
        method: "POST" as const,
        path: "/v1/credentials/{id}/revoke",
        description: "Revoke an issued credential",
        authentication: "required" as const,
    },
    {
        method: "GET" as const,
        path: "/v1/credentials/batch/{batchId}",
        description: "Check batch processing status",
        authentication: "required" as const,
    },
    {
        method: "POST" as const,
        path: "/v1/webhooks",
        description: "Register a webhook endpoint",
        authentication: "required" as const,
    },
];

export const codeExamples = {
    issueCredential: `// Issue a new credential
const credential = await client.credentials.create({
  templateId: 'tmpl_degree_certificate',
  recipient: {
    name: 'John Smith',
    email: 'john@example.com',
  },
  claims: {
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    graduationDate: '2024-05-15',
    gpa: '3.85',
  },
  expiresAt: '2034-05-15T00:00:00Z',
});

console.log(credential.id); // cred_abc123
console.log(credential.blockchainTxHash); // 0x...`,

    verifyCredential: `// Verify a credential
const verification = await client.credentials.verify({
  credentialId: 'cred_abc123',
  // Or verify by QR code data
  // qrData: 'trustmehub://verify/cred_abc123?sig=...',
});

console.log(verification.verified);      // true
console.log(verification.status);        // 'active'
console.log(verification.issuedAt);      // '2024-01-15T...'
console.log(verification.issuer.name);   // 'State University'
console.log(verification.blockchainProof.txHash); // 0x...`,

    batchIssuance: `// Batch issue credentials
const batch = await client.credentials.createBatch({
  templateId: 'tmpl_degree_certificate',
  recipients: [
    { name: 'Alice Johnson', email: 'alice@example.com', claims: {...} },
    { name: 'Bob Williams', email: 'bob@example.com', claims: {...} },
    // ... up to 10,000 recipients per batch
  ],
});

console.log(batch.id);        // batch_xyz789
console.log(batch.status);    // 'processing'
console.log(batch.total);     // 1000
console.log(batch.completed); // 0

// Check batch status
const status = await client.credentials.getBatchStatus(batch.id);
console.log(status.completed); // 847
console.log(status.failed);    // 3`,

    webhookSetup: `// Register a webhook
const webhook = await client.webhooks.create({
  url: 'https://your-app.com/webhooks/trustmehub',
  events: [
    'credential.issued',
    'credential.verified',
    'credential.revoked',
  ],
  secret: 'whsec_your_signing_secret',
});

// Webhook payload example
{
  "id": "evt_123",
  "type": "credential.verified",
  "data": {
    "credentialId": "cred_abc123",
    "verifiedAt": "2024-01-20T14:30:00Z",
    "verifier": {
      "ip": "192.168.1.1",
      "userAgent": "TrustMeHub-SDK/1.0"
    }
  }
}`,
};
