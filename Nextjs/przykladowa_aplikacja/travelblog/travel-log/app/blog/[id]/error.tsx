'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Coś poszło nie tak: {error.message}</h2>
      <button onClick={() => reset()}>Spróbuj ponownie</button>
    </div>
  );
}
