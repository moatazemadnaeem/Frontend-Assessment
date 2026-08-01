type ActivitySearchProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function ActivitySearch({ query, onQueryChange }: ActivitySearchProps) {
  return (
    <section className="card" style={{ padding: "1.5rem" }}>
      <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Activity Feed</h1>

      <input
        className="input"
        placeholder="Search activity..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </section>
  );
}
