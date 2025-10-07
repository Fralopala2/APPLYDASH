#!/usr/bin/env node

// Script para ejecutar migraciones en producción
const { execSync } = require('child_process');

console.log('🚀 Ejecutando migraciones de Prisma en producción...\n');

try {
  // Verificar que tenemos la URL de la base de datos
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está configurada');
  }

  console.log('📊 Base de datos:', process.env.DATABASE_URL.substring(0, 50) + '...');
  
  // Generar el cliente de Prisma
  console.log('🔧 Generando cliente de Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Ejecutar migraciones
  console.log('📋 Ejecutando migraciones...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  // Verificar el estado de la base de datos
  console.log('🔍 Verificando estado de la base de datos...');
  execSync('npx prisma migrate status', { stdio: 'inherit' });
  
  console.log('\n✅ Migraciones completadas exitosamente!');
  
} catch (error) {
  console.error('\n❌ Error ejecutando migraciones:', error.message);
  process.exit(1);
}