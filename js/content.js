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
    // Labels move clear of the axis numbers, which sit just below the x-axis and just left of the y-axis.
    drawing += d.points.map(pt => `<circle cx="${p(pt.x)}" cy="${py(pt.y)}" r="4"/><text x="${pt.x === -1 ? p(pt.x) - 7 : p(pt.x) + 7}" y="${pt.y === -1 ? py(pt.y) + 16 : py(pt.y) - 7}"${pt.x === -1 ? ' text-anchor="end"' : ''}>${esc(pt.label)}</text>`).join('');
  } else if (d.type === 'rectangle') {
    drawing = `<rect x="75" y="45" width="220" height="130" class="shape-outline"/><text x="185" y="200" text-anchor="middle">${esc(d.width)}</text><text x="310" y="112">${esc(d.height)}</text>`;
  } else if (d.type === 'triangle') {
    drawing = `<path d="M65 180 H310 L190 40 Z" class="shape-outline"/><path d="M190 40 V180" class="shape-outline" stroke-dasharray="5 4"/><path d="M190 167 H203 V180" class="shape-outline"/><text x="185" y="205" text-anchor="middle">${esc(d.base)}</text><text x="200" y="125">${esc(d.height)}</text>`;
  } else if (d.type === 'l_shape') {
    drawing = `<path d="M65 40 H200 V110 H300 V185 H65 Z" class="shape-outline"/><text x="180" y="210" text-anchor="middle">${esc(d.width)}</text><text x="12" y="115">${esc(d.height)}</text><text x="245" y="100" text-anchor="middle">${esc(d.cutWidth)}</text><text x="205" y="70">${esc(d.cutHeight)}</text>`;
  } else if (d.type === 'shaded_grid') {
    const size = Math.min(340 / d.cols, 225 / d.rows);
    const left = (380 - size * d.cols) / 2, top = (245 - size * d.rows) / 2;
    const filled = new Set((d.shaded || []).map(([row, col]) => row + ':' + col));
    for (let row = 0; row < d.rows; row++) for (let col = 0; col < d.cols; col++) {
      drawing += `<rect x="${left + col * size}" y="${top + row * size}" width="${size}" height="${size}" class="grid-cell${filled.has(row + ':' + col) ? ' grid-cell--shaded' : ''}"/>`;
    }
  } else if (d.type === 'shape') {
    const points = list => list.map(([x, y]) => x + ',' + y).join(' ');
    drawing = (d.polygons || []).map(s => `<polygon points="${points(s.points)}" class="${s.shaded ? 'shape-filled' : 'shape-outline'}"/>`).join('');
    drawing += (d.circles || []).map(s => `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" class="shape-outline"/>`).join('');
    drawing += (d.lines || []).map(s => `<line x1="${s.from[0]}" y1="${s.from[1]}" x2="${s.to[0]}" y2="${s.to[1]}" class="shape-outline"${s.dashed ? ' stroke-dasharray="5 4"' : ''}/>`).join('');
    drawing += (d.labels || []).map(s => `<text x="${s.x}" y="${s.y}" text-anchor="${['start', 'middle', 'end'].includes(s.anchor) ? s.anchor : 'middle'}">${esc(s.text)}</text>`).join('');
  }
  // The description is for assistive technology only: showing it would read the chart for the child.
  const note = d.caption || (['rectangle', 'triangle', 'l_shape', 'shape'].includes(d.type) ? 'Not to scale' : '');
  return `<figure class="maths-figure"><svg viewBox="0 0 380 245" role="img" aria-label="${esc(d.description)}">${drawing}</svg>${note ? `<figcaption>${esc(note)}</figcaption>` : ''}</figure>`;
}

export function questionBody(q) {
  return `<p class="question-text">${esc(q.question)}</p>${diagram(q.diagram)}`;
}

export function answerText(q) {
  const answer = String(q.answer);
  if (!q.unit || answer.includes(q.unit)) return answer;
  // Money always shows two decimal places: £27.60, never £27.6.
  if (['£', '€'].includes(q.unit)) return q.unit + (/^-?\d+\.\d$/.test(answer) ? answer + '0' : answer);
  return answer + ' ' + q.unit;
}
