import { test, expect } from 'playwright-test-coverage';

test('test', async ({ page }) => {
	await page.route('*/**/api/auth', async (route) => {
		const loginReq = { email: 'd@jwt.com', password: 'a' };
		const loginRes = {
			user: {
				id: 3,
				name: 'Kai Chen',
				email: 'd@jwt.com',
				roles: [{ role: 'diner' }],
			},
			token: 'abcdef',
		};
		expect(route.request().method()).toBe('PUT');
		expect(route.request().postDataJSON()).toMatchObject(loginReq);
		await route.fulfill({ json: loginRes });
	});
});