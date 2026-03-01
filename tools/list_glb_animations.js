const fs = require('fs');
const path = require('path');

const arg = process.argv[2] || path.join(__dirname, '..', 'assets', 'dragonCorea.glb');

if (!fs.existsSync(arg)) {
  console.error('File not found:', arg);
  process.exit(2);
}

const buffer = fs.readFileSync(arg);

function readUInt32LE(buf, offset) { return buf.readUInt32LE(offset); }

const magic = buffer.toString('utf8', 0, 4);
if (magic !== 'glTF') {
  console.error('Not a GLB (magic mismatch)');
  process.exit(3);
}

const version = readUInt32LE(buffer, 4);
const fileLength = readUInt32LE(buffer, 8);

let offset = 12;
const jsonChunkLength = readUInt32LE(buffer, offset); offset += 4;
const jsonChunkType = readUInt32LE(buffer, offset); offset += 4;

if (jsonChunkType !== 0x4E4F534A) { // 'JSON'
  console.error('First chunk is not JSON');
  process.exit(4);
}

const jsonText = buffer.slice(offset, offset + jsonChunkLength).toString('utf8');
let doc;
try {
  doc = JSON.parse(jsonText);
} catch (e) {
  console.error('Failed to parse JSON chunk:', e.message);
  process.exit(5);
}

const animations = doc.animations || [];
if (animations.length === 0) {
  console.log('No animations found in', arg);
  process.exit(0);
}

console.log('Found', animations.length, 'animation(s):');
animations.forEach((anim, i) => {
  const name = anim.name || `<unnamed-${i}>`;
  console.log(`- ${name}`);
});

// Also print channels/targets for extra hint
console.log('\nDetails:');
animations.forEach((anim, i) => {
  const name = anim.name || `<unnamed-${i}>`;
  console.log(`Animation ${i}: ${name}`);
  if (Array.isArray(anim.channels)) {
    anim.channels.forEach((ch, ci) => {
      const target = (ch.target && ch.target.node != null) ? `node ${ch.target.node}` : 'unknown target';
      const path = (ch.target && ch.target.path) || 'unknown path';
      console.log(`  channel ${ci}: ${target} -> ${path}`);
    });
  }
});
