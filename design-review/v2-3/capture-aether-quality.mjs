import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const errors=[];
page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
page.on("pageerror",e=>errors.push(e.message));
await page.goto("http://localhost:3100",{waitUntil:"networkidle",timeout:90000});
await page.locator('canvas[data-engine="three.js r184"]').waitFor({state:"visible",timeout:60000});
await page.waitForTimeout(10000);
const canvas=page.locator('canvas[data-engine="three.js r184"]');
const data=await canvas.evaluate(el=>({w:el.width,h:el.height,rect:el.getBoundingClientRect().toJSON()}));
await page.screenshot({path:"design-review/v2-3/project-evidence/aether3d/original/home-full.png",fullPage:true});
await page.screenshot({path:"design-review/v2-3/project-evidence/aether3d/curated/desktop.png"});
await page.setViewportSize({width:375,height:812});
await page.waitForTimeout(3000);
await page.screenshot({path:"design-review/v2-3/project-evidence/aether3d/curated/mobile.png"});
console.log(JSON.stringify({title:await page.title(),data,errors},null,2));
await browser.close();

