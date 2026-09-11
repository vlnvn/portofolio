import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const chapters=["KAIROS","Ayam Kalintang","SAMBUT","The Colors of MIPA","Aether3D","N.A.R.A."];
test("homepage exposes six evidenced projects and contact",async({page})=>{await page.goto("/");await expect(page.getByRole("heading",{level:1})).toContainText("VALENSIUS");for(const name of chapters)await expect(page.getByRole("heading",{name,exact:true})).toBeVisible();await expect(page.getByRole("link",{name:"alvenvalensius93@gmail.com"})).toHaveAttribute("href","mailto:alvenvalensius93@gmail.com");});
test("adaptive navigation tracks chapters and contact works",async({page})=>{await page.goto("/");await page.getByRole("link",{name:/03 SAMBUT/}).click();await expect(page).toHaveURL(/#sambut$/);await expect(page.getByRole("link",{name:/03 SAMBUT/})).toHaveAttribute("aria-current","location");await page.getByRole("link",{name:"Contact"}).click();await expect(page).toHaveURL(/#contact$/);});
test("theme control persists the chosen mode",async({page})=>{await page.goto("/");const toggle=page.getByRole("switch");await toggle.click();await expect(page.locator("html")).toHaveAttribute("data-theme","dark");await page.reload();await expect(page.locator("html")).toHaveAttribute("data-theme","dark");});
test("critical internal routes and missing route resolve",async({page})=>{await page.goto("/work/kairos");await expect(page.getByRole("heading",{name:"KAIROS"})).toBeVisible();await page.goto("/work/ayam-kalintang");await expect(page.getByRole("heading",{name:"Ayam Kalintang"})).toBeVisible();const response=await page.goto("/missing-page");expect(response?.status()).toBe(404);await expect(page.getByRole("heading",{name:"That page is not here."})).toBeVisible();});
test("public links use expected destinations",async({page})=>{await page.goto("/");await expect(page.getByRole("link",{name:"GitHub"}).first()).toHaveAttribute("href","https://github.com/vlnvn");await expect(page.getByRole("link",{name:"LinkedIn"}).first()).toHaveAttribute("href","https://linkedin.com/in/valensiusalven");await expect(page.getByRole("link",{name:"Instagram Reel"})).toHaveAttribute("href","https://www.instagram.com/reel/DL_5D0XxNnq/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==");});
test("keyboard focus reaches navigation and theme",async({page},testInfo)=>{await page.goto("/");const skip=page.getByRole("link",{name:"Skip to content"});if(testInfo.project.name==="webkit"){await skip.focus();await expect(skip).toBeFocused();await page.getByRole("link",{name:"Valensius Alven, introduction"}).focus();await expect(page.getByRole("link",{name:"Valensius Alven, introduction"})).toBeFocused();}else{await page.keyboard.press("Tab");await expect(skip).toBeFocused();await page.keyboard.press("Tab");await expect(page.getByRole("link",{name:"Valensius Alven, introduction"})).toBeFocused();}});
test("320px layout has no horizontal overflow",async({page})=>{await page.setViewportSize({width:320,height:800});await page.goto("/");const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);expect(overflow).toBeLessThanOrEqual(1);});
test("reduced motion uses the deterministic poster",async({page})=>{await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/");await expect(page.locator(".signal-layer")).toHaveAttribute("data-mode","poster");});
test("homepage has no automatically detectable accessibility violations",async({page},testInfo)=>{test.skip(testInfo.project.name!=="chromium","one engine is sufficient for deterministic axe rules");await page.goto("/");const results=await new AxeBuilder({page}).analyze();expect(results.violations).toEqual([]);});

test("production responses carry the security baseline",async({page})=>{const response=await page.goto("/");expect(response?.headers()["content-security-policy"]).toContain("object-src 'none'");expect(response?.headers()["x-content-type-options"]).toBe("nosniff");});
test("rapid reverse chapter navigation settles on the final target",async({page})=>{await page.goto("/");await page.getByRole("link",{name:/06 N\.A\.R\.A\./}).click();await page.getByRole("link",{name:/01 KAIROS/}).click();await expect(page).toHaveURL(/#kairos$/);await expect(page.getByRole("link",{name:/01 KAIROS/})).toHaveAttribute("aria-current","location");});
test("WebGL unavailability keeps semantic content and poster",async({page},testInfo)=>{test.skip(testInfo.project.name!=="chromium","capability override is browser-specific");await page.addInitScript(()=>{const proto=HTMLCanvasElement.prototype as unknown as {getContext:(type:string,...args:unknown[])=>unknown};const original=proto.getContext;proto.getContext=function(this:HTMLCanvasElement,type:string,...args:unknown[]){if(type==="webgl"||type==="webgl2")return null;return original.call(this,type,...args);};});await page.goto("/");await expect(page.locator(".signal-layer")).toHaveAttribute("data-mode","poster");await expect(page.getByRole("heading",{name:"KAIROS"})).toBeVisible();});
test("Signal Form stops rendering after state settles",async({page},testInfo)=>{test.skip(testInfo.project.name!=="chromium","runtime diagnostics run once");await page.goto("/");await expect.poll(()=>page.locator("html").getAttribute("data-signal-frames"),{timeout:5000}).not.toBeNull();await page.getByRole("link",{name:/03 SAMBUT/}).click();await page.waitForTimeout(2800);const before=Number(await page.locator("html").getAttribute("data-signal-frames"));await page.waitForTimeout(500);const after=Number(await page.locator("html").getAttribute("data-signal-frames"));expect(after-before).toBeLessThanOrEqual(1);expect(Number(await page.locator("html").getAttribute("data-signal-calls"))).toBeLessThanOrEqual(12);});




test("dark theme has no automatically detectable accessibility violations",async({page},testInfo)=>{test.skip(testInfo.project.name!=="chromium","one engine is sufficient for deterministic axe rules");await page.addInitScript(()=>localStorage.setItem("portfolio-theme","dark"));await page.goto("/");const results=await new AxeBuilder({page}).analyze();expect(results.violations).toEqual([]);});
test("200 percent zoom and WCAG text spacing retain reflow",async({page},testInfo)=>{test.skip(testInfo.project.name!=="chromium","layout probe runs once");await page.setViewportSize({width:1280,height:900});await page.goto("/");await page.evaluate(()=>{document.body.style.zoom="2";const style=document.createElement("style");style.textContent="*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}";document.head.append(style);});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBeTruthy();});
test("homepage scroll produces no console errors or failed same-origin requests",async({page},testInfo)=>{test.skip(testInfo.project.name!=="chromium","network audit runs once");const errors:string[]=[];page.on("console",message=>{if(message.type()==="error")errors.push(message.text())});page.on("requestfailed",request=>{if(new URL(request.url()).origin==="http://127.0.0.1:3010")errors.push(`${request.url()} ${request.failure()?.errorText}`)});await page.goto("/");const height=await page.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<height;y+=700){await page.evaluate(top=>scrollTo(0,top),y);await page.waitForTimeout(40);}expect(errors).toEqual([]);});

for(const width of [360,390,1280])test(`${width}px risk-sample has no horizontal overflow`,async({page},testInfo)=>{test.skip(testInfo.project.name!=="chromium","responsive matrix runs once");await page.setViewportSize({width,height:800});await page.goto("/");await page.evaluate(()=>document.fonts.ready);expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(1);});

test("natural scroll updates active chapter and reverse scroll converges",async({page},testInfo)=>{test.skip(testInfo.project.name!=="chromium","scroll-observer test runs once per browser family");await page.goto("/");
  await page.evaluate(()=>document.getElementById("kairos")?.scrollIntoView({behavior:"instant",block:"center"}));
  await expect.poll(()=>page.getByRole("link",{name:/01 KAIROS/}).getAttribute("aria-current"),{timeout:3000}).toBe("location");
  await page.evaluate(()=>document.getElementById("sambut")?.scrollIntoView({behavior:"instant",block:"center"}));
  await expect.poll(()=>page.getByRole("link",{name:/03 SAMBUT/}).getAttribute("aria-current"),{timeout:3000}).toBe("location");
  await page.evaluate(()=>document.getElementById("nara")?.scrollIntoView({behavior:"instant",block:"center"}));
  await expect.poll(()=>page.getByRole("link",{name:/06 N\.A\.R\.A\./}).getAttribute("aria-current"),{timeout:3000}).toBe("location");
  await page.evaluate(()=>document.getElementById("kairos")?.scrollIntoView({behavior:"instant",block:"center"}));
  await expect.poll(()=>page.getByRole("link",{name:/01 KAIROS/}).getAttribute("aria-current"),{timeout:3000}).toBe("location");
});


test("Signal Form follows the 700px capability lifecycle",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="chromium","WebGL lifecycle probe runs once");
  await page.setViewportSize({width:900,height:800});
  await page.goto("/");
  await expect.poll(()=>page.locator(".signal-layer").getAttribute("data-mode"),{timeout:5000}).toBe("webgl");
  await page.setViewportSize({width:440,height:800});
  await expect(page.locator(".signal-layer")).toHaveAttribute("data-mode","poster");
  await page.setViewportSize({width:900,height:800});
  await expect.poll(()=>page.locator(".signal-layer").getAttribute("data-mode"),{timeout:5000}).toBe("webgl");
});


test("case studies preserve theme control and return path",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="chromium","case-study interaction probe runs once");
  await page.goto("/work/kairos");
  const toggle=page.getByRole("switch",{name:"Dark theme"});
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme","dark");
  await expect(page.getByRole("link",{name:"Return to selected work"}).last()).toHaveAttribute("href","/#kairos");
});

test("portrait responds only while cursor is over portrait",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="chromium","spatial portrait probe runs once");
  await page.setViewportSize({width:1440,height:900});await page.goto("/");
  const portrait=page.locator(".portrait"),box=await portrait.boundingBox();expect(box).not.toBeNull();
  await page.mouse.move(box!.x+box!.width*.8,box!.y+box!.height*.3);
  await expect.poll(()=>portrait.getAttribute("data-spatial-active"),{timeout:2000}).toBe("true");
  await expect.poll(async()=>Math.abs(parseFloat(await portrait.evaluate(el=>(el as HTMLElement).style.getPropertyValue("--portrait-x"))||"0")),{timeout:2000}).toBeGreaterThan(2);
  await page.mouse.move(80,120);
  await expect.poll(()=>portrait.getAttribute("data-spatial-active"),{timeout:2000}).toBe("false");
  await expect.poll(async()=>Math.abs(parseFloat(await portrait.evaluate(el=>(el as HTMLElement).style.getPropertyValue("--portrait-x"))||"0")),{timeout:2000}).toBeLessThan(.1);
});

test("aperture responds directly to mouse in hero and 404",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="chromium","WebGL kinetic probe runs once");
  await page.setViewportSize({width:1440,height:900});await page.goto("/");
  await expect.poll(()=>page.locator(".signal-layer").getAttribute("data-mode"),{timeout:5000}).toBe("webgl");
  await page.waitForTimeout(1000);const before=Number(await page.locator("html").getAttribute("data-signal-frames"));
  await page.mouse.move(1260,360);
  await expect.poll(()=>page.locator("html").getAttribute("data-signal-target"),{timeout:2000}).not.toBe("0.000,0.000");
  await expect.poll(async()=>Number(await page.locator("html").getAttribute("data-signal-frames")),{timeout:2000}).toBeGreaterThan(before);
  await expect.poll(()=>page.locator("html").getAttribute("data-signal-tilt"),{timeout:2000}).not.toBe("0.000,0.000");
  await page.goto("/missing-kinetic-page");await expect.poll(()=>page.locator(".not-found .signal-layer").getAttribute("data-mode"),{timeout:5000}).toBe("webgl");
  await page.waitForTimeout(1000);const before404=Number(await page.locator("html").getAttribute("data-signal-frames"));
  await page.mouse.move(1140,390);
  await expect.poll(async()=>Number(await page.locator("html").getAttribute("data-signal-frames")),{timeout:2000}).toBeGreaterThan(before404);
  await expect.poll(()=>page.locator("html").getAttribute("data-signal-tilt"),{timeout:2000}).not.toBe("0.000,0.000");
});

test("kinetic evidence sequence changes project media with scroll",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="chromium","scroll choreography probe runs once");
  await page.setViewportSize({width:1440,height:900});await page.goto("/");
  const chapter=page.locator("#aether3d");
  await chapter.scrollIntoViewIfNeeded();await page.waitForTimeout(80);
  const centered=await chapter.getAttribute("data-evidence-progress");
  await page.evaluate(()=>scrollBy(0,420));await page.waitForTimeout(80);
  const leaving=await chapter.getAttribute("data-evidence-progress");
  expect(centered).not.toBeNull();expect(leaving).not.toBeNull();expect(centered).not.toBe(leaving);
  const transform=await chapter.locator(".media-primary").evaluate(el=>getComputedStyle(el).transform);
  expect(transform).not.toBe("none");
});

test("project sheen and shadow respond to pointer",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="chromium","media light probe runs once");
  await page.setViewportSize({width:1440,height:900});await page.goto("/");
  const media=page.locator("#kairos .project-media");await media.scrollIntoViewIfNeeded();const box=await media.boundingBox();expect(box).not.toBeNull();
  await page.mouse.move(box!.x+box!.width*.82,box!.y+box!.height*.25);
  await expect.poll(()=>media.getAttribute("data-pointer-depth"),{timeout:2000}).not.toBe("0.00,0.00");
  await expect.poll(async()=>Math.abs(parseFloat(await media.evaluate(el=>(el as HTMLElement).style.getPropertyValue("--media-shadow-x"))||"0")),{timeout:2000}).toBeGreaterThan(4);
  await expect(media.locator(".media-sheen")).toHaveCount(1);
});

test("projects stay seamless while contact keeps an intentional divider",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="chromium","visual structure probe runs once");
  await page.goto("/");
  const result=await page.evaluate(()=>{
    const ids=["top","kairos","ayam-kalintang","sambut","colors","aether3d","nara"];
    return {
      sections:ids.map(id=>{const element=document.getElementById(id)!;return {id,before:getComputedStyle(element,"::before").display,after:getComputedStyle(element,"::after").display,background:getComputedStyle(element).backgroundColor};}),
      contactBorder:getComputedStyle(document.getElementById("contact")!).borderTopWidth
    };
  });
  for(const item of result.sections){expect(item.before).toBe("none");expect(item.after).toBe("none");expect(item.background).toBe("rgba(0, 0, 0, 0)");}
  expect(parseFloat(result.contactBorder)).toBeGreaterThanOrEqual(1);
});
