describe('Home page Test', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:3030');
  });

  after (async function () {
    await page.close();
  })

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Mai_Thai Kitchen');
  });

  it('should have a heading', async function () {
    const HEADING_SELECTOR = 'h1';
    let heading;

    await page.waitFor(HEADING_SELECTOR);
    heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText);

    expect(heading).to.eql('Welcome to Mai_Thai Kitchen');
  });

/*  it('should have a single content section', async function () {
    const BODY_SELECTOR = '.main-content';

    await page.waitFor(BODY_SELECTOR);

    expect(await page.$$(BODY_SELECTOR)).to.have.lengthOf(1);
  });*/
});

describe('authenticRecipe Header Test', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:3030/authenticRecipe');
  });

  after (async function () {
    await page.close();
  })

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Mai_Thai Kitchen');

  });

  it('should have the correct heading', async function () {
    const HEADING_SELECTOR = 'h1';
    let heading;
    await page.waitFor(HEADING_SELECTOR);
    heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText);

    expect(heading).to.eql('Tom Kha Gai');
  });

/*  it('should have a single content section', async function () {
    const BODY_SELECTOR = '.main-content';

    await page.waitFor(BODY_SELECTOR);

    expect(await page.$$(BODY_SELECTOR)).to.have.lengthOf(1);
  });*/
});

describe('fusionCuisine Header Test', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:3030/fusionCuisine');
  });

  after (async function () {
    await page.close();
  })

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Mai_Thai Kitchen');
  });

  it('should have the correct heading', async function () {
    const HEADING_SELECTOR = 'h1';
    let heading;

    await page.waitFor(HEADING_SELECTOR);
    heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText);
    expect(heading).to.eql('Thai-Chinese Beef Stired');
  });

/*  it('should have a single content section', async function () {
    const BODY_SELECTOR = '.main-content';

    await page.waitFor(BODY_SELECTOR);

    expect(await page.$$(BODY_SELECTOR)).to.have.lengthOf(1);
  });*/
});
