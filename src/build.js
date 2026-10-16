/**
 * Script de Build do Serralheria Pro
 * Gera o bundle único src/app.bundle.js a partir dos módulos em src/
 * Uso: node src/build.js
 */

const { execSync } = require('child_process');

console.log('📦 Empacotando aplicação Serralheria Pro...');
try {
  execSync('npx esbuild src/ui/app.js --bundle --outfile=src/app.bundle.js --format=iife', {
    stdio: 'inherit'
  });
  console.log('✅ Bundle gerado com sucesso em src/app.bundle.js');
} catch (error) {
  console.error('❌ Erro ao compilar bundle:', error.message);
  process.exit(1);
}
