#!/bin/sh
set -e

echo "Stosowanie migracji Prisma..."
npx prisma migrate deploy

echo "Start serwera..."
exec "$@"
