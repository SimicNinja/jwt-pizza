import { test, expect } from 'playwright-test-coverage';

test('check franchise dashboard and login', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await page.getByRole('link', { name: 'Login' }).click();
	await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
	await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
	await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.waitForLoadState('networkidle');

	await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page.getByRole('heading')).toContainText('pizzaPocket');
	await expect(page.getByRole('main')).toContainText('Everything you need to run an JWT Pizza franchise. Your gateway to success.');
});

test('create Provo store', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await page.getByRole('link', { name: 'Login' }).click();
	await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
	await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
	await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.waitForLoadState('networkidle');

	await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
	await page.waitForLoadState('networkidle');

	await page.getByRole('button', { name: 'Create store' }).click();
	await page.waitForLoadState('networkidle');

	await page.getByRole('textbox', { name: 'store name' }).click();
	await page.getByRole('textbox', { name: 'store name' }).fill('Provo');
	await expect(page.getByRole('heading')).toContainText('Create store');
	await page.getByRole('button', { name: 'Create' }).click();
	await page.waitForLoadState('networkidle');


	await expect(page.getByRole('main')).toContainText('Everything you need to run an JWT Pizza franchise. Your gateway to success.');
	await expect(page.locator('tbody')).toContainText('Provo');
});

test('close Provo store', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await page.getByRole('link', { name: 'Login' }).click();
	await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
	await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
	await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.waitForLoadState('networkidle');

	await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
	await page.waitForLoadState('networkidle');

	await page.getByRole('row', { name: 'Provo 0 ₿ Close' }).getByRole('button').click();
	await page.waitForLoadState('networkidle');

	await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
	await expect(page.getByRole('main')).toContainText('Are you sure you want to close the pizzaPocket store Provo ? This cannot be restored. All outstanding revenue will not be refunded.');
	await page.getByRole('button', { name: 'Close' }).click();
	await page.waitForLoadState('networkidle');

	await expect(page.getByRole('heading')).toContainText('pizzaPocket');
	await expect(page.getByRole('main')).toContainText('Everything you need to run an JWT Pizza franchise. Your gateway to success.');
	await expect(page.getByRole('main')).not.toContainText('Provo');
});