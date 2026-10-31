// Shared labels and accessible, data-driven maths diagrams. No external assets.
export const TOPICS = {
  number_operations: 'Number & Arithmetic', fractions: 'Fractions',
  decimals: 'Decimals & Place Value', ratio: 'Ratio & Proportion',
  percentages: 'Percentages', geometry: 'Geometry', measures: 'Measures & Units',
  algebra: 'Algebra & Sequences', statistics: 'Data & Averages', coordinates: 'Coordinates',
};

export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));
export function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function time(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
export function difficulty(value) {
  return `<span class="difficulty-dots" aria-label="Difficulty ${value} out of 3">${[1, 2, 3].map(n => `<span class="difficulty-dot${n <= value ? ' filled' : ''}" aria-hidden="true"></span>`).join('')}</span>`;
}
export function topicOptions() {
  return `<option value="">All Topics</option>${Object.entries(TOPICS).map(([key, label]) => `<option value="${key}">${esc(label)}</option>`).join('')}`;
}

export function diagram(d) {
  if (!d) return '';
  if (d.type === 'table') return `<div class="maths-table-wrap"><table class="maths-table"><caption>${esc(d.caption)}</caption><thead><tr>${d.headers.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${d.rows.map(row => `<tr>${row.map((v, i) => i === 0 ? `<th scope="row">${esc(v)}</th>` : `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  let drawing = '';
  if (d.type === 'bars' || d.type === 'line') {
    const max = d.max || Math.max(...d.values);
    const x = i => 60 + i * (260 / Math.max(1, d.values.length - 1));
    const y = v => 180 - v / max * 140;
    drawing = [0, 1, 2, 3, 4].map(i => `<path d="M40 ${y(max * i / 4)} H345" class="grid-line"/><text x="32" y="${y(max * i / 4) + 4}" text-anchor="end">${max * i / 4}</text>`).join('');
    drawing += `<path d="M40 35 V180 H345" class="axis"/>`;
    drawing += d.values.map((v, i) => `${d.type === 'bars' ? `<rect x="${x(i) - 14}" y="${y(v)}" width="28" height="${180 - y(v)}" class="chart-bar"/>` : `<circle cx="${x(i)}" cy="${y(v)}" r="4"/>`}<text x="${x(i)}" y="200" text-anchor="middle">${esc(d.labels[i])}</text>`).join('');
    if (d.type === 'line') drawing += `<polyline points="${d.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')}" class="shape-outline"/>`;
    drawing += `<text x="45" y="20">${esc(d.axis_label)}</text>`;
  } else if (d.type === 'pie') {
    let angle = -Math.PI / 2;
    const colours = ['#14b8a6', '#a78bfa', '#f59e0b', '#60a5fa'];
    drawing = d.values.map((v, i) => {
      const end = angle + v / 100 * 2 * Math.PI;
      const startX = 112 + 78 * Math.cos(angle), startY = 118 + 78 * Math.sin(angle);
      const endX = 112 + 78 * Math.cos(end), endY = 118 + 78 * Math.sin(end);
      angle = end;
      return `<path d="M112 118 L${startX} ${startY} A78 78 0 ${v > 50 ? 1 : 0} 1 ${endX} ${endY} Z" fill="${colours[i % colours.length]}" stroke="currentColor"/><rect x="220" y="${75 + i * 32}" width="12" height="12" fill="${colours[i % colours.length]}"/><text x="242" y="${86 + i * 32}">${esc(d.labels[i])}: ${v}%</text>`;
    }).join('');
  } else if (d.type === 'coordinates') {
    const p = n => 190 + n * 22;
    const py = n => 118 - n * 22;
    drawing = Array.from({ length: 11 }, (_, i) => i - 5).map(n => `<path d="M${p(n)} 8 V228 M80 ${py(n)} H300" class="grid-line"/>${n ? `<text x="${p(n)}" y="133" text-anchor="middle">${n}</text><text x="180" y="${py(n) + 4}" text-anchor="end">${n}</text>` : ''}`).join('');
    drawing += `<path d="M70 118 H312 M190 235 V4" class="axis"/><text x="316" y="120">x</text><text x="195" y="12">y</text><text x="180" y="133">0</text>`;
    if (d.join) drawing += `<polygon points="${d.points.map(pt => `${p(pt.x)},${py(pt.y)}`).join(' ')}" class="shape-outline"/>`;
    drawing += d.points.map(pt => `<circle cx="${p(pt.x)}" cy="${py(pt.y)}" r="4"/><text x="${p(pt.x) + 7}" y="${py(pt.y) - 7}">${esc(pt.label)}</text>`).join('');
  } else if (d.type === 'rectangle') {
    drawing = `<rect x="75" y="45" width="220" height="130" class="shape-outline"/><text x="185" y="200" text-anchor="middle">${esc(d.width)}</text><text x="310" y="112">${esc(d.height)}</text>`;
  } else if (d.type === 'triangle') {
    drawing = `<path d="M65 180 H310 L190 40 Z" class="shape-outline"/><path d="M190 40 V180" class="shape-outline" stroke-dasharray="5 4"/><path d="M190 167 H203 V180" class="shape-outline"/><text x="185" y="205" text-anchor="middle">${esc(d.base)}</text><text x="200" y="125">${esc(d.height)}</text>`;
  } else if (d.type === 'l_shape') {
    drawing = `<path d="M65 40 H200 V110 H300 V185 H65 Z" class="shape-outline"/><text x="180" y="210" text-anchor="middle">${esc(d.width)}</text><text x="12" y="115">${esc(d.height)}</text><text x="245" y="100" text-anchor="middle">${esc(d.cutWidth)}</text><text x="205" y="70">${esc(d.cutHeight)}</text>`;
  }
  return `<figure class="maths-figure"><svg viewBox="0 0 380 245" role="img" aria-label="${esc(d.description)}"><title>${esc(d.description)}</title>${drawing}</svg><figcaption>${esc(d.caption || d.description)}${['rectangle', 'triangle', 'l_shape'].includes(d.type) ? ' (not to scale)' : ''}</figcaption></figure>`;
}

export function questionBody(q) {
  return `<p class="question-text">${esc(q.question)}</p>${diagram(q.diagram)}`;
}

export function answerText(q) {
  const answer = String(q.answer);
  if (!q.unit || answer.includes(q.unit)) return answer;
  if (['£', '€'].includes(q.unit)) return q.unit + answer;
  return answer + ' ' + q.unit;
}
