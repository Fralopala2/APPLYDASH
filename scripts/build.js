#!/usr/bin/env node

// Script de build robusto para DigitalOcean
console.log('🚀 Iniciando proceso de build...\n');

// Verificar variables críticas para el build
const criticalVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

const missingCritical = criticalVars.filter(varName => !process.env[varName]);

if (missingCritical.length > 0) {
  console.log('⚠️  Variables críticas faltantes para el build:');
  missingCritical.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n🔧 Continuando con el build (las variables de runtime se verificarán después)...\n');
}

// Mostrar variables disponibles (sin valores sensibles)
console.log('📋 Estado de variables de entorno:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'no configurado'}`);
console.log(`   NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configurado' : 'no configurado'}`);
console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'configurado' : 'no configurado'}`);
console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? 'configurado' : 'no configurado'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? 'configurado' : 'no configurado'}`);

console.log('\n✅ Procediendo con el build de Next.js...\n');