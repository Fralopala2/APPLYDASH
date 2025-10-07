#!/usr/bin/env node

// Script para inyectar variables de entorno en el build de Next.js
console.log('🔧 Inyectando variables de entorno para el cliente...\n');

// Variables que necesita el cliente
const clientVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SITE_URL'
];

console.log('📋 Variables para el cliente:');
clientVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 30)}...`);
    // Asegurar que la variable esté disponible para Next.js
    process.env[varName] = value;
  } else {
    console.log(`❌ ${varName}: NO CONFIGURADA`);
  }
});

// Crear un archivo de configuración de runtime si es necesario
const fs = require('fs');
const path = require('path');

const runtimeConfig = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};

// Escribir configuración para debugging
const configPath = path.join(process.cwd(), 'public', 'runtime-config.json');
try {
  fs.writeFileSync(configPath, JSON.stringify(runtimeConfig, null, 2));
  console.log(`\n📝 Configuración escrita en: ${configPath}`);
} catch (error) {
  console.log(`\n⚠️  No se pudo escribir configuración: ${error.message}`);
}

console.log('\n✅ Inyección de variables completada\n');