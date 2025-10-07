#!/usr/bin/env node

// Script para verificar variables de entorno antes del deployment
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'DATABASE_URL',
  'JWT_SECRET'
];

const optionalEnvVars = [
  'NODE_ENV',
  'PORT'
];

console.log('🔍 Verificando variables de entorno...\n');

let hasErrors = false;

// Verificar variables requeridas
console.log('📋 Variables requeridas:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName}: NO CONFIGURADA`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName}: Configurada`);
  }
});

// Verificar variables opcionales
console.log('\n📋 Variables opcionales:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`⚠️  ${varName}: No configurada (usando valor por defecto)`);
  } else {
    console.log(`✅ ${varName}: ${value}`);
  }
});

if (hasErrors) {
  console.log('\n❌ ERROR: Faltan variables de entorno requeridas');
  console.log('\n📝 Para configurar en DigitalOcean App Platform:');
  console.log('1. Ve a tu app en el panel de DigitalOcean');
  console.log('2. Ve a Settings > App-Level Environment Variables');
  console.log('3. Agrega las variables faltantes');
  console.log('4. Redeploy la aplicación');
  process.exit(1);
} else {
  console.log('\n✅ Todas las variables de entorno están configuradas correctamente');
}