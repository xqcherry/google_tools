import { chromium } from 'playwright-core';

const baseUrl = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true, args: ['--disable-gpu', '--disable-software-rasterizer', '--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 1 });
  page.on('pageerror', (error) => console.error('Browser error:', error.message));
  for (const path of ['/', '/tools/understand', '/tools/generate', '/tools/edit', '/works', '/settings', '/login']) {
    await page.goto(`${baseUrl}${path}`);
    const width = await page.evaluate(() => ({ body: document.body.scrollWidth, view: window.innerWidth }));
    if (width.body > width.view) throw new Error(`${path} overflows: ${JSON.stringify(width)}`);
    console.log(`${path}: viewport ${width.view}, content ${width.body}`);
  }
  await page.goto(`${baseUrl}/`);
  if (await page.title() !== '工具箱') throw new Error('Product title is inconsistent');
  if (!(await page.getByText('当前先提供三项图片工具的本地预览与输入校验', { exact: false }).isVisible())) throw new Error('Phase 1 scope is missing');
  await page.getByRole('searchbox', { name: '搜索工具' }).fill('图片');
  if (await page.locator('.tool-card').count() !== 3) throw new Error('Category search did not include all image tools');
  await page.getByRole('searchbox', { name: '搜索工具' }).fill('分析图片');
  if (await page.locator('.tool-card').count() !== 1) throw new Error('Task search did not filter to one card');
  await page.getByRole('searchbox', { name: '搜索工具' }).fill('改图');
  if (await page.locator('.tool-card').count() !== 1) throw new Error('Search did not filter to one card');
  await page.getByRole('searchbox', { name: '搜索工具' }).fill('not-a-tool');
  await page.getByRole('button', { name: '清空搜索' }).click();
  if (await page.locator('.tool-card').count() !== 3) throw new Error('Search reset failed');
  for (const path of ['/tools/understand', '/tools/generate', '/tools/edit']) {
    if (await page.locator(`.tool-card[href="${path}"]`).count() !== 1) throw new Error(`Missing card link: ${path}`);
  }
  await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true });
  await page.goto(`${baseUrl}/tools/understand`);
  await page.getByRole('button', { name: '检查输入' }).click();
  if (!(await page.getByText('请先选择一张图片。').isVisible())) throw new Error('Missing image validation');
  if (!(await page.getByText('请输入想了解的问题。').isVisible())) throw new Error('Missing prompt validation');
  await page.locator('input[type=file]').setInputFiles({ name: 'sample.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL/nwAAAABJRU5ErkJggg==', 'base64') });
  await page.getByRole('textbox', { name: '你想问什么？ 必填' }).fill('画面里有什么？');
  await page.getByRole('button', { name: '检查输入' }).click();
  if (!(await page.getByText('输入已就绪，当前仅支持预览。模型能力和服务连接仍待验证。').isVisible())) throw new Error('Ready state missing');
  await page.getByRole('button', { name: '清除图片' }).click();
  if (await page.locator('.preview-wrap img').count()) throw new Error('Image preview did not clear');
  await page.screenshot({ path: 'artifacts/tool-mobile.png', fullPage: true });
  await page.goto(`${baseUrl}/tools/generate`);
  await page.getByRole('textbox', { name: '画面描述 必填' }).fill('   ');
  await page.getByRole('button', { name: '检查输入' }).click();
  if (!(await page.getByText('请输入画面描述。').isVisible())) throw new Error('Generate whitespace validation failed');
  await page.getByRole('textbox', { name: '画面描述 必填' }).fill('海边的书店');
  await page.getByLabel('候选模型').selectOption('gemini-3-flash-agent');
  await page.getByRole('button', { name: '检查输入' }).click();
  if (!(await page.getByText('输入已就绪，当前仅支持预览。模型能力和服务连接仍待验证。').isVisible())) throw new Error('Generate ready state missing');
  await page.goto(`${baseUrl}/tools/edit`);
  await page.getByRole('button', { name: '检查输入' }).click();
  if (!(await page.getByText('请输入修改说明。').isVisible())) throw new Error('Edit validation failed');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`);
  const desktopWidth = await page.evaluate(() => ({ body: document.body.scrollWidth, view: window.innerWidth }));
  if (desktopWidth.body > desktopWidth.view) throw new Error(`Desktop home overflows: ${JSON.stringify(desktopWidth)}`);
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });
  console.log('Search, all tool validation, model selection, preview and clear: passed');
} finally { await browser.close(); }
