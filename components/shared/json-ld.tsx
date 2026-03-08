export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </>
    );
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
