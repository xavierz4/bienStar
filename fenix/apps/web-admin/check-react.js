console.log('Resolving React from:', require.resolve('react'));
console.log('React Version:', require('react').version);
console.log('Resolving React DOM from:', require.resolve('react-dom'));
console.log('React DOM Version:', require('react-dom').version);
try {
  console.log('Resolving Next from:', require.resolve('next/package.json'));
} catch (e) { console.log('Next resolution failed'); }
