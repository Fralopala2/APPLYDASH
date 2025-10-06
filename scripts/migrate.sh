#!/bin/bash

# Production Database Migration Script for ApplyDash
# This script runs database migrations in production environment

set -e

echo "🚀 Starting ApplyDash production migration..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is not set"
    exit 1
fi

echo "📊 Running Prisma migrations..."
npx prisma migrate deploy

echo "🔄 Generating Prisma client..."
npx prisma generate

echo "✅ Migration completed successfully!"

# Optional: Run seed if needed
if [ "$RUN_SEED" = "true" ]; then
    echo "🌱 Running database seed..."
    npx prisma db seed
fi

echo "🎉 ApplyDash is ready for production!"