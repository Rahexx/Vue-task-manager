import { Builder, By, until } from 'selenium-webdriver'
import { expect } from 'chai'

describe('Login Test', function () {
  this.timeout(10000)
  let driver

  before(async function () {
    // Uruchomienie przeglądarki
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  it('should display the login form and submit credentials', async function () {
    // Otwórz stronę logowania
    await driver.get('http://localhost:5173') // Zmień na swój adres URL
    // Sprawdzenie, czy pola do logowania istnieją
    const usernameField = await driver.wait(
      until.elementLocated(By.css('input[aria-label="Login"]')),
      5000,
    )
    const passwordField = await driver.findElement(By.css('input[type="password"]'))
    const loginButton = await driver.findElement(By.css('button[type="submit"]'))

    expect(usernameField).to.not.be.null
    expect(passwordField).to.not.be.null
    expect(loginButton).to.not.be.null

    // Wypełnij formularz logowania
    await usernameField.sendKeys('testuser')
    await passwordField.sendKeys('testpass')

    // Kliknij przycisk logowania
    await loginButton.click()

    // Czekaj na przekierowanie po zalogowaniu (np. na stronę /profile)
    await driver.wait(until.urlContains('/profile'), 5000)

    // Sprawdzenie, czy URL został zmieniony na /profile
    const currentUrl = await driver.getCurrentUrl()
    expect(currentUrl).to.include('/profile')
  })
})
