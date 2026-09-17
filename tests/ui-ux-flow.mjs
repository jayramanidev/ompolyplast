import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching Puppeteer to run UI/UX flow test...');
  let hasConsoleErrors = false;
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Listen to console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error(`Browser console error: ${msg.text()}`);
      hasConsoleErrors = true;
    }
  });

  page.on('pageerror', (err) => {
    console.error(`Browser page error: ${err.message}`);
    hasConsoleErrors = true;
  });

  page.on('requestfailed', (req) => {
    // Ignore aborted requests or some specific tracking scripts if necessary
    // console.error(`Request failed: ${req.url()} - ${req.failure().errorText}`);
    // Not failing strictly on request failures to avoid false positives (e.g. adblock, missing fonts), 
    // but useful for deep logging if needed.
  });

  try {
    console.log('Navigating to homepage...');
    const response = await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    if (!response.ok()) {
      console.error(`Failed to load homepage. Status: ${response.status()}`);
      process.exit(1);
    }

    console.log('Testing Products mega-menu dropdown gap fix...');
    // Find the products button (assuming it has text "Products")
    const productsButton = await page.evaluateHandle(() => {
      const elements = Array.from(document.querySelectorAll('button'));
      return elements.find(el => el.textContent.includes('Products'));
    });
    
    if (productsButton) {
      await productsButton.hover();
      console.log('Hovered over products button');
      
      // Wait for dropdown to appear
      await new Promise(r => setTimeout(r, 1000));
      
      // Move mouse slightly down towards the gap
      // productsButton bounding box
      const box = await productsButton.boundingBox();
      if (box) {
        // Move mouse slowly down over the gap area
        for (let i = 0; i <= 20; i++) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height + i);
          await new Promise(r => setTimeout(r, 50));
        }
        
        console.log('Hovered across the gap area successfully.');
        
        // Let's see if dropdown is still visible
        const isDropdownVisible = await page.evaluate(() => {
          return document.body.innerText.includes('Product Categories');
        });
        
        if (!isDropdownVisible) {
           console.error('UX Defect: Dropdown disappeared when hovering across the gap.');
           hasConsoleErrors = true;
        } else {
           console.log('UX Test passed: Dropdown remained visible across the gap.');
        }
      }
    } else {
      console.warn('Could not find Products button to hover.');
    }

    console.log('Navigating to About page...');
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

    console.log('Navigating to Contact page...');
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });
    
    // Check if form is there
    const formExists = await page.evaluate(() => !!document.querySelector('form'));
    if (!formExists) {
      console.error('UX Defect: No form found on contact page.');
      hasConsoleErrors = true;
    }

    console.log('Flow test completed.');
    
    if (hasConsoleErrors) {
      console.error('Test FAILED due to console errors or UX defects.');
      process.exit(1);
    } else {
      console.log('Test PASSED. No console errors or UX defects found.');
    }
    
  } catch (err) {
    console.error(`Error during Puppeteer test: ${err.message}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
