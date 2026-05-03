const { Builder, By, until } = require('selenium-webdriver')

async function scrapeData() {
    const driver = await new Builder().forBrowser('chrome').build()

    try {
        await driver.get('http://localhost:5173')

        const emailInput = await driver.findElement(By.css('input[type="email"]'))
        const passwordInput = await driver.findElement(By.css('input[type="password"]'))

        await emailInput.sendKeys('admin@gmail.com')
        await passwordInput.sendKeys('123456')

        const loginButton = await driver.findElement(By.css('button[type="submit"]'))
        await loginButton.click()

        await driver.wait(until.urlContains('/dashboard'), 5000)

        const productsLink = await driver.findElement(By.linkText('Products'))
        await productsLink.click()

        await driver.wait(until.urlContains('/products'), 5000)

        const pageTitle = await driver.findElement(By.css('h1')).getText()
        console.log('Current page:', pageTitle)

        const cards = await driver.findElements(By.css('.card'))

        console.log('Scraped data:')

        for (const card of cards) {
            const text = await card.getText()
            console.log(text)
        }
    } finally {
        await driver.quit()
    }
}

scrapeData()