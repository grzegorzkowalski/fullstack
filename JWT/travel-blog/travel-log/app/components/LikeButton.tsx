'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes((prev) => prev + 1)}>
      ❤️ {likes}
    </button>
  );
}
